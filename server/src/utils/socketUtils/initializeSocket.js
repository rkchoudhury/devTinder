const socket = require("socket.io");
const crypto = require("crypto");

const Chat = require("../../models/chat");

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: 'http://localhost:5173',
        }
    });

    io.on("connection", (socket) => {
        socket.on("joinChat", ({ fromUserId, toUserId }) => {
            const roomId = getHashedSecreteId(fromUserId, toUserId);
            socket.join(roomId);
            console.log("User joined room");
        });

        socket.on("sendMessage", async ({ fromUserId, toUserId, message }) => {
            const roomId = getHashedSecreteId(fromUserId, toUserId);
            io.to(roomId).emit("receiveMessage", { fromUserId, toUserId, message });

            /**
             * Save chat message in DB
             */
            const existingChat = await Chat.findOne({ roomId });

            if (existingChat) {
                existingChat.messages.push({
                    toUserId,
                    fromUserId,
                    message,
                });
                await existingChat.save();
            } else {
                const newChat = new Chat({
                    roomId,
                    messages: [{
                        toUserId,
                        fromUserId,
                        message,
                    }]
                });
                await newChat.save();
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });

        /**
         * Approach 2: Using Socket.IO to fetch chat history and send it to the client
         */
        socket.on("chatHistory", async ({ fromUserId, toUserId }) => {
            const roomId = getHashedSecreteId(fromUserId, toUserId);
            const chat = await Chat.findOne({ roomId });
            const messages = chat ? chat.messages : [];
            socket.emit("chatHistoryResponse", { messages });
        });

    });
};

const getHashedSecreteId = (fromUserId, toUserId) => {
    const roomId = [fromUserId, toUserId].sort().join(process.env.CHAT_ROOM_ID);
    return crypto.createHash("sha256").update(roomId).digest("hex");
}

module.exports = { initializeSocket, getHashedSecreteId };