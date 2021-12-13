const mongoose = require("mongoose");

//creation of schema for cart
const CartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, Ref: "User" },
    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          Ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        cost: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toObject : {virtuals:true},
    toJSON : {virtuals : true}
  }
);

const Cart = mongoose.model("Cart", CartSchema);

class cartModel {
  addToCart = async (cartDetails) => {
    let userId = cartDetails.userId;
    let itemList = {
      book: cartDetails.book,
      quantity: cartDetails.quantity,
      cost: cartDetails.cost,
    };
    try {
      let cart = await Cart.findOne({ userId: userId });
      if (cart) {
        const product = cart.items.find((item) => item.book == itemList.book);

        if (product) {
          return await Cart.findOneAndUpdate(
            { userId: userId, "items.book": itemList.book },
            {
              $set: {
                "items.$": {
                  ...itemList,
                  quantity: product.quantity + 1,
                },
              },
            },
            { new: true }
          );
        } else {
          return await Cart.findOneAndUpdate(
            { userId: userId },
            {
              $push: {
                items: itemList,
              },
            },
            { new: true }
          ).exec();
        }
      } else {
        const cart = new Cart({
          userId: userId,
          items: [itemList],
        });

        return cart.save();
      }
    } catch (error) {
      throw error;
    }
  };

  getCart = async (userId) => {
    try {
      let data = await Cart.findOne({ userId }).populate("userId", "firstName");
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

module.exports = new cartModel();