const mongoose = require("mongoose");

const CONNECTION_STRING =
    "mongodb+srv://rakesh_choudhury:WohQCgKJ7rtibN9s@namastenode.95cthjp.mongodb.net";
const DATABASE_NAME = "devTinder";

const connectDB = async () => {
    // Connect with the mongoDB cluster
    await mongoose.connect(
        `${CONNECTION_STRING}/${DATABASE_NAME}` // will connect to the devTinder database
    );
};

module.exports = connectDB;
