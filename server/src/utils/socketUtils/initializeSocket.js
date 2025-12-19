const socket = require("socket.io");
const crypto = require("crypto");

const initializeSocket = (server) => {
    const io = socket(server, { 
        cors: {
            origin: 'http://localhost:5173',
        }
     });
    
    io.on("connection", (socket) => {
       socket.on("joinChat", ({ fromUserId, toUserId }) => {
            console.log("User joinChat:", socket.id, fromUserId, toUserId);
            const roomId = getHashedSecreteId(fromUserId, toUserId);
            socket.join(roomId);
            console.log(`User ${socket.id} joined room: ${roomId}`);
        });

        socket.on("sendMessage", ({ fromUserId, toUserId, message }) => {
            const roomId = getHashedSecreteId(fromUserId, toUserId);
            console.log("User sendMessage:", socket.id, "Message:", message);
            io.to(roomId).emit("receiveMessage", { fromUserId, toUserId, message });
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

const getHashedSecreteId = (fromUserId, toUserId) => {
    const roomId = [fromUserId, toUserId].sort().join("_");
    return crypto.createHash("sha256").update(roomId).digest("hex");
}

module.exports = initializeSocket;