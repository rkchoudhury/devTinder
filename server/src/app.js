const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Configure dotenv
require('dotenv').config({ path: '.env' });

// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

const app = express();

const corsOptions = {
    // Whitelisting the domain so that the cookies can be set
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));

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

        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is running at ${process.env.SERVER_PORT}`);
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
