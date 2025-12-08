const express = require("express");
const { userAuth } = require("../middlewares/auth");

const paymentRouter = express.Router();
const razorpayInstnace = require("../utils/paymentUtils/razorpay");
const Payment = require("../models/payment");

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

        // Save the order data on DB
        const { id, amount, currency, status, receipt, notes } = order;
        const payment = new Payment({
            userId: user._id,
            orderId: id,
            status,
            amount: amount / 100,
            currency,
            receipt,
            notes
        });
        const savedPayment = await payment.save();

        // Sending order data as a json to frontend
        res.status(200).json({ data: savedPayment, status: "success" });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = paymentRouter;