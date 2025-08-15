const express = require("express");

const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", userAuth, (req, res) => {
    try {
        console.log("params", req.params);
        res.status(200).send("Received");
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

module.exports = requestRouter;