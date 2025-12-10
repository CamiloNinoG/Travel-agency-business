// socket.ts
import Ws from "App/Services/WsTracking";
import ClientTravel from "App/Models/ClientTravel";
import Administrator from "App/Models/Administrator";
import Guide from "App/Models/Guide";

Ws.boot();

Ws.io.on("connection", (socket) => {
  console.log("Nuevo dispositivo conectado:", socket.id);
  const userId = Number(socket.handshake.query.userId);

  if (!userId || isNaN(userId)) {
    console.log("UserId inválido:", socket.handshake.query.userId);
    socket.disconnect();
    return;
  }

  console.log(`Usuario ${userId} conectado al chat (socket ${socket.id})`);

  // ===================================
  // 1. CHATS DE VIAJES (funciona perfecto)
  // ===================================
  socket.on("joinTravelChats", async (travelIds: number[]) => {
    if (!Array.isArray(travelIds)) return;

    const memberships = await ClientTravel.query()
      .whereIn("id_travel", travelIds)
      .where("id_client", userId)
      .select("id_travel");

    const validTravelIds = memberships.map(m => m.id_travel);

    validTravelIds.forEach(travelId => {
      const room = `travel:${travelId}:chat`;
      socket.join(room);
      console.log(`User ${userId} → joined ${room}`);
    });
  });

  // ===================================
  // 2. CHATS CON AGENTES (Guías y Administradores)
  // ===================================
  socket.on("joinAgentChats", async () => {
    console.log(`Usuario ${userId} pide unirse a chats de agentes`);

    try {
      // Usamos los modelos correctos de Lucid
      const guides = await Guide.query().select("id_user");
      const admins = await Administrator.query().select("id_user");

      const allAgents = [...guides, ...admins];

      allAgents.forEach(agent => {
        const mongoId = agent.id_user;
        const room = `agent:${mongoId}:chat`;
        socket.join(room);
        console.log(`User ${userId} → joined ${room}`);
      });

      socket.emit("agentChatsJoined", { count: allAgents.length });
    } catch (err) {
      console.error("Error uniendo a chats de agentes:", err);
      socket.emit("error", "Error cargando agentes");
    }
  });

  // ===================================
  // 3. ENVÍO DE MENSAJES (viajes + agentes)
  // ===================================
  socket.on("sendMessage", async (data: { 
    travelId?: number; 
    agentId?: string; 
    message: string 
  }) => {
    const { travelId, agentId, message } = data;
    if (!message?.trim()) return;

    let room: string;
    let isValid = false;

    if (travelId) {
      // Mensaje en chat de viaje
      const belongs = await ClientTravel.query()
        .where("id_travel", travelId)
        .where("id_client", userId)
        .first();

      if (!belongs) {
        socket.emit("error", "No estás en este viaje");
        return;
      }

      room = `travel:${travelId}:chat`;
      isValid = true;
    } 
    else if (agentId) {
      // Mensaje en chat de agente
      room = `agent:${agentId}:chat`;
      isValid = true; // todos pueden hablar con agentes
    } 
    else {
      socket.emit("error", "Falta travelId o agentId");
      return;
    }

    const payload = {
      userId,
      message: message.trim(),
      travelId: travelId || null,
      agentId: agentId || null,
      timestamp: new Date().toISOString(),
    };

    console.log(`Mensaje en ${room}:`, payload);

    // ESTA ES LA CLAVE: usar socket.broadcast + socket.emit
    socket.broadcast.to(room).emit("newMessage", payload); // a los demás
    socket.emit("newMessage", payload);                    // al emisor
  });

  // ===================================
  // 4. DESCONEXIÓN
  // ===================================
  socket.on("disconnect", () => {
    console.log(`Socket desconectado: ${socket.id} (user ${userId})`);
  });
});