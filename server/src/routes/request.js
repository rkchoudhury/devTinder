const express = require("express");

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
    try {
        const { status, userId: toUserId } = req.params;
        const fromUserId = req.user._id;

        // Validate the received data
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid status type: " + status);
        }

        const toUser = await User.findOne({ _id: toUserId });
        if (!toUser) {
            // Always return the statement otherwise below code will be executed
            return res.status(404).json({ message: "User not found." });
        }

        // Check if there is any existing connection request
        const isRequestExist = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (isRequestExist) {
            throw new Error("Connection request already exist.");
        }

        // Saving the data into the DB
        const data = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        await data.save();

        res.json({
            message: 'Connection request sent successfully.',
            data
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = requestRouter;