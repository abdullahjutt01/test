const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, lowercase: true, trim: true },
    subCategory: { type: String, default: '' },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    image: { type: String, required: true },
    badge: { type: String, default: '' },
    stock: { type: Number, default: 50 },
    description: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
