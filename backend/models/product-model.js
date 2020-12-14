const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  uniqueId: { type: String, required: false },
  images: { type: Array, required: true },
  size : { type: String, required: false },
  color : { type: String },
  cost : { type: Number },
  discount : { type: Number },
  stock : { type: Number },
  description : { type: String },
  rating : { type: Number },
  rating_count : { type: Number },
  reviews : { type: Array },
  return: { type: String },
  promoCodes: { type: Array },
  brand: { type: String },
  deliveryCharge : { type: Number },
  availableSize: { type: Array },
  sponsored: { type: Array }
});

module.exports = mongoose.model("Product", productSchema);