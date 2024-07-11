require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const { connectDb } = require('./connection/connection');
//const resrtrictAccess=require("./middlewares/auth")
const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

// Set EJS as the templating engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Connect to the database
connectDb("mongodb://127.0.0.1:27017/short-url")
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("Error connecting to DB", err);
    });

// Import routers
const staticRouter = require('./routes/staticRouter');
const urlRouter = require('./routes/url');
const userRouter = require('./routes/user');

// Use the routers
app.use("/",urlRouter);
app.use("/routes/users", staticRouter); // Verify this route path is intentional
app.use("/users1", userRouter); // Ensure this is the correct path for userRouter

// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
