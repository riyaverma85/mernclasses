const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, enum: ["pending","shipped","delivered","cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model("Order", orderSchema);
