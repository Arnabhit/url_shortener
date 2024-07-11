const { getUserId } = require('../service/auth');

async function checkAuth(req, res, next) {
    try {
        const uid = req.cookies?.uid;
        if (!uid) {
            console.log("No UID found in cookies, redirecting to signup.");
            return res.render('signup'); // Redirect to signup page if not logged in
        }

        const user = getUserId(uid);
        if (!user) {
            console.log("No user found for the given UID, redirecting to signup.");
            return res.render('signup'); // Redirect to signup page if no user found
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in checkAuth middleware:", error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = checkAuth;
