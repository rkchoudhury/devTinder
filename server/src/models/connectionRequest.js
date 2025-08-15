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
            enum: {
                values: ["ignored", "interested"],
                message: '{VALUE} is incorrect status type.'
            },
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

// Model always starts with Capital letter
const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;