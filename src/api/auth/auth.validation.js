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

const registerUser = {
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email(),
        phoneNumber: Joi.string(),
        password: Joi.string().custom(password),
        profileImageUrl: Joi.string().uri(),
        loginType: Joi.string().valid('email', 'google', 'apple', 'phone').default('email'),
    }),
}

const checkUser = {
    body: Joi.object().keys({
        email: Joi.string().email(),
        phoneNumber: Joi.string(),
        loginType: Joi.string().valid('email', 'google', 'apple', 'phone').required(),
    }).xor('email', 'phoneNumber') // Ensure either email or phoneNumber
}

const otpVerify = {
    body: Joi.object().keys({
        otp: Joi.string().length(6).required(),
        email: Joi.string().email(),
        phoneNumber: Joi.string(),
    }).xor('email', 'phoneNumber') // Ensure either email or phoneNumber
}

const passwordVerify = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().custom(password).required(),
        phoneNumber: Joi.string(),
    }).xor('email', 'phoneNumber') // Ensure either email or phoneNumber
}

const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().email(),
    })
}

const verifyResetPasswordToken = {
    body: Joi.object().keys({
        token: Joi.string().required(),
    })
}

const resetPassword = {
    body: Joi.object().keys({
        token: Joi.string().required(),
        password: Joi.string().custom(password).required(),
    })
}

const addUserRole = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        userRole: Joi.string().valid("Needer", "Deeder", "Both").required(),
    }),
}

const addPreference = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        type: Joi.array()
            .items(
                Joi.string()
                    .valid('households', 'pets', 'heavylifting', 'handywork')
                    .messages({
                        'any.only': 'Deed type must be one of: households, pets, heavylifting, handywork.',
                        'string.base': 'Deed type must be a string.',
                    })
            )
            .required()
            .messages({
                'array.base': 'Deed type must be an array.',
                'any.required': 'Deed type is required.',
            }),
    }),
}

const agreeToTerms = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        termsAndCondition: Joi.boolean().required(),
    }),
}

const addLocation = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        location: Joi.object({
            type: Joi.string().valid('Point').required(),
            coordinates: Joi.array().items(Joi.number()).length(2).required(), // [longitude, latitude]
        }).required(),
    }),
}

const createNeed = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        amount: Joi.number().min(0).default(0),
        longitude: Joi.number().required(),
        latitude: Joi.number().required(),
        category: Joi.array()
            .items(
                Joi.string()
                    .valid('households', 'pets', 'heavylifting', 'handywork')
                    .messages({
                        'any.only': 'Category must be one of: households, pets, heavylifting, handywork.',
                        'string.base': 'Category must be a string.',
                    })
            )
            .required()
            .messages({
                'array.base': 'Category must be an array.',
                'any.required': 'Category is required.',
            }),
    }),
}

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
}

module.exports = {
    registerAdmin,
    registerUser,
    checkUser,
    otpVerify,
    passwordVerify,
    forgotPassword,
    verifyResetPasswordToken,
    resetPassword,
    addUserRole,
    addPreference,
    agreeToTerms,
    addLocation,
    createNeed,
    refreshTokens
}