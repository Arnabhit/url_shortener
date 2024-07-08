require('dotenv').config();
const express = require('express');
const urlRouter = require('./routes/url');
const URL = require('./models/url');
const { connectDb } = require('./connection/connection');

const app = express();
app.use(express.json());

// Connect to the database
connectDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("Error connecting to DB", err);
    });

// Use the URL router
app.use("/", urlRouter);

// Route to handle redirection


// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
