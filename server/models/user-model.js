const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: false },
  uniqueId: { type: String },
  addressList: { type: Array },
  cartProducts: { type: Array },
  orders: { type: Array },
  wishlist: { type: Array }
});

// userSchema.pre('save',  function(next) {
//   var user = this;

//    if (!user.isModified('password')) return next();

//    bcrypt.genSalt(10, function(err, salt) {
//        if (err) return next(err);

//        bcrypt.hash(user.password, salt, function(err, hash) {
//            if (err) return next(err);

//            user.password = hash;
//            next();
//        });
//    });
// });

module.exports = mongoose.model("Users", userSchema);