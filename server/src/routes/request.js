const express = require("express");

const { userAuth } = require("../middlewares/auth");
const { detectClient } = require("../middlewares/client");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const sendEmail = require("../utils/emailUtils/sendEmail");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", detectClient, userAuth, async (req, res) => {
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

        // Sending Email to the User
        if (status === "interested") {
            const { firstName: receiverFirstName, emailId: receiverEmailId } = toUser;
            const {
                firstName: senderFirstName,
                lastName: senderLastName,
                emailId: senderEmailId,
            } = req.user;

            const emailMessage = `${receiverFirstName}, you have got one friend request from ${senderFirstName} ${senderLastName}.`;
            await sendEmail.run(emailMessage, receiverEmailId, senderEmailId);
        }

        res.json({
            message:
                status === "interested"
                    ? `${req.user.firstName} is interested in ${toUser.firstName}.`
                    : `${req.user.firstName} ignored ${toUser.firstName}.`,
            data,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * Thought Procss:
 *      User is reviewing the requests (interested request only). He can either accept/reject the request.
 * 
 * /request/review/:status/:requestId
 *      1. Validate the status
 *          - status can only be accepted/rejected.
 *      2. Validate requestId
 *          - check if requestId is there in connectionRequest DB or not
 *      3. LoggedIn user's id should match the toUserId
 *      4. connection request should be interested
 */
requestRouter.post("/request/review/:status/:requestId", detectClient, userAuth, async (req, res) => {
    try {
        const { status, requestId } = req.params;
        const loggedInUser = req.user;

        // validate status
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid status type: " + status);
        }

        // validate requestId - if request id present inside the DB
        // loggedInUserId should be toUserId
        // status should be interested
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: 'interested'
        });

        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection request not found." });
        }

        // Update the status & DB
        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({ message: `Connection request ${status}ed successfully.`, data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = requestRouter;