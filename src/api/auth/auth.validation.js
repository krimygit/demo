const Joi = require('joi')
const { password } = require('../common/custom.validation');

const registerAdmin = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().custom(password),
        status: Joi.string().valid("Enable", "Disable", "Deleted"),
        userRole: Joi.string().valid("Admin"),
        profileImageUrl: Joi.string().uri()
    }),
};


module.exports = {
    registerAdmin,
}