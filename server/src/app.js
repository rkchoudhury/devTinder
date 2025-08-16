const express = require("express");
const cookieParser = require('cookie-parser');

const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

const app = express();

// This middleware converts the request object to the readable string
app.use(express.json()); // The client must send requests with Content-Type: application/json for express.json() to work

// Parses Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// Added all the API routes here
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


// Default route handler
app.use("/", (_req, res) => {
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

/**
 * Proper way to connect to database
 *    - First connect to DB then start the server
 * 
 * Output:
 * 
    Database connected successfully
    Server is running at 7000
 */
