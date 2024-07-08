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
app.get("/:shortid", async (req, res) => {
    try {
        const shortid = req.params.shortid;
        const entry = await URL.findOneAndUpdate(
            { shortId: shortid },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } // Return the updated document
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.redirect(entry.redirectUrl);
    } catch (err) {
        console.error("Error during redirection:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
