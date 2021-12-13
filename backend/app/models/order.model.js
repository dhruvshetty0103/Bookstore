const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId:{ type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("Order", productSchema);