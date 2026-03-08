const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    avatar: { type: String, default: '' },
    wishlist: [{ type: String }],   // stores product IDs
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
