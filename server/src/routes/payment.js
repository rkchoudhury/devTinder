const express = require("express");
const { userAuth } = require("../middlewares/auth");

const paymentRouter = express.Router();

/**
 * 1. Create the Order on RozarPay
 * 2. Sends back the orderId
 */
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
    try {
        const user = req.user;

        // Sending custom data as a json from the server
        res.status(200).json({ data: user, status: "success" });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = paymentRouter;