const socket = require("socket.io");
const crypto = require("crypto");

const Chat = require("../../models/chat");
const User = require("../../models/user");

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        },
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
                    participants: { $all: [fromUserId, toUserId] },
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
                        messages: [
                            {
                                senderId: fromUserId,
                                message,
                                timestamp,
                            },
                        ],
                    });
                    await newChat.save();
                }

                const loggedInUser = await User.findOne({ _id: fromUserId }).populate(
                    "firstName lastName photoUrl"
                );

                // Emit the message to all clients in the room
                io.to(roomId).emit("receiveMessage", {
                    senderId: fromUserId,
                    message,
                    timestamp,
                    _id: Math.random().toString(36).substring(2, 15), // Temporary ID
                    firstName: loggedInUser.firstName,
                    lastName: loggedInUser.lastName,
                    photoUrl: loggedInUser.photoUrl,
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
                }).populate({
                    path: "messages.senderId",
                    select: "firstName lastName photoUrl"
                });

                /**
                 * Flatten the messages to include sender details
                 */
                const messages = chat ? chat.messages.map(({ _id, senderId, message, timestamp }) => ({
                    _id,
                    message,
                    timestamp,
                    senderId: senderId._id,
                    firstName: senderId.firstName,
                    lastName: senderId.lastName,
                    photoUrl: senderId.photoUrl
                })) : [];

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
};

module.exports = { initializeSocket, getHashedSecreteId };

/**
 * TODO: Advanced features
 *  - Check if the user is authorized to send message in this room
 *  - If fromUserId and toUserId are friends or not
 *  - Green tick for online users
 *  - Last seen timestamp
 *  - Group chats - Enhance chat to support group chats
 */