const httpStatus = require('http-status');
const AppError = require('../utils/AppError');
const CryptoJS = require("crypto-js");
const moment = require("moment");
const config = require('../config/config');
const { roleRights } = require('../config/role')
const UserData = require('../models/user.model');

const auth = (role) => async (req, res, next) => {
  if (!req.headers.authorization) {
    next(new AppError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  } else {
    var chars = { 'Por21Ld': '/' };
    let newtoken = req.headers.authorization.replace(/Por21Ld/g, m => chars[m]);
    var bytes = CryptoJS.AES.decrypt(newtoken, config.jwt.secret);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (originalText) {
      if (/^[\],:{}\s]*$/.test(originalText.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        let data = JSON.parse(originalText)
          console.log("data",data);
        let timestamp = moment().unix()
        var difference = data.exp - timestamp
        if (difference > 0) {
          if (role) {
            let converarray = [role]
            const userData = await UserData.findById(data._doc._id).lean();
            if (!userData) {
              return next(new AppError(httpStatus.UNAUTHORIZED, 'User not found'));
            }
            const userRights = roleRights.get(userData.userRole);
            const hasRequiredRights = converarray.every(requiredRight => userRights.includes(requiredRight));
            if (!hasRequiredRights) {
              next(new AppError(httpStatus.FORBIDDEN, 'Not allowed to do this action.'));
            } else {
              req.user = data;
              next();
            }
          } else {
            req.user = data;
            next();
          }

        } else {
          next(new AppError(httpStatus.UNAUTHORIZED, 'Token is Expire'));
        }
      } else {
        next(new AppError(httpStatus.UNAUTHORIZED, 'Invalid Token'));
      }
    } else {
      next(new AppError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
  }

};
module.exports = auth