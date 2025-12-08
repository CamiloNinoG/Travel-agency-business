// App/Services/Ws.ts

import { Server } from "socket.io";
import AdonisServer from "@ioc:Adonis/Core/Server";
import Vehicule from "App/Models/Vehicule";

class Ws {
  public io: Server;
  private booted = false;

  // Control de reproducción por identificador (plate o code)
  private replayIntervals: Map<string, NodeJS.Timeout> = new Map();
  private currentIndex: Map<string, number> = new Map();

  constructor() {}

  public boot() {
    if (this.booted) return;
    this.booted = true;

    this.io = new Server(AdonisServer.instance!, {
      cors: { origin: "*" },
    });

    this.io.on("connection", (socket) => {
      console.log("Nuevo dispositivo conectado:", socket.id);

      socket.on("join_room", async (data: { identifier: string }) => {
        const { identifier } = data; // Puede ser placa de bus o código de avión
        socket.join(identifier);
        console.log(`[SOCKET] Cliente ${socket.id} se unió a: ${identifier}`);

        try {
          // BUSCAR VEHÍCULO POR BUS.PLATE O AIRPLANE.CODE
          const vehicle = await Vehicule.query()
            .where((query) =>
              query
                .whereHas("bus", (q) => q.where("plate", identifier))
                .orWhereHas("airplane", (q) => q.where("code", identifier))
            )
            .preload("bus")
            .preload("airplane")
            .preload("gps", (q) => q.orderBy("created_at", "desc").limit(50))
            .first();

          const DEFAULT_CENTER = [5.0689, -75.5173];

          if (vehicle && vehicle.gps.length > 0) {
            const latest = vehicle.gps[0];
            const trackingData = {
              lat: parseFloat(latest.latitud),
              lng: parseFloat(latest.longitude),
              history: vehicle.gps.map((g) => [
                parseFloat(g.latitud),
                parseFloat(g.longitude),
              ] as [number, number]),
            };

            socket.emit(`initial_location_${identifier}`, trackingData);
            console.log(`[SOCKET] Initial_location_${identifier} enviado (última: ${trackingData.lat}, ${trackingData.lng})`);
          } else {
            socket.emit(`initial_location_${identifier}`, {
              lat: DEFAULT_CENTER[0],
              lng: DEFAULT_CENTER[1],
              history: [],
            });
            console.log(`[SOCKET] No hay GPS para ${identifier}. Enviando centro por defecto.`);
          }

          // INICIAR REPRODUCCIÓN AUTOMÁTICA (sea bus o avión)
          this.startOrResumeReplay(identifier);
        } catch (error) {
          console.error(`[SOCKET] Error con ${identifier}:`, error);
          socket.emit("error", { message: "Vehículo no encontrado" });
        }
      });

      socket.on("leave_room", (data: { identifier: string }) => {
        socket.leave(data.identifier);
        this.checkAndPauseReplay(data.identifier);
      });

      socket.on("disconnect", () => {
        const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
        rooms.forEach((id) => this.checkAndPauseReplay(id));
      });
    });
  }

  // REPRODUCCIÓN AUTOMÁTICA (funciona igual para buses y aviones)
  private startOrResumeReplay(identifier: string) {
    if (this.replayIntervals.has(identifier)) return;

    console.log(`[REPLAY] Iniciando reproducción para: ${identifier}`);
    this.currentIndex.set(identifier, 0);

    const interval = setInterval(async () => {
      const room = this.io.sockets.adapter.rooms.get(identifier);
      if (!room || room.size === 0) {
        this.stopReplay(identifier);
        return;
      }

      try {
        const vehicle = await Vehicule.query()
          .where((q) =>
            q
              .whereHas("bus", (b) => b.where("plate", identifier))
              .orWhereHas("airplane", (a) => a.where("code", identifier))
          )
          .preload("gps", (q) => q.orderBy("created_at", "asc"))
          .first();

        if (!vehicle || !vehicle.gps.length) return;

        const index = this.currentIndex.get(identifier)!;
        if (index >= vehicle.gps.length) {
          console.log(`[REPLAY] Ruta terminada: ${identifier} (${vehicle.gps.length} puntos)`);
          this.stopReplay(identifier);
          return;
        }

        const gps = vehicle.gps[index];
        const nuevaPos = {
          lat: parseFloat(gps.latitud),
          lng: parseFloat(gps.longitude),
        };

        this.io.to(identifier).emit(identifier, nuevaPos);
        console.log(`[REPLAY] ${identifier} [${index + 1}/${vehicle.gps.length}] → ${nuevaPos.lat}, ${nuevaPos.lng}`);

        this.currentIndex.set(identifier, index + 1);
      } catch (err) {
        console.error("[REPLAY] Error:", err);
      }
    }, 3000); // cada 3 segundos

    this.replayIntervals.set(identifier, interval);
  }

  private checkAndPauseReplay(identifier: string) {
    const room = this.io.sockets.adapter.rooms.get(identifier);
    if (!room || room.size === 0) {
      this.stopReplay(identifier);
    }
  }

  private stopReplay(identifier: string) {
    const interval = this.replayIntervals.get(identifier);
    if (interval) {
      clearInterval(interval);
      this.replayIntervals.delete(identifier);
      console.log(`[REPLAY] Detenido: ${identifier}`);
    }
  }
}

export default new Ws();