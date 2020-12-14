const User = require("../models/user-model");

// Create a new user
exports.createUser = (req, res, next) => {
  const user = {
    name: req.body.name,
    uniqueId: req.body.uniqueId,
    answers: req.body.answers
  };
  const uniqueId = req.body.uniqueId;
  // upsert: true, if data is not there, it will create
  User
    .updateOne({uniqueId}, user, {upsert: true})
    .then(() => {
      res.status(201).json({
        message: "User added successfully"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: {
          "failed"  : "Adding a user failed!",
          "error"   : error
        }
      });
    });
};


exports.getUser = (req, res) => {
  // lean() - converts to json
  User.findOne({"uniqueId": req.query.data}).lean()
    .then(userData => {
      res.status(200).json({
        reviewData: userData.reviewData
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching user data failed!"
      });
    });
};

exports.deleteUser = (req, res) => {
  User.deleteOne({"uniqueId": req.query.id})
    .then(result => {
      res.status(200).json({
        msg: 'User deleted successful'
      })
    }).catch(e=>console.log(e));
}