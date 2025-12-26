const express = require("express");
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth");
const { detectClient } = require("../middlewares/client");
const { validateForgotPasswordData, validateEditProfileData } = require("../utils/validation");

const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile/view", detectClient, userAuth, async (req, res) => {
    try {
        const user = req.user.toJSON();

        // Clenup the response data by removing sensitive information
        delete user.password;

        // Sending custom data as a json from the server
        res.status(200).json({ data: user, status: "success" });
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

// patch is giving cors error on web -> So changed `profileRouter.patch` to `profileRouter.put`
profileRouter.put("/profile/edit", detectClient, userAuth, async (req, res) => {
    try {
        const data = req.body;

        // 1. Validate received data
        validateEditProfileData(data);

        const loggedInUser = req.user;

        // 2. Update the loggedInUser data
        Object.keys(data).forEach(key => loggedInUser[key] = data[key]);

        // 3. Save updated loggedInUser data
        await loggedInUser.save();

        // Clenup the response data by removing sensitive information
        delete loggedInUser._doc.password;

        // 4. Send success message back to the client
        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully`,
            data: loggedInUser,
        })

    } catch (error) {
        res.status(400).json({ message: "Error: " + error?.message });
    }
});

// Patch is blocked by cors. Changing it to put
// profileRouter.patch("/profile/password", async (req, res) => {
profileRouter.put("/profile/password", async (req, res) => {
    try {
        const saltRounds = 10;
        const { emailId, password } = req.body;

        // 1. Validate the received data
        validateForgotPasswordData(emailId, password);

        // 2. Fetch the data from the DB based on the emailId
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            // return res.status(400).send("Invalid Email Id.");
            throw new Error("Invalid Email Id.");
        }

        // 3. Encrypt the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Insert the data onto the DB
        user.password = hashedPassword

        // 5. Now the data will be saved onto the database
        await user.save();

        // 6. Send the response back to the client
        res.status(200).json({ message: "Password updated successfully!" });

    } catch (error) {
        res.status(400).json({ message: "Error: " + error?.message });
    }
});

module.exports = profileRouter;