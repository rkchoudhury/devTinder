const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

/**
 * Get all the pending connection request for the loggedIn user
 */
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: "interested",
        });

        if (connectionRequests?.length === 0) {
            return res.json({ message: "No pending connection request found." });
        }

        res.json({ message: "Data fetched successfully.", data: connectionRequests });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = userRouter;