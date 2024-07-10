require('dotenv').config();
const express = require('express');
const path = require('path');
const staticRouter = require('./routes/staticRouter');
const urlRouter = require('./routes/url');
const { connectDb } = require('./connection/connection');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Setting EJS as the view engine
app.set("views", path.resolve("./views")); // Setting the views directory

// Connect to the database
connectDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("Error connecting to DB", err);
    });

// Use the routers
app.use("/", urlRouter);
app.use("/routes/users", staticRouter);

// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
