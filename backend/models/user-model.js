const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  mobile: { type: Number, required: false },
  uniqueId: { type: String, required: true },
  token: { type: String, required: true }
});

module.exports = mongoose.model("Users", userSchema);