const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const createResponse = require('../../utils/response');
const authService = require('./auth.service')
const Messages = require('../../utils/messages');
const { generateToken } = require('../common/token.service');


const registerAdmin = catchAsync(async (req, res) => {
    const user = await authService.createAdmin(req.body)
    createResponse(res, httpStatus.OK, Messages.ACCOUNT_CREATED, user)
})

const getUser = catchAsync(async (req, res) => {
    const users = await authService.getUser(req.user._doc);
    if (!users) {
        return createResponse(res, httpStatus.NOT_FOUND, Messages.USER_NOT_FOUND.id);
    }
    createResponse(res, httpStatus.OK, Messages.USER_FETCH_SUCCESS, users);
});



module.exports = {
    registerAdmin,
    getUser,
};