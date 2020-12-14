const express = require("express");

const UserController = require("../controllers/user-controller");


const router = express.Router();

router.post("", function(req, res, next){
    UserController.createuser(req, res, next)
});

router.get("/user", function(req, res){
    UserController.getUser(req, res)
});

router.delete("/user", function(req, res){
    UserController.deleteUser(req, res)
});

// router.get("/:id", function(req, res){
//     UserController.getPost
// });

module.exports = router;
