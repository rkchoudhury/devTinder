// Starting point of our node.js application

const express = require('express');

const connectDB = require("./config/database");

const app = express();

app.use("/", (req, res) => {
    res.send("Hello from server!");
});

connectDB()
    .then(() => {
        console.log("Database connected successfully");

        app.listen(7000, () => {
            console.log("Server is running at 7000");
        });
    })
    .catch((error) => {
        console.log("Error: Database cannot be connected", error.message);
    });
