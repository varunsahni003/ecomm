const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productId: { type: String },
  name: { type: String, required: true },
  cost : { type: Number },
  discount : { type: Number },
  category: { type: String },
  stock : { type: Number },
  description : { type: String },
  images: { type: Array, required: true },
  rating_count : { type: Number },
  sold: { type: Number },
  availableSize: { type: Array, required: true },
  size : { type: String },
  color : { type: String },
  rating : { type: Number },
  reviews : { type: Array },
  return: { type: String },
  promoCodes: { type: Array },
  brand: { type: String },
  deliveryCharge : { type: Number }
});

module.exports = mongoose.model("Product", productSchema);