const express = require("express");

const Chat = require("../models/chat");
const { userAuth } = require("../middlewares/auth");

const chatRouter = express.Router();

chatRouter.get("/chat/:toUserId", userAuth, async (req, res) => {
    try {
        const { toUserId } = req.params;
        const user = req.user;
        const fromUserId = user._id;

        const chat = await Chat.findOne({
            participants: { $all: [fromUserId, toUserId] }
        });
        const messages = chat ? chat.messages : [];

        res.status(200).json({ messages, status: "success" });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = chatRouter;