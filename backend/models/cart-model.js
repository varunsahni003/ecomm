const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  name: { type: String, required: true },
  uniqueId: { type: String, required: true },
  size: { type: String, required: true },
  price : { type: Number },
  deliveryCharge : { type: Number },
  offerApplied : { type: String },
  rating : { type: Number },
  rating_count : { type: Number },
  cost : { type: Number },
  discount : { type: Number }
});

module.exports = mongoose.model("Cart", cartSchema);