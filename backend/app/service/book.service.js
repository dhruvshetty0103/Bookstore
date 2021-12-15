/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : get the values from the controller and process them for the books in book store
 * @file            : book.service.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/

const bookModel = require("../models/product.model");
const cartModel = require("../models/cart.model");
const addressModel = require("../models/address.model");

class bookService {
  /**
   * @description Service layer function to find all book
   * @param {callback} callback
   * @returns err or data
   */
  findAll = async (index) => {
    let page = parseInt(index);
    page = (page - 1) * 12;
    try {
      const data = await bookModel.findAll();
      return data.slice(page, page + 12);
    } catch (error) {
      throw error;
    }
  };

  addToCart = async (cartDetails) => {
    try {
      let data = await cartModel.addToCart(cartDetails);
      return data;
    } catch (error) {
      throw error;
    }
  };
  /**
   * @description Service layer function to get all books
   * @returns err or data
   */
  getCart = async (userId) => {
    try {
      return await cartModel.getCart(userId);
    } catch (error) {
      throw error;
    }
  };

  addCustomerDetails = async (details) => {
    try {
      return await addressModel.addCustomerDetails(details);
    } catch (error) {
      throw error;
    }
  };

  getCustomerDetails = async (userId) => {
    try {
      return await addressModel.getCustomerDetails(userId);
    } catch (error) {
      throw error;
    }
  };

  deleteCartProduct = async (userId, book) => {
    try {
      return await cartModel.deleteCartProduct(userId, book);
    } catch (error) {
      throw error;
    }
  };

  searchBook = async (body) => {
    try {
      let data = await bookModel.findAll();
      let filteredData = data.filter((item) => {
        return (
          item.title.toLowerCase().includes(body.searchTxt.toLowerCase()) ||
          item.author.toLowerCase().includes(body.searchTxt.toLowerCase())
        );
      });
      return filteredData;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = new bookService();