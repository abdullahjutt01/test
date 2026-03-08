const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const DUMMY_PRODUCTS = [
    // Electronics
    { _id: "1", title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones", category: "electronics", price: 349.99, originalPrice: 449.99, rating: 4.8, reviews: 2847, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", badge: "Best Seller" },
    { _id: "2", title: "Apple iPhone 15 Pro Max 256GB - Titanium", category: "electronics", price: 1199.99, originalPrice: 1299.99, rating: 4.9, reviews: 5621, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", badge: "Hot" },
    { _id: "3", title: "Apple MacBook Pro 14-inch M3", category: "electronics", price: 1599.00, originalPrice: 1599.00, rating: 4.9, reviews: 1045, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", badge: "" },
    { _id: "4", title: "Samsung 4K QLED Smart TV 55\"", category: "electronics", price: 799.99, originalPrice: 999.99, rating: 4.7, reviews: 892, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", badge: "Deal" },
    { _id: "5", title: "Nintendo Switch OLED Model", category: "electronics", price: 349.99, originalPrice: 349.99, rating: 4.8, reviews: 14200, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop", badge: "Popular" },

    // Fashion
    { _id: "6", title: "Levi's 501 Original Fit Men's Jeans", category: "fashion", price: 79.99, originalPrice: 99.99, rating: 4.5, reviews: 3412, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", badge: "Classic" },
    { _id: "7", title: "Ray-Ban Classic Aviator Sunglasses", category: "fashion", price: 160.00, originalPrice: 160.00, rating: 4.7, reviews: 2984, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop", badge: "" },
    { _id: "8", title: "Men's Premium Cotton Oxford Shirt", category: "fashion", price: 45.00, originalPrice: 55.00, rating: 4.4, reviews: 846, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop", badge: "New" },

    // Sports
    { _id: "9", title: "Nike Air Max 270 Running Shoes", category: "sports", price: 129.99, originalPrice: 159.99, rating: 4.6, reviews: 1203, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", badge: "Sale" },
    { _id: "10", title: "Adidas Ultraboost 23 Sneakers", category: "sports", price: 189.99, originalPrice: 220.00, rating: 4.6, reviews: 967, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop", badge: "" },
    { _id: "11", title: "Manduka PRO Yoga Mat", category: "sports", price: 129.00, originalPrice: 129.00, rating: 4.8, reviews: 3200, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", badge: "" },

    // Home
    { _id: "12", title: "Dyson V15 Detect Cordless Vacuum", category: "home", price: 649.99, originalPrice: 749.99, rating: 4.8, reviews: 1547, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", badge: "Top Pick" },
    { _id: "13", title: "Nespresso Vertuo Plus Coffee Maker", category: "home", price: 199.99, originalPrice: 219.99, rating: 4.7, reviews: 4519, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop", badge: "" },
    { _id: "14", title: "Luxury Egyptian Cotton Bed Sheets Set", category: "home", price: 115.00, originalPrice: 145.00, rating: 4.6, reviews: 890, image: "https://images.unsplash.com/photo-1522771731535-64906f230dae?w=400&h=400&fit=crop", badge: "Comfort" },

    // Beauty
    { _id: "15", title: "Charlotte Tilbury Magic Cream 50ml", category: "beauty", price: 105.00, originalPrice: 105.00, rating: 4.7, reviews: 4231, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop", badge: "Luxury" },
    { _id: "16", title: "CeraVe Moisturizing Cream", category: "beauty", price: 19.99, originalPrice: 19.99, rating: 4.8, reviews: 85000, image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400&h=400&fit=crop", badge: "Best Seller" },

    // Books
    { _id: "17", title: "Atomic Habits by James Clear", category: "books", price: 11.98, originalPrice: 27.00, rating: 4.9, reviews: 105000, image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop", badge: "Must Read" },
    { _id: "18", title: "The Psychology of Money", category: "books", price: 13.40, originalPrice: 18.99, rating: 4.7, reviews: 54000, image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop", badge: "" },

    // Toys
    { _id: "19", title: "LEGO Star Wars Millennium Falcon", category: "toys", price: 159.99, originalPrice: 169.99, rating: 4.9, reviews: 4200, image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&h=400&fit=crop", badge: "" },

    // Grocery
    { _id: "20", title: "Lavazza Super Crema Whole Bean Coffee Blend", category: "grocery", price: 22.50, originalPrice: 25.00, rating: 4.6, reviews: 29000, image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&h=400&fit=crop", badge: "" },
    { _id: "21", title: "Premium Extra Virgin Olive Oil 1L", category: "grocery", price: 18.99, originalPrice: 24.99, rating: 4.8, reviews: 3400, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop", badge: "Organic" }
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
