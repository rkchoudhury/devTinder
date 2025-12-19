const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const chatSchema = new Schema(
    {
        roomId: {
            type: String,
            required: true,
            unique: true,
        },
        messages: [
            {
                toUserId: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                fromUserId: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                message: {
                    type: String,
                    required: true,
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                }
            }
        ],
    },
    {
        timestamps: true,
    }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;