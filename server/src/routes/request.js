const express = require("express");

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
    try {
        const { status, userId: toUserId } = req.params;
        const fromUserId = req.user._id;

        const isValidStatus = ["ignored", "interested"].includes(status);
        if (!isValidStatus) {
            throw new Error("Invalid status!")
        }

        const isUserExist = await User.findOne({ _id: toUserId });
        if (!isUserExist) {
            throw new Error("Invalid userId!");
        }

        const isRequestExist = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (isRequestExist) {
            throw new Error("There is already a connection request from the requested user.");
        }

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
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = requestRouter;