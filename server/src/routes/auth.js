const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const { validateSignUpData, validateLoginData } = require("../utils/validation");
const { detectClient } = require("../middlewares/client");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", detectClient, async (req, res) => {
    const saltRounds = 10;
    const userObj = req.body; // Reading the data from the request
    const { firstName, lastName, emailId, password } = userObj;
    const clientType = req.clientType;

    /**
       * Sample Data Format:
       * 
        {
            "firstName": "Rakesh",
            "lastName": "Choudhury",
            "emailId": "rakeshchoudhury@gmail.com",
            "password": "Rakesh@123",
        }
    */

    try {
        // 1. Validation of data
        validateSignUpData(userObj);

        // 2. Encrypt the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 3. Insert the data onto the DB
        // Always explictly mentioned the field
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: hashedPassword
        });

        // 4. Now the data will be saved onto the database
        const data = await user.save();

        if (clientType === 'web') {
            // 5. Adding JWT token onto the cookie header
            const token = await user.getJWT();
            // Added a exipre time of 7 days - After the exipre time the token will automatically removed from the browser's cookie
            res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // Adding value to the cookie header

            // Clenup the response data by removing sensitive information
            delete data._doc.password;
            delete data._doc.refreshToken;

            // 6. Send the response back to the client
            res.status(200).json({ message: "User created successfully!", data });
        } else if (clientType === 'mobile') {
            // Generate Access Token and Refresh Token for Mobile Client
            const { accessToken, refreshToken } = await user.getMobileToken();

            // Save the refresh token in the database
            user.refreshToken = refreshToken;
            await user.save();

            // Clenup the response data by removing sensitive information
            delete data._doc.password;
            delete data._doc.refreshToken;

            res.status(200).json({ message: "User created successfully!", data, accessToken, refreshToken });
        } else {
            return res.status(400).json({ message: 'Unauthorized: Invalid client type' });
        }
    } catch (error) {
        res.status(400).json({ message: "Error: " + error?.message });
    }
});

authRouter.post("/login", detectClient, async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const clientType = req.clientType;

        // 1. Validate the emailId
        validateLoginData(emailId);

        // 2. Fetch the data from the DB based on the emailId
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials."); // Don't expose any other infromation
        }

        // 3. Compare the received and stored hashed password
        // const isPasswordValid = await bcrypt.compare(password, user?.password);
        const isPasswordValid = await user.validatePassword(password);

        // 4. Send the response back to the client
        if (isPasswordValid) {
            if (clientType === 'web') {
                // A. Creating JSW token - Added expire time of 7 days
                // const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, { expiresIn: '7d' });
                const token = await user.getJWT();

                // B. Adding JWT token onto the cookie header
                // Added a exipre time of 7 days - After the exipre time the token will automatically removed from the browser's cookie
                res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // Adding value to the cookie header

                // Clenup the response data by removing sensitive information
                delete user._doc.password;
                delete user._doc.refreshToken;

                res.status(200).json({ message: "Login Successful!", data: user });
            } else if (clientType === 'mobile') {
                // Generate Access Token and Refresh Token for Mobile Client
                const { accessToken, refreshToken } = await user.getMobileToken();

                // Save the refresh token in the database
                user.refreshToken = refreshToken;
                await user.save();

                // Clenup the response data by removing sensitive information
                delete user._doc.password;
                delete user._doc.refreshToken;

                res.status(200).json({ message: "Login Successful!", data: user, accessToken, refreshToken });
            } else {
                return res.status(400).json({ message: 'Unauthorized: Invalid client type' });
            }
        } else {
            throw new Error("Invalid Credentials."); // Don't expose any other infromation
        }

    } catch (error) {
        res.status(400).json({ message: "Error: " + error?.message });
    }
});

authRouter.post("/logout", async (req, res) => {
    // Clearing the token from the cookie by updating the expies time
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).send("You are logout Successful!");
});

authRouter.post("/auth/refresh", async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token' });
    }

    const storedToken = await User.findOne({ refreshToken }).populate('refreshToken');
    if (!storedToken) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );
    const { _id } = decoded;

    if (!_id) {
        return res.status(401).send("Unauthorized: Invalid refresh token");
    }

    const newAccessToken = await jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    res.json({ accessToken: newAccessToken });
});


module.exports = authRouter;