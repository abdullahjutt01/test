const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const DUMMY_PRODUCTS = [
    { _id: "1", title: "Sony WH-1000XM5 Wireless Headphones", category: "electronics", price: 349.99, originalPrice: 449.99, rating: 4.8, reviews: 2847, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", badge: "Best Seller" },
    { _id: "2", title: "Apple iPhone 15 Pro Max 256GB", category: "electronics", price: 1199.99, originalPrice: 1299.99, rating: 4.9, reviews: 5621, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", badge: "Hot" },
    { _id: "3", title: "Nike Air Max 270 Running Shoes", category: "sports", price: 129.99, originalPrice: 159.99, rating: 4.6, reviews: 1203, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", badge: "Sale" },
    { _id: "4", title: "Samsung 4K QLED Smart TV 55\"", category: "electronics", price: 799.99, originalPrice: 999.99, rating: 4.7, reviews: 892, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", badge: "Deal" },
    { _id: "5", title: "Levi's 501 Original Fit Jeans", category: "fashion", price: 79.99, originalPrice: 99.99, rating: 4.5, reviews: 3412, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", badge: "Classic" },
    { _id: "6", title: "Dyson V15 Detect Cordless Vacuum", category: "home", price: 649.99, originalPrice: 749.99, rating: 4.8, reviews: 1547, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", badge: "Top Pick" },
    { _id: "7", title: "Charlotte Tilbury Magic Cream", category: "beauty", price: 105.00, originalPrice: 105.00, rating: 4.7, reviews: 4231, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop", badge: "Luxury" },
    { _id: "11", title: "Adidas Ultraboost 23 Sneakers", category: "sports", price: 189.99, originalPrice: 220.00, rating: 4.6, reviews: 967, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop", badge: "New" }
];

// @route   GET /api/products
// @desc    Get all products
router.get('/', async (req, res) => {
    try {
        // If Database is NOT connected (e.g. no MongoDB Atlas URI configured), send dummy data so it works!
        if (mongoose.connection.readyState !== 1) {
            return res.json(DUMMY_PRODUCTS);
        }

        const products = await Product.find();
        if (products.length === 0) return res.json(DUMMY_PRODUCTS);

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/products
// @desc    Add a new product
router.post('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ msg: "Database not connected. Provide a real MONGO_URI." });
        }
        const newProduct = new Product(req.body);
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
