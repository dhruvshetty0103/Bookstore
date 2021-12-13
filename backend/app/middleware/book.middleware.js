/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js
 * @descrition      : middleware for note validation
 * @file            : book.middleware.js
 * @author          : Dhruv Shetty
 * @version         : 1.0
 * @since           : 9-Dec-2021
 *
 **************************************************************************/

const jwtHelper = require("../../utility/jwt");

class bookValidation {
  /**
   * @param {Object} req
   * @param {Object} res
   * @param {next} next
   */
  ensureToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"] || req.headers.token;
    if (!bearerHeader) {
      return res.send("Token is empty");
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwtHelper.verifyToken(token, (err, data) => {
      if (err) {
        return res.send(err);
      }
      req.body.userId = data._id;
      next();
    });
  };
}

module.exports = new bookValidation();