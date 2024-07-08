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

module.exports = { generateShortUrl };
