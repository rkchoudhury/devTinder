const express = require("express");

const Chat = require("../models/chat");
const { userAuth } = require("../middlewares/auth");
const { getHashedSecreteId } = require("../utils/socketUtils/initializeSocket");

const chatRouter = express.Router();

chatRouter.get("/chat", userAuth, async (req, res) => {
    try {
        const { toUserId } = req.query;
        const user = req.user;
        const fromUserId = user._id;

        const roomId = getHashedSecreteId(fromUserId, toUserId);
        const chat = await Chat.findOne({ roomId });
        const messages = chat ? chat.messages : [];

        res.status(200).json({ messages, status: "success" });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = chatRouter;