/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : user model creates user schema and performs db operation
 * @file            : cart.model.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/
const mongoose = require("mongoose");

//creation of schema for cart
const CartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
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
  }
);

const Cart = mongoose.model("Cart", CartSchema);

class cartModel {
  /**
   * @description adds books to cart
   * @returns err or data
   */
  addToCart = async (cartDetails) => {
    let userId = cartDetails.userId;
    let itemList = {
      book: cartDetails.book,
      quantity: cartDetails.quantity,
      cost: cartDetails.cost,
      image:cartDetails.image,
    };
    try {
      let cart = await Cart.findOne({ userId: userId });
      if (cart) {
        const product = cart.items.find((item) => {
          return item.book == itemList.book;
        });

        if (product) {
          if (cartDetails.counter == "increment") {
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
                { userId: userId, "items.book": itemList.book },
                {
                  $set: {
                    "items.$": {
                      ...itemList,
                      quantity: product.quantity - 1,
                    },
                  },
                }
              );
            }
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

  /**
   * @description gets all books present in cart
   * @returns err or data
   */
  getCart = async (userId) => {
    try {
      let data = await Cart.findOne({ userId }).populate({
        path: "items.book",
        select: ["title", "author", "price","image"],
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * @description deletes book from cart
   * @returns err or data
   */
  deleteCartProduct = async (userId, bookId) => {
    try {
      let user = await Cart.findOne({ userId: userId });
      let newItems = user.items.filter((item) => {
        return item.book != bookId;
      });
      return await Cart.findOneAndUpdate(
        { userId: userId },
        { items: newItems },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  };

  /**
   * @description Query to delete cart after order is being placed
   * @param userId
   * @returns error or cart&book details
   */
   removeCart = async (userId) => {
    try {
      return await Cart.findOneAndRemove({ userId: userId });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new cartModel();