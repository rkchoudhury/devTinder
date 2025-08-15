const express = require("express");
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth");
const { validateForgotPasswordData, validateEditProfileData } = require("../utils/validation");

const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;

        // Sending custom data as a json from the server
        res.status(200).json({ data: user, status: "success" });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const data = req.body;

        const shouldAllowUpdate = validateEditProfileData(data);
        if (!shouldAllowUpdate) {
            return res.status(400).send("Invalid edit request!");
        }

        const loggedInUser = req.user;
        Object.keys(data).forEach(key => loggedInUser[key] = data[key]);
        await loggedInUser.save();

        res.json({
            message: "User profile updated successfully.",
            data: loggedInUser,
        })

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

profileRouter.patch("/profile/password", async (req, res) => {
    try {
        const saltRounds = 10;
        const { emailId, password } = req.body;

        // 1. Validate the received data
        validateForgotPasswordData(emailId, password);

        // 2. Fetch the data from the DB based on the emailId
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Email Id.");
        }

        // 3. Encrypt the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Insert the data onto the DB
        user.password = hashedPassword

        // 5. Now the data will be saved onto the database
        await user.save();

        // 6. Send the response back to the client
        res.send("Password updated successfully!");

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = profileRouter;