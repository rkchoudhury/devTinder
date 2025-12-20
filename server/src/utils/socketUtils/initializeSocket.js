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

            /**
             * Save chat message in DB
             */
            try {
                const existingChat = await Chat.findOne({
                    participants: { $all: [fromUserId, toUserId] }
                });

                const timestamp = new Date();

                if (existingChat) {
                    existingChat.messages.push({
                        senderId: fromUserId,
                        message,
                        timestamp,
                    });
                    await existingChat.save();
                } else {
                    const newChat = new Chat({
                        participants: [fromUserId, toUserId],
                        messages: [{
                            senderId: fromUserId,
                            message,
                            timestamp
                        }]
                    });
                    await newChat.save();
                }

                // Emit the message to all clients in the room
                io.to(roomId).emit("receiveMessage", {
                    senderId: fromUserId,
                    message,
                    timestamp,
                    _id: Math.random().toString(36).substring(2, 15), // Temporary ID 
                });
            } catch (error) {
                console.error("Error saving message to DB:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });

        /**
         * Approach 2: Using Socket.IO to fetch chat history and send it to the client
         */
        socket.on("chatHistory", async ({ fromUserId, toUserId }) => {
            try {
                const chat = await Chat.findOne({
                    participants: { $all: [fromUserId, toUserId] }
                });
                const messages = chat ? chat.messages : [];
                socket.emit("chatHistoryResponse", { messages });
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }

        });

    });
};

const getHashedSecreteId = (fromUserId, toUserId) => {
    const roomId = [fromUserId, toUserId].sort().join(process.env.CHAT_ROOM_ID);
    return crypto.createHash("sha256").update(roomId).digest("hex");
}

module.exports = { initializeSocket, getHashedSecreteId };