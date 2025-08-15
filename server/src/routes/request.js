const express = require("express");

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
    try {
        const { status, userId } = req.params;
        const loggedInUser = req.user;

        const isValidStatus = ["ignored", "interested"].includes(status);
        if (!isValidStatus) {
            throw new Error("Invalid status!")
        }

        const isUserExist = await User.findOne({ _id: userId });
        if (!isUserExist) {
            throw new Error("Invalid userId!");
        }

        const isRequestExist = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: loggedInUser._id, toUserId: userId },
                { fromUserId: userId, toUserId: loggedInUser._id }
            ]
        });

        if (isRequestExist) {
            throw new Error("There is already a connection request from the requested user.");
        }

        const request = new ConnectionRequest({
            fromUserId: loggedInUser._id,
            toUserId: userId,
            status
        });

        await request.save();

        res.status(200).send("Connection request send successfully");
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = requestRouter;