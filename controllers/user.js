const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUserId } = require("../service/auth");

const handleUserSignup = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Create new user
        await User.create({
            name: username,
            password: password,
            email: email
        });
        const user = await User.findOne({ email });
        const sessionId = uuidv4();
        setUserId(sessionId, user);
        res.cookie("uid", sessionId);
        return res.render('home');
    } catch (error) {
        console.error('Error during user signup:', error);
        return res.status(500).send('Internal Server Error');
    }
};

const handleUserSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found, redirecting to signup.");
            return res.render('signup'); // Redirect to signup page if user not found
        }

        // Validate password (direct comparison, insecure for real applications)
        if (password !== user.password) {
            console.log("Invalid password, redirecting to signup.");
            return res.render('signup'); // Redirect to signup page if password is invalid
        }

        // Handle successful sign-in
        const sessionId = uuidv4();
        setUserId(sessionId, user);
        res.cookie("uid", sessionId);
        return res.render('home');
        
    } catch (error) {
        console.error('Error during user signin:', error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    handleUserSignup,
    handleUserSignin,
};
