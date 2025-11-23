const mongoose = require("mongoose");

const CONNECTION_STRING = process.env.DATABASE_BASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

const connectDB = async () => {
    // Connect with the mongoDB cluster
    await mongoose.connect(
        `${CONNECTION_STRING}/${DATABASE_NAME}` // will connect to the devTinder database
    );
};

module.exports = connectDB;
