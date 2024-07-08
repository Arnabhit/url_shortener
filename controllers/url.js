const  shortid  = require('shortid');
const URL = require('../models/url');

async function generateShortUrl(req, res) {
    try {
        const body = req.body;
        if (!body.url) {
            return res.status(400).json({ error: "URL is required" });  // Use 400 for bad request
        }

        const shortId = shortid();
        await URL.create({
            shortId: shortId,
            redirectUrl: body.url,
            visitHistory: []
        });

        return res.json({ id: shortId });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function showShortUrl(req,res) {
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
}

module.exports = { generateShortUrl, showShortUrl};
