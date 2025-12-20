const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const messageSchema = new Schema(
    {
        senderId: {
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
    },
);

module.exports = messageSchema;
