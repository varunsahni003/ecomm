const express = require("express");
const passport = require('passport');

const AuthController = require("../controllers/auth-controller");


const router = express.Router();

router.post("/login", function(req, res){
    AuthController.login(req, res)
});
router.post("/register", function(req, res){
    AuthController.register(req, res)
});

router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});

module.exports = router;
