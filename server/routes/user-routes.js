const express = require("express");

const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/", function(req, res){
    UserController.createUser(req, res)
});

router.get("/", function(req, res){
    UserController.fetchUsers(req, res)
});

router.get("/:id", function(req, res){
    UserController.fetchUser(req, res)
});

router.delete("/:id", function(req, res){
    UserController.deleteUser(req, res)
});

router.put("/:id", function(req, res){
    UserController.updateUser(req, res)
});

module.exports = router;
