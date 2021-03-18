const User = require('../models/user-model');

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
 
exports.register = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
 
        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' });
        }
        req.body.password = hashedPassword;
        User.create(req.body, function (err, user) {
          if (err) return res.status(500).send("There was a problem registering the user." + err);
          // create a token
          var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token });
        });
        // let newUser = User(req.body);
        // newUser.save((err, user) => {
        //     if (err) {
        //         return res.status(400).json({ 'msg': err });
        //     }
        //     return res.status(201).json(user);
        // });
    });
};

exports.getUserDetails = (req, res) => {
  // password: 0  wont send password in response
  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
};

exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }
    
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send('Error on the server.' + err);
      if (!user) return res.status(404).send('No user found.');
      
      // Comparesync compares password sent in request with pass in db
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: 'Invalid username or password' });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({
        auth: true,
        token: token,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        mobile: user.mobile,
        address: user.addressList,
        _id: user._id
      });
    });
};

exports.logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

// exports.deleteUser = (req, res) => {
//     User.deleteOne({"_id": req.params.userId})
//       .then(result => {
//         res.status(200).json({
//           msg: 'User deleted successful'
//         })
//       }).catch(error => {
//         res.status(500).json({
//           message: "Delete user failed!",
//           error: error
//         });
//       });
// };

// exports.createAddress = (req, res, next) => {
//     const address = {
//         firstname: req.body.firstName,
//         lastname: req.body.lastName,
//         contact: req.body.contact,
//         house: req.body.house,
//         address: req.body.address,
//         address1: req.body.address1,
//         street: req.body.street,
//         state: req.body.state,
//         city: req.body.city,
//         pincode: req.body.pincode,
//         isEditable: false
//       };
//       const addressId = req.params.addressId;
//     User
//     .findOne({ email: req.body.email })
//     .then(() => {
//         User
//         .updateOne({addressId}, address, {upsert: true})
//         .then(() => {
//           res.status(201).json({
//             message: "Address added successfully"
//           });
//         })
//         .catch(error => {
//           res.status(500).json({
//             message: {
//               "failed"  : "Adding address failed!",
//               "error"   : error
//             }
//           });
//         });
//     }).catch(error => {
//         res.status(500).json({
//           message: "User not found",
//           error: error
//         });
//     });
// };

// exports.fetchAddresses = (req, res, next) => {
//     User
//     .findOne({ email: req.body.email })
//     .then(() => {
//           res.status(201).json({
//             message: "Address found successfully",
//             data: res.addressList
//           });
//     })
//     .catch(error => {
//         res.status(500).json({
//         message: {
//             "failed"  : "Fetching address failed!",
//             "error"   : error
//         }
//         });
//     });
// };

// exports.addToCart = (req, res, next) => {
//     const product = {
//         productId: req.body.id,
//         size: req.body.size,
//         quantity: req.body.quantity,
//     }
//     const productId = req.params.productId;
//     User
//     .findOne({ email: req.body.email }).lean()
//     .then((userData) => {
//         let userinfo = {...userData};
//         let duplicateProduct = userinfo.cartProducts.find(x => x.productId == productId);
//         duplicateProduct = duplicateProduct.productId;
//         User
//         .updateOne({duplicateProduct: productId}, product, {upsert: true})
//         .then(() => {
//           res.status(201).json({
//             message: "Added to cart"
//           });
//         })
//         .catch(error => {
//           res.status(500).json({
//             message: {
//               "failed"  : "Adding product failed!",
//               "error"   : error
//             }
//           });
//         });
//     })
//     .catch(error => {
//         res.status(500).json({
//         message: {
//             "failed"  : "Fetching user failed!",
//             "error"   : error
//         }
//         });
//     });
// };

// exports.fetchCartProducts = (req, res, next) => {
//     User
//     .findOne({ email: req.body.email })
//     .then(() => {
//           res.status(201).json({
//             message: "Cart products found successfully",
//             data: res.cartProducts
//           });
//     })
//     .catch(error => {
//         res.status(500).json({
//         message: {
//             "failed"  : "Fetching cart products failed!",
//             "error"   : error
//         }
//         });
//     });
// };

// exports.saveOrders = (req, res, next) => {
//     const product = {
//         productId: req.body.id,
//         size: req.body.size,
//         quantity: req.body.quantity,
//         deliveryCharge: req.body.deliveryCharge,
//         cost: req.body.cost,
//         discountAtThatTime: req.body.discount,
//         deliveryDate: req.body.deliveryDate,
//         delivered: req.body.delivered
//     }
//     const orderId = req.params.orderId;
//     User
//     .findOne({ email: req.body.email })
//     .then(() => {
//         User
//         .updateOne({orderId}, product, {upsert: true})
//         .then(() => {
//           res.status(201).json({
//             message: "Order saved"
//           });
//         })
//         .catch(error => {
//           res.status(500).json({
//             message: {
//               "failed"  : "Adding product failed!",
//               "error"   : error
//             }
//           });
//         });
//     })
//     .catch(error => {
//         res.status(500).json({
//         message: {
//             "failed"  : "Fetching user failed!",
//             "error"   : error
//         }
//         });
//     });
// };

// exports.fetchOrders = (req, res, next) => {
//     User
//     .findOne({ email: req.body.email })
//     .then(() => {
//           res.status(201).json({
//             message: "Order found successfully",
//             data: res.orders
//           });
//     })
//     .catch(error => {
//         res.status(500).json({
//         message: {
//             "failed"  : "Fetching orders failed!",
//             "error"   : error
//         }
//         });
//     });
// };

// exports.addToWishlist = (req, res, next) => {
//     const product = {
//         productId: req.body.id,
//         size: req.body.size
//     }
//     User
//     .findOne({ email: req.body.email })
//     .then(() => {
//         User
//         .updateOne({productId}, product, {upsert: true})
//         .then(() => {
//           res.status(201).json({
//             message: "Added to cart"
//           });
//         })
//         .catch(error => {
//           res.status(500).json({
//             message: {
//               "failed"  : "Adding product failed!",
//               "error"   : error
//             }
//           });
//         });
//     })
//     .catch(error => {
//         res.status(500).json({
//         message: {
//             "failed"  : "Fetching user failed!",
//             "error"   : error
//         }
//         });
//     });
// };

// exports.fetchWishlist = (req, res, next) => {
//     User
//     .findOne({ email: req.body.email })
//     .then(() => {
//           res.status(201).json({
//             message: "Cart products found successfully",
//             data: res.wishlist
//           });
//     })
//     .catch(error => {
//         res.status(500).json({
//         message: {
//             "failed"  : "Fetching cart products failed!",
//             "error"   : error
//         }
//         });
//     });
// };