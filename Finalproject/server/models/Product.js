const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: String,
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
