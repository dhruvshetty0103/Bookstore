const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productList: {
      type: Array,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("BookStoreOrderDetail", orderSchema);
class OrderModel {
  createOrder = async (orderId, body) => {
    let currentOrder = new order({
      productList: body.productList,
      userId: body.userId,
      orderId: orderId,
      totalPrice: body.totalPrice,
    });
    try {
      let data = await currentOrder.save();
      return data;
    } catch (error) {
      throw error;
    }
  };
  getAllOrderHistory = async (userId) => {
    try {
      let data = await order.find({
        userId: userId,
      });
      return data;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = new OrderModel();
