/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : user model creates user schema and performs db operation
 * @file            : product.model.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/

const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    author: String,
    title: String,
    image: String,
    price: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("Product", productSchema);

class productModel {
  /**
   * @description finds all notes present in data base
   * @returns err or data
   */
  findAll = async () => {
    try {
      const data = await products.find();
      return data;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new productModel();