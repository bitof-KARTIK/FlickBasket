const jwt = require("jsonwebtoken");
require("dotenv").config();
async function validateAdmin(req, res, next) {
    try {
        let token = req.cookies.token;
        if (!token) {
            res.send("Please login to continue");
        }
        let data = await jwt.verify(token, process.env.JWT_KEY)
        req.user = data;
        next();
    } catch (error) {
        res.send(error.message);
    }


}
async function validateUser(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}
module.exports = { validateAdmin, validateUser };