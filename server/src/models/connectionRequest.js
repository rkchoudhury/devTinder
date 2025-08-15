const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
    {
        fromUserId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        toUserId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            enum: ["ignored", "interested"],
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;