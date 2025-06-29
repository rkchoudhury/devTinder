// Starting point of our node.js application

const express = require('express');

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello from the server test!")
});

app.use("/", (req, res) => {
    res.send("Hello from the server 2!")
});

// app.use((req, res) => {
//     res.send("Hello from the server!")
// });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});