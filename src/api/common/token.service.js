const CryptoJS = require("crypto-js");
const moment = require("moment");
const { Token } = require('./../../models');
const config = require('../../config/config');
const AppError = require('../../utils/AppError');
const message = require('../../utils/messages');
const httpStatus = require('http-status');
// const { remove } = require("../../models/admin.model");
const generateToken = (data, expires, secret = config.jwt.secret) => {
  let payload = {
    ...data,
    iat: moment().unix(),
    exp: expires,
  };
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(payload), secret).toString();
  var chars = { '/': 'Por21Ld' };
  var final = ciphertext;
  final = final.replace(/[/]/g, m => chars[m]);
  return final
};


// const generateForgotPasswordToken = (data, expires, secret = "Por21Ld") => {
//   // console.log("Generate token ==>", data);
//   let payload = {
//     ...data,
//     iat: moment().unix(),
//     exp: expires,
//   };
//   return jwt.sign(payload, secret);

// }
const saveToken = async (token, userId, expires, type, sUserRole, blacklisted = false) => {
  var d = moment.unix(expires);
  const tokenDoc = await Token.create({
    token,
    userId: userId,
    expiresAt: d,
    type,
    userRole: sUserRole,
    blacklisted
  });
  return tokenDoc;

};

const verifyToken = async (token, userRole, firstName, lastName) => {
  try {
    let text;
    switch (userRole) {
      case 3:
        text = message.VERIFYLINKEXPIRE
        break;
      case 4:
        text = message.FORGOTPASSWORDTOKENEXPIRE
        break;
      default:
        text = "Token is Expire"
    }
    var chars = { 'Por21Ld': '/' };
    let newtoken = token.replace(/Por21Ld/g, m => chars[m]);
    var bytes = CryptoJS.AES.decrypt(newtoken, config.jwt.secret);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (/^[\],:{}\s]*$/.test(originalText.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      let data = JSON.parse(originalText)
      let timestamp = moment().unix()
      var difference = data.exp - timestamp
      if (difference > 0) {
        const tokenDoc = await Token.findOne({ token });
        if (!tokenDoc) {
          throw new AppError(httpStatus.NOT_FOUND, 'Token not found');
        } else {
          return tokenDoc.userId
        }
      } else {
        throw new AppError(httpStatus.UNAUTHORIZED, text);
      }
    } else {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Token');
    }
  } catch (error) {
    console.error('Token verification error:', error);
    throw new AppError(httpStatus.UNAUTHORIZED, error.message || 'Token verification failed');
  }
};
const refreshverifyToken = async (token, type) => {
  let text;
  switch (type) {
    case 3:
      text = message.VERIFYLINKEXPIRE
      break;
    case 4:
      text = message.FORGOTPASSWORDTOKENEXPIRE
      break;
    default:
      text = "Token is Expire"
  }
  var chars = { 'Por21Ld': '/' };
  let newtoken = token.replace(/Por21Ld/g, m => chars[m]);
  var bytes = CryptoJS.AES.decrypt(newtoken, config.jwt.secret);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  if (/^[\],:{}\s]*$/.test(originalText.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    let data = JSON.parse(originalText)
    let timestamp = moment().unix()
    var difference = data.exp - timestamp
    // if(difference > 0){
    const tokenDoc = await Token.findOne({ token, oUserId: data._doc._id });
    if (!tokenDoc) {
      throw new AppError(httpStatus.NOT_FOUND, 'Token not found');
    } else {
      return tokenDoc
    }
    // }else{
    //   throw new AppError(httpStatus.UNAUTHORIZED, text);
    // }
  } else {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Token');
  }

  return tokenDoc;
};
module.exports = {
  generateToken, saveToken, verifyToken, refreshverifyToken
};