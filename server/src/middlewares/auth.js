const jwt = require('jsonwebtoken');

const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        // 1. Accessing value from the cookie
        const cookies = req.cookies;
        const { token } = cookies;

        if (!token) {
            return res.status(401).send("Unauthorized Access. Please login again!");
        }

        // 2. Decoded the token to get the user id
        const decodedMessage = jwt.verify(token, 'DevTinder@123#TestEnv');
        const { _id } = decodedMessage;

        if (!_id) {
            return res.status(401).send("Unauthorized: Invalid token");
        }

        // 3. Find the user
        const user = await User.findOne({ _id: _id }); // The user is the instance of User object. And it will hold the reference.

        if (!user) {
            throw new Error("User not found,")
        }

        // Adding the loggedin user data to the req object.
        // So that we don't have to find the user again in the subsequent middlewares
        req.user = user;

        // 4. Move to the next middleware
        next();

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
}

module.exports = {
    userAuth,
}