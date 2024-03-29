var express = require('express');
var router = express.Router();

var Users = require('../models/user-model');

// CREATES A NEW USER
exports.createUser = (req, res) => {
    Users.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }, 
    function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(user);
    });
};

// RETURNS ALL THE USERS IN THE DATABASE
exports.fetchUsers = (req, res) => {
    Users.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
};

// GETS A SINGLE USER FROM THE DATABASE
exports.fetchUser = (req, res) => {
    Users.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
};

// DELETES A USER FROM THE DATABASE
exports.deleteUser = (req, res) => {
    Users.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
};

// UPDATES A SINGLE USER IN THE DATABASE
exports.updateUser = (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
};

module.exports = router;