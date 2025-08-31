const express = require("express");
const bcrypt = require("bcrypt");

const { validateSignUpData, validateLoginData } = require("../utils/validation");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    const saltRounds = 10;
    const userObj = req.body; // Reading the data from the request
    const { firstName, lastName, emailId, password } = userObj;

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

        // 5. Adding JWT token onto the cookie header
        const token = await user.getJWT();
        // Added a exipre time of 7 days - After the exipre time the token will automatically removed from the browser's cookie
        res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // Adding value to the cookie header

        // 6. Send the response back to the client
        res.status(200).json({ message: "User created successfully!", data });
    } catch (error) {
        res.status(400).json({ message: "Error: " + error?.message });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

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
            // A. Creating JSW token - Added expire time of 7 days
            // const token = jwt.sign({ _id: user._id }, 'DevTinder@123#TestEnv', { expiresIn: '7d' });
            const token = await user.getJWT();

            // B. Adding JWT token onto the cookie header
            // Added a exipre time of 7 days - After the exipre time the token will automatically removed from the browser's cookie
            res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // Adding value to the cookie header

            res.status(200).json({ message: "Login Successful!", data: user });
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

module.exports = authRouter;