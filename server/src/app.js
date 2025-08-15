// Starting point of our node.js application

const express = require('express');

const app = express();

app.use("/", (req, res) => {
    res.send("Hello from server!");
});

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});