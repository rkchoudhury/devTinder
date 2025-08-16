const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
    {
        fromUserId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User", // Reference to the User collection
        },
        toUserId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User", // Reference to the User collection
        },
        status: {
            type: String,
            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: '{VALUE} is incorrect status type.'
            },
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

/**
 * Compound Indexes: to optimal the connectionRequest query search on fromUserId & toUserId together
 */
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

/**
 * Schema Validation
 * 
 * Pre saving validation
 *  - Can be used for logging, monitoring purposes.
 *  - We can add validation logic here
 */
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    const { fromUserId, toUserId } = connectionRequest;

    if (fromUserId.equals(toUserId)) {
        throw new Error("You can't send request to yourself!");
    }

    next(); // IMP: Call next otherwise we can't move ahead.
});

// Model always starts with Capital letter
const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;