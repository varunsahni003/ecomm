const express = require("express");
// const passport = require('passport');
var VerifyToken = require('../middleware/verify-token');

const AuthController = require("../controllers/auth-controller");


const router = express.Router();

router.post("/login", function(req, res){
    AuthController.login(req, res)
});
router.post("/register", function(req, res){
    AuthController.register(req, res)
});
router.get("/getUserDetails", VerifyToken, function(req, res){
    AuthController.getUserDetails(req, res)
});
router.get("/logout", function(req, res){
    AuthController.logout(req, res)
});
// router.delete("/deleteUser/:userId", function(req, res){
//     AuthController.deleteUser(req, res)
// });

// router.post("/createAddress", function(req, res){
//     AuthController.createAddress(req, res)
// });

// router.put("/updateAddress/:addressId", function(req, res){
//     AuthController.createAddress(req, res)
// });

// router.get("/addresses", function(req, res){
//     AuthController.fetchAddresses(req, res)
// });

// router.post("/addToCart", function(req, res){
//     AuthController.addToCart(req, res)
// });

// router.get("/cart", function(req, res){
//     AuthController.fetchCartProducts(req, res)
// });

// router.get("/orders", function(req, res){
//     AuthController.fetchOrders(req, res)
// });

// router.get("/wishlist", function(req, res){
//     AuthController.fetchWishlist(req, res)
// });

// router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
//     return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
// });

module.exports = router;
