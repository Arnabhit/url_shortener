const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth');

router.get('/', checkAuth, (req, res) => {
    res.render('home'); // Render the home page if authenticated
});

router.get('/signup', (req, res) => {
    res.render('signup'); // Render the signup page
});

router.get('/login', (req, res) => {
    res.render('login'); // Render the login page
});

module.exports = router;
