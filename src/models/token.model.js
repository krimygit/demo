
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tokensSchema = new Schema({
    token: { type: String, required: true, index: true, },
    expiresAt: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    type: Number,
    userRole: {
        type: String,
        enum: ['Needer', 'Deeder', 'Both'],
        default: "Needer"
    },
}, {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
});

const Tokens = mongoose.model('tokens', tokensSchema);

module.exports = Tokens;