const express = require("express");
const { userAuth } = require("../middlewares/auth");

const paymentRouter = express.Router();
const razorpayInstnace = require("../utils/paymentUtils/razorpay");
const Payment = require("../models/payment");
const {
    validatePaymentVerification,
    validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const crypto = require("crypto");

/**
 * 1. Create the Order on RozarPay
 * 2. Sends back the orderId
 */
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const { membershipType } = req.body;

        // Lower currency will be passed. For Gold - Rs 700, for Silver - Rs. 300
        const membershipAmount = membershipType === "gold" ? 70000 : 30000;

        // Create an order on RazorPay
        const order = await razorpayInstnace.orders.create({
            amount: membershipAmount,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                membershipType,
            },
        });

        console.log("rkk order", order);

        // Save the order data on DB
        const { id, amount, currency, status, receipt, notes } = order;
        const payment = new Payment({
            userId: user._id,
            orderId: id,
            status,
            amount: amount / 100,
            currency,
            receipt,
            notes,
        });
        const savedPayment = await payment.save();

        console.log("rkk savedPayment", savedPayment);

        // Sending order data as a json to frontend
        res.status(200).json({
            order: savedPayment,
            razorpayKeyId: process.env.RAZORPAY_KEY_ID, // Public Data
            status: "success",
        });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

paymentRouter.post("/payment/verification", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

        console.log("res 1>>", req.body);

        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature !== razorpaySignature) {
            throw new Error("Payment verification failed.");
        }

        const response = validatePaymentVerification(
            { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
            razorpaySignature,
            process.env.RAZORPAY_KEY_SECRET
        );

        console.log("response>>", response);

        // res
        //     .status(200)
        //     .json({
        //         order: savedPayment,
        //         razorpayKeyId: process.env.RAZORPAY_KEY_ID, // Public Data
        //         status: "success",
        //     });

        if (response) {
            // Update user data
        }

        res.status(200).json({ "success": true });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = paymentRouter;
