const express = require("express");

const Chat = require("../models/chat");
const { userAuth } = require("../middlewares/auth");
const { detectClient } = require("../middlewares/client");

const chatRouter = express.Router();

chatRouter.get("/chat/:toUserId", detectClient, userAuth, async (req, res) => {
    try {
        const { toUserId } = req.params;
        const user = req.user;
        const fromUserId = user._id;

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

        res.status(200).json({ messages, status: "success" });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = chatRouter;