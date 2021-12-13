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
const logger = require("../../../utility/logger");
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

  addToCart = async (req, res) => {
    let cartDetails = {
      userId: req.body.userId,
      book: req.body.book,
      quantity: req.body.quantity,
      cost: req.body.cost,
    };
    try {
      let data = await bookService.addToCart(cartDetails);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).send("error");
    }
  };

  getCart = async (req, res) => {
    try {
      let data = await bookService.getCart(req.body.userId);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json(error);
    }
  };
}
module.exports = new bookController();