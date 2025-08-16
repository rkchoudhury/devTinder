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
        }).populate("fromUserId", ["firstName", "lastName", "age", "photoUrl", "skills"]);

        // Alternative way
        // const connectionRequests = await ConnectionRequest.find({
        //     toUserId: loggedInUserId,
        //     status: "interested",
        // }).populate("fromUserId", "firstName lastName age photoUrl skills");

        res.json({ message: "Data fetched successfully.", data: connectionRequests });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = userRouter;