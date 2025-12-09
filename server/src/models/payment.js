const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const paymentSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            required: true,
        },
        receipt: {
            type: String,
            required: true,
        },
        notes: {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            emailId: {
                type: String,
            },
            membershipType: {
                type: String,
                enum: {
                    values: ["gold", "silver"],
                    message: '{VALUE} is incorrect membership type.'
                },
                required: true,
            }
        },
        // A order can be without payment also. It is optional.
        paymentId: {
            type: String,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
