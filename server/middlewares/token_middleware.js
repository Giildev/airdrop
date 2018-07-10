const jwt = require("jsonwebtoken");
const moment = require("moment");
const path = require("path");
const config = require("../libs/config");

const modelUser = require('../models/user');

verifyToken = (token) => {
  let valid = jwt.verify(token, config.SECRET_KEY, (err, auth) => {
    // verify if exist any error
    if (err) {
      if (err) {
        return {
          success: false,
          msg: `Bad JSON`
        };
      } else if (err.name === "TokenExpiredError") {
        // JWT Expired
        return {
          success: false,
          msg: `Expired`,
          expiredAt: moment(err.expiredAt).format("MMM D, YYYY HH:mm a")
        };
      } else if (err.name === "JsonWebTokenError") {
        // JWT malformed
        return {
          success: false,
          msg: `Malformed`
        };
      }
    } else {
      return {
        auth: auth.user,
        success: true
      };
    } // end if error
  });

  return valid;
};

checkUser = (token) => {
  let check = modelUser.find({
    access_token: token
  }, "_id");

  if (check) {
    return true;
  } else {
    return false;
  }
};

ensureToken = (req, res, next) => {
  let headerToken = req.headers.authorization;
  if (headerToken !== undefined) {
    let token = headerToken.split(" ")[1];
    let validToken = verifyToken(token);
    if (validToken.success) {
      let checker = checkUser(token)
      if (checker) {
        console.log('Tiene permiso')
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendFile(path.join(__dirname, '../public/not_found.html'));
  }
};

module.exports = {
  ensureToken
};
