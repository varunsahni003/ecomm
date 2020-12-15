const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: false },
  uniqueId: { type: String },
  token: { type: String }
});

userSchema.pre('save',  function(next) {
  var user = this;

   if (!user.isModified('password')) return next();

   bcrypt.genSalt(10, function(err, salt) {
       if (err) return next(err);

       bcrypt.hash(user.password, salt, function(err, hash) {
           if (err) return next(err);

           user.password = hash;
           next();
       });
   });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.model("Users", userSchema);