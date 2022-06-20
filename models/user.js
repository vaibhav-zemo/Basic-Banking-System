const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    customerId: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
})

const User = mongoose.model('User', UserSchema);
module.exports = User;

