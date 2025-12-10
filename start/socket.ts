// socket.ts
import Ws from "App/Services/WsTracking";
import ClientTravel from "App/Models/ClientTravel";

Ws.boot();
// Listen for incoming socket connections

Ws.io.on("connection", (socket) => {
  console.log("nuevo dispositivo conectado");
  let id = socket.id;
  const body = socket.handshake.query;
  console.log("body del socket " + JSON.stringify(body));
  console.log("se conectó " + id);
  socket.emit("notifications", { hello: "world" });

  // ===================================
  // 2. NUEVO: CHAT POR VIAJE (sin auth)
  // ===================================
  const userId = Number(socket.handshake.query.userId);

  if (userId && !isNaN(userId)) {
    console.log(`Usuario ${userId} conectado al chat via socket ${socket.id}`);

    // Unirse a salas de viajes
    socket.on("joinTravelChats", async (travelIds: number[]) => {
      console.log("Cliente pidió unirse a:", travelIds);

      if (!Array.isArray(travelIds)) {
        console.log("❌ travelIds no es array");
        return;
      }

      const memberships = await ClientTravel.query()
        .whereIn("id_travel", travelIds)
        .where("id_client", userId)
        .select("id_travel");

      console.log("Memberships encontrados:", memberships);

      const validTravelIds = memberships.map((m) => m.id_travel);

      console.log("IDs válidos a los que SÍ pertenece:", validTravelIds);

      validTravelIds.forEach((travelId) => {
        const room = `travel:${travelId}:chat`;
        socket.join(room);
        console.log(`🟢 User ${userId} → joined ${room}`);
      });
    });

    // Enviar mensaje
    socket.on(
      "sendMessage",
      async ({ travelId, message }: { travelId: number; message: string }) => {
        if (!message?.trim()) return;

        const belongs = await ClientTravel.query()
          .where("id_travel", travelId)
          .where("id_client", userId)
          .first();

        if (!belongs) {
          socket.emit("error", "No estás en este viaje");
          return;
        }

        const room = `travel:${travelId}:chat`;

        Ws.io.to(room).emit("newMessage", {
          userId,
          message: message.trim(),
          travelId,
          timestamp: new Date().toISOString(),
        });
      }
    );
  }

  // ===================================
  // 3. DESCONEXIÓN
  // ===================================
  socket.on("disconnect", () => {
    console.log(
      `Socket desconectado: ${socket.id} ${userId ? `(user ${userId})` : ""}`
    );
  });
});
