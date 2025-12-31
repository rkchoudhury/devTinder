const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const refreshTokenSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tokenHash: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
        },
        // isRevoked: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    {
        timestamps: true,
    }
);

const RefreshToken = model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;