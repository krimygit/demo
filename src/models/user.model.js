const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { profile } = require('winston');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            default: null,

        },
        phoneNumber: {
            type: String,
        },
        password: {
            type: String,
        },
        otp: {
            type: String,
        },
        otpVerify: {
            type: Boolean,
            default: false,
        },
        otpExpire: {
            type: Date,
        },
        otpGenerateTime: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['Enable', 'Disable', 'Deleted'],
            default: 'Disable',
        },
        termsAndCondition: {
            type: Boolean,
            default: false,
        },
        userRole: {
            type: String,
            enum: ['Needer', 'Deeder', 'Both'],
        },
        loginType: {
            type: String,
            enum: ['email', 'google', 'apple', 'phone'],
            default: 'email',
        },
        profileImageUrl: {
            type: String,
        },
        deedType: {
            type: [String],
            enum: ['households', 'pets', 'heavylifting', 'handywork'],
            default: [],
        },
         needType: {
            type: [String],
            enum: ['households', 'pets', 'heavylifting', 'handywork'],
            default: [],
        },
           location: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
        },
    }
    , {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true },
    }
);
userSchema.index({ location: '2dsphere' })

userSchema.pre('save', async function (next) {
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;