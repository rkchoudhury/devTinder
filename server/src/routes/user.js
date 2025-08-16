const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

const USER_SAFE_FIELDS = ["firstName", "lastName", "age", "photoUrl", "skills", "about"];

/**
 * Get all the pending connection request for the loggedIn user
 */
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_FIELDS);

        // Alternative way
        // const connectionRequests = await ConnectionRequest.find({
        //     toUserId: loggedInUserId,
        //     status: "interested",
        // }).populate("fromUserId", "firstName lastName age photoUrl skills about");

        res.json({ message: "Data fetched successfully.", data: connectionRequests });
    } catch (error) {
        res.status(400).send({ message: "Error: " + error.message });
    }
});

/**
 * Get all the connections that are connected to me or are accepted my request
 */
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        /**
         * User A -> User B ==> User B Accepted
         * or 
         * User B -> User A ==> User A Accepted
         * 
         * Then User A and B will be connected to each other
         */
        const connectionData = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUserId },
                { fromUserId: loggedInUserId },
            ],
            status: "accepted"
        }).populate("fromUserId", USER_SAFE_FIELDS).populate("toUserId", USER_SAFE_FIELDS); // It will populate the User data inside the respective keys

        // Extracted only the user information from the connectionData List
        const data = connectionData.map(connection => {
            if (connection.fromUserId._id.toString() === loggedInUserId.toString()) { // the connection that is sent by you
                return connection.toUserId; // the user to whom you have sent out a connection request
            } else {
                return connection.fromUserId; // the user that has sent the connection request to you
            }
        });

        res.json({ message: "Data fetched successfully.", data });
    } catch (error) {
        res.status(400).send({ message: "Error: " + error.message });
    }
});

module.exports = userRouter;