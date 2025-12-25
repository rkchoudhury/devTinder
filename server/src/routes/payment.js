const express = require("express");
const {
    validatePaymentVerification,
    validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const { userAuth } = require("../middlewares/auth");
const { detectClient } = require("../middlewares/client");

const paymentRouter = express.Router();
const razorpayInstnace = require("../utils/paymentUtils/razorpay");
const Payment = require("../models/payment");
const crypto = require("crypto");
const { membershipAmount, membershipValidity } = require("../utils/constants");
const User = require("../models/user");

/**
 * 1. Create the Order on RozarPay
 * 2. Sends back the orderId
 */
paymentRouter.post("/payment/create", detectClient, userAuth, async (req, res) => {
    try {
        const user = req.user;
        const { membershipType } = req.body;

        // Create an order on RazorPay
        const order = await razorpayInstnace.orders.create({
            amount: membershipAmount[membershipType] * 100, // Lower currency will be passed - in Paisa. For Gold - 70000, for Silver - 30000
            currency: "INR",
            receipt: "receipt#1",
            notes: {
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                membershipType,
            },
        });

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

/**
 * 0. Verify the payment signature
 * 1. Verify the payment on RazorPay
 * 2. Fetch the payment information from RazorPay
 * 3. Update the payment status on DB
 * 4. Update the user data on DB
 */
paymentRouter.post("/payment/verification", detectClient, userAuth, async (req, res) => {
    try {
        const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

        // Verify the payment signature
        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature !== razorpaySignature) {
            throw new Error("Payment verification failed.");
        }

        // Validate payment using Razorpay utility function
        const isPaymentValid = validatePaymentVerification(
            { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
            razorpaySignature,
            process.env.RAZORPAY_KEY_SECRET
        );

        if (!isPaymentValid) {
            throw new Error("Invalid Payment");
        }

        // Get the payment information from RazorPay
        const paymentDetails = await razorpayInstnace.payments.fetch(razorpayPaymentId);

        // Update payment details
        const payment = await Payment.findOne({ orderId: razorpayOrderId });
        payment.paymentId = razorpayPaymentId;
        payment.status = paymentDetails.status;
        await payment.save();

        // Update user data
        const user = await User.findOne({ _id: payment.userId });
        user.isPremium = true;
        user.membershipType = paymentDetails.notes.membershipType;
        user.membershipValidity = membershipValidity[paymentDetails.notes.membershipType];
        await user.save();

        // Removed sensitive data before sending the response
        const response = user.toJSON();
        delete response.password;
        delete response.refreshToken;

        res.status(200).json({ user: response, status: "success" });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

/**
 * Update the payment status and user data on payment failure
 */
paymentRouter.post('/payment/failure', detectClient, userAuth, async (req, res) => {
    const { razorpayPaymentId, razorpayOrderId } = req.body;

    if (!razorpayPaymentId || !razorpayOrderId) {
        return res.status(400).json({ success: false, message: "Payment ID and Order ID are required." });
    }

    try {
        // Update payment details
        const payment = await Payment.findOne({ orderId: razorpayOrderId });
        payment.paymentId = razorpayPaymentId;
        payment.status = 'failed';
        await payment.save();

        // Update user data
        const user = await User.findOne({ _id: payment.userId });
        user.isPremium = false;
        await user.save();

        res.json({
            success: false,
            status: 'failed',
            message: "Payment failed",
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching payment details from Razorpay API" });
    }
});



module.exports = paymentRouter;
