const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { detectClient } = require("../middlewares/client");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

const USER_SAFE_FIELDS = ["firstName", "lastName", "age", "gender", "photoUrl", "skills", "about", "isPremium"];

/**
 * Get all the pending connection request for the loggedIn user
 */
userRouter.get("/user/requests/received", detectClient, userAuth, async (req, res) => {
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
userRouter.get("/user/connections", detectClient, userAuth, async (req, res) => {
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

/**
 * Get all the users expects following users
 *  - self
 *  - which you have already ignored 
 *  - which you have already shown interested
 *  - which you have rejected/approved the request
 * 
 * ie. We have to hide all the users that you have ignored/iterested/accepted/rejected the connection request
 * ie. To the users to which a record available in the connectionRequest table
 */
userRouter.get("/user/feed", detectClient, userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        // Validate limit
        limit = limit > 50 ? 50 : limit;

        // Added skip logic
        const skip = (page - 1) * limit;

        const existingConnectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUserId },
                { toUserId: loggedInUserId }
            ]
        }).select(["fromUserId", "toUserId"]);

        const hideUsersFromFeed = new Set(); // stores unique data

        // Hide self
        hideUsersFromFeed.add(loggedInUserId);

        // Hide existing connections requested users if any
        existingConnectionRequests.forEach(request => {
            const { fromUserId, toUserId } = request;
            hideUsersFromFeed.add(fromUserId);
            hideUsersFromFeed.add(toUserId);
        });

        const users = await User.find({
            _id: { $nin: Array.from(hideUsersFromFeed) },
        })
            .select(USER_SAFE_FIELDS)
            .skip(skip)
            .limit(limit);

        res.json({ message: 'Data fetched successfully.', data: users });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = userRouter;

/**
 * Pagination:
 * 
 * /user/feed?page=1&limit=10 -> 1-10
 * /user/feed?page=2&limit=10 -> 11-20
 * /user/feed?page=3&limit=10 -> 21-30
 * 
 * MongoDB provides two methods:
 *      .skip()
 *      .limit()
 *
 * skip = (page - 1) * limit
 */