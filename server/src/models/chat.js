const mongoose = require("mongoose");
const messageSchema = require("./message");

const { Schema, model } = mongoose;

const chatSchema = new Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        messages: [messageSchema],
    },
    {
        timestamps: true,
    }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;