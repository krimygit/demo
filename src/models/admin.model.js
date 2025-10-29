const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { omit, pick } = require('lodash');

const adminSchema = mongoose.Schema(
    {

        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        status: {
            type: String,
            enum: ["Enable", "Disable", "Deleted"],
            default: "Enable"
        },
        userRole: {
            type: String,
            enum: ["Admin"],
            default: "Admin"
        },
        profileImageUrl:
        {
            type: String
        },
    },
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true }

    }
)
adminSchema.methods.transform = async function () {
    const user = this;
    return pick(user.toJSON(), ['id', 'fullname', 'createdAt', 'email', 'profileImageUrl', 'status', 'userRole']);
};
adminSchema.pre('save', async function (next) {
    const admin = this;
    admin.password = await bcrypt.hash(admin.password, 8);
    next();

});
adminSchema.pre('findByIdAndUpdate', async function (next) {
    const admin = this;
    admin.password = await bcrypt.hash(admin.password, 8);
    next();
});


const AdminData = mongoose.model('admin', adminSchema);
module.exports = AdminData;