/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : gets req and res from routes and passes it to the service layer
 * @file            : book.controller.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/

const bookService = require("../../service/book.service");
const logger = require("../../../utility/logger.js");
class bookController {
  /**
   * @description Handles the request and response for finding all books
   * @param {Object} req
   * @param {Object} res
   */
  findAll = async (req, res) => {
    try {
      const data = await bookService.findAll(req.params.index);
      logger.info(data);
      return res.send(data);
    } catch (err) {
      logger.error("Could not find book", err);
      return res.send(err);
    }
  };

  /**
   * @description Handles the request and response for adding books to cart
   * @param {Object} req
   * @param {Object} res
   */
  addToCart = async (req, res) => {
    try {
      let data = await bookService.addToCart(req.body);
      logger.info(data);
      return res.status(200).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(500).send("error");
    }
  };

  /**
   * @description Handles the request and response for getting all books from cart
   * @param {Object} req
   * @param {Object} res
   */
  getCart = async (req, res) => {
    try {
      let data = await bookService.getCart(req.body.userId);
      logger.info(data);
      return res.status(200).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(404).json(error);
    }
  };

  /**
   * @description Handles the request and response for adding customer details
   * @param {Object} req
   * @param {Object} res
   */
  addCustomerDetails = async (req, res) => {
    try {
      let data = await bookService.addCustomerDetails(req.body);
      logger.info(data);
      return res.status(200).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(500).json(error);
    }
  };

  /**
   * @description Handles the request and response for getting customer details
   * @param {Object} req
   * @param {Object} res
   */
  getCustomerDetails = async (req, res) => {
    const userId = req.body.userId;
    try {
      let data = await bookService.getCustomerDetails(userId);
      logger.info(data);
      return res.status(200).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(500).json(error);
    }
  };

  /**
   * @description Handles the request and response for deleting books from cart
   * @param {Object} req
   * @param {Object} res
   */
  deleteCartProduct = async (req, res) => {
    try {
      let data = await bookService.deleteCartProduct(
        req.body.userId,
        req.params.id
      );
      logger.info(data);
      return res.status(200).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(500).json(error);
    }
  };

  /**
   * @description Handles the request and response for searching books
   * @param {Object} req
   * @param {Object} res
   */
  searchBook = async (req, res) => {
    try {
      let data = await bookService.searchBook(req.body);
      logger.info("search book succussfull");
      return res.status(200).send(data);
    } catch (error) {
      logger.error(error);
      return res.status(500).send(err);
    }
  };

  /**
   * @description Handles the request and response for creation of order
   * @param {Object} req
   * @param {Object} res
   */
  createOrder = async (req, res) => {
    try {
      let data = await bookService.createOrder(req.body);
      logger.info("create order successfull");
      return res.status(200).send(data);
    } catch (error) {
      logger.error(error);
      return res.status(500).send(error);
    }
  };
  /**
   * @description handles request response for removing a cart.
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
   removeCart = async (req, res) => {
    try {
      let data = await bookService.removeCart(req.body.userId);
      logger.info(data);
      return res.status(200).json(data);
    } catch (error) {
      logger.error(error);
    }
  };
}
module.exports = new bookController();
