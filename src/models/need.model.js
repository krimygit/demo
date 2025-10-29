const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { profile } = require('winston');

const needSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ['open', 'in-progress', 'completed', 'cancelled'],
            default: 'open',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        needImage: {
            type: String,
        },
        amount: {
            type: Number,
            default: 0,
        },
        category: {
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
needSchema.index({ location: '2dsphere' })

needSchema.pre('save', async function (next) {
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const Need = mongoose.model('Need', needSchema);
module.exports = Need;