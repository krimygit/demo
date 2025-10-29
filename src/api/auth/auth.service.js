
const bcrypt = require('bcryptjs');
const AdminData = require('../../models/admin.model')
const UserData = require('../../models/user.model')
const { create, findOne } = require('../common/modelCrud');
const crypto = require('crypto');
const { generateToken, saveToken, refreshverifyToken } = require('../common/token.service');
const config = require('../../config/config');
const moment = require('moment');
const { TOKEN_TYPE } = require('../../config/constant');
const generateAuthTokens = async (dataobj) => {

    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes').unix();
    const accessToken = generateToken(dataobj, accessTokenExpires);
    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days').unix();
    const string = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(dataobj, refreshTokenExpires);
    await saveToken(refreshToken, dataobj.id, string, TOKEN_TYPE.REFRESH_TOKEN, dataobj.userRole);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires,
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires,
        },
    };
};

const refreshAuthTokens = async refreshToken => {
    const refreshTokenDoc = await refreshverifyToken(refreshToken, TOKEN_TYPE.REFRESH_TOKEN);
   
        const userId = refreshTokenDoc.userId;
        let admin = await findOne(UserData, userId)
        let newtoken = await generateAuthTokens(admin);
        return newtoken
    
};

const createAdmin = async (data) => {
    data = {
        ...data
    }
    const createAdmin = await create(AdminData, data);

    return createAdmin;

}

const getUser = async (userData) => {
    const users = await UserData.find({ _id: userData._id }, { password: 0, otp: 0, otpExpire: 0, otpGenerateTime: 0, __v: 0 }).lean();
    if (!users) {
        return null; // No users found
    }
    return users; // Return the list of users excluding sensitive fields
};



module.exports = {
    createAdmin,
    generateAuthTokens,
    getUser,
    refreshAuthTokens

}