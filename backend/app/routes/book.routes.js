/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : book routes for book url end points
 * @file            : book.router.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 8-Dec-2021
 *
 **************************************************************************/

const express = require("express");
const bookController = require("../controllers/book/book.controller");
const bookRoute = express.Router();
const bookMiddleware = require("../middleware/book.middleware.js");

// Retrieve all books
bookRoute.post("/add-to-cart", bookMiddleware.ensureToken, bookController.addToCart)
bookRoute.get("/cart",bookMiddleware.ensureToken, bookController.getCart)
bookRoute.post("/customer-details", bookMiddleware.ensureToken, bookController.addCustomerDetails)
bookRoute.get("/customer-details", bookMiddleware.ensureToken, bookController.getCustomerDetails)
bookRoute.get("/:index",bookMiddleware.ensureToken,bookController.findAll);
module.exports = bookRoute;