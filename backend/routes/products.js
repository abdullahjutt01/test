const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const DUMMY_PRODUCTS = [

    // ===================== ELECTRONICS =====================
    { _id: "e1", title: "Apple iPhone 15 Pro Max 256GB - Titanium", category: "electronics", subCategory: "Mobile & Wearables", price: 1199.99, originalPrice: 1299.99, rating: 4.9, reviews: 5621, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", badge: "Hot" },
    { _id: "e2", title: "Samsung Galaxy S24 Ultra 512GB", category: "electronics", subCategory: "Mobile & Wearables", price: 1099.99, originalPrice: 1199.99, rating: 4.8, reviews: 3891, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", badge: "Best Seller" },
    { _id: "e3", title: "Apple MacBook Pro 14-inch M3 Chip", category: "electronics", subCategory: "Computing & Peripherals", price: 1599.00, originalPrice: 1799.00, rating: 4.9, reviews: 1045, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", badge: "" },
    { _id: "e4", title: "Dell XPS 15 Laptop 32GB RAM 1TB SSD", category: "electronics", subCategory: "Computing & Peripherals", price: 1399.99, originalPrice: 1599.99, rating: 4.7, reviews: 762, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop", badge: "Deal" },
    { _id: "e5", title: "Sony WH-1000XM5 Noise Cancelling Headphones", category: "electronics", subCategory: "Mobile & Wearables", price: 349.99, originalPrice: 449.99, rating: 4.8, reviews: 2847, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", badge: "Best Seller" },
    { _id: "e6", title: "Samsung 55'' 4K QLED Smart TV", category: "electronics", subCategory: "Home Entertainment", price: 799.99, originalPrice: 999.99, rating: 4.7, reviews: 892, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", badge: "Deal" },
    { _id: "e7", title: "Nintendo Switch OLED Model - White", category: "electronics", subCategory: "Home Entertainment", price: 349.99, originalPrice: 349.99, rating: 4.8, reviews: 14200, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop", badge: "Popular" },
    { _id: "e8", title: "Apple Watch Series 9 GPS 45mm", category: "electronics", subCategory: "Mobile & Wearables", price: 429.99, originalPrice: 499.99, rating: 4.8, reviews: 6743, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop", badge: "" },
    { _id: "e9", title: "Anker 26800mAh Portable Power Bank", category: "electronics", subCategory: "Mobile & Wearables", price: 49.99, originalPrice: 69.99, rating: 4.7, reviews: 18900, image: "https://images.unsplash.com/photo-1609592424793-f7af3b67a98c?w=400&h=400&fit=crop", badge: "Value" },
    { _id: "e10", title: "LG 27'' 4K UHD IPS Monitor", category: "electronics", subCategory: "Computing & Peripherals", price: 449.99, originalPrice: 549.99, rating: 4.7, reviews: 2341, image: "https://images.unsplash.com/photo-1527443224154-c4a573d9f05c?w=400&h=400&fit=crop", badge: "" },
    { _id: "e11", title: "Amazon Echo Dot (5th Gen) Smart Speaker", category: "electronics", subCategory: "Smart Home & Security", price: 49.99, originalPrice: 49.99, rating: 4.7, reviews: 89000, image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop", badge: "Popular" },
    { _id: "e12", title: "Arlo Pro 4 Wireless Security Camera System", category: "electronics", subCategory: "Smart Home & Security", price: 299.99, originalPrice: 349.99, rating: 4.6, reviews: 4512, image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=400&fit=crop", badge: "" },

    // ===================== FASHION =====================
    { _id: "f1", title: "Levi's 501 Original Fit Men's Jeans - Blue", category: "fashion", subCategory: "Men's Fashion", price: 79.99, originalPrice: 99.99, rating: 4.5, reviews: 3412, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", badge: "Classic" },
    { _id: "f2", title: "Nike Essential Fleece Pullover Hoodie", category: "fashion", subCategory: "Men's Fashion", price: 55.00, originalPrice: 70.00, rating: 4.6, reviews: 5120, image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop", badge: "" },
    { _id: "f3", title: "Women's Summer Floral Wrap Dress", category: "fashion", subCategory: "Women's Fashion", price: 39.99, originalPrice: 59.99, rating: 4.4, reviews: 1823, image: "https://images.unsplash.com/photo-1515347619252-abbb4eb4dd2a?w=400&h=400&fit=crop", badge: "Trending" },
    { _id: "f4", title: "Ray-Ban Classic Aviator Sunglasses", category: "fashion", subCategory: "Jewelry & Timepieces", price: 160.00, originalPrice: 160.00, rating: 4.7, reviews: 2984, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop", badge: "" },
    { _id: "f5", title: "Nike Air Max 270 Running Shoes", category: "fashion", subCategory: "Footwear", price: 129.99, originalPrice: 159.99, rating: 4.6, reviews: 1203, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", badge: "Sale" },
    { _id: "f6", title: "Adidas Ultraboost 23 Performance Sneakers", category: "fashion", subCategory: "Footwear", price: 189.99, originalPrice: 220.00, rating: 4.6, reviews: 967, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop", badge: "" },
    { _id: "f7", title: "Men's Premium Cotton Oxford Button-Down Shirt", category: "fashion", subCategory: "Men's Fashion", price: 45.00, originalPrice: 55.00, rating: 4.4, reviews: 846, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop", badge: "New" },
    { _id: "f8", title: "Women's Genuine Leather Handbag - Tan", category: "fashion", subCategory: "Women's Fashion", price: 119.99, originalPrice: 149.99, rating: 4.5, reviews: 2109, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", badge: "" },
    { _id: "f9", title: "Tissot PRX Powermatic 80 Watch", category: "fashion", subCategory: "Jewelry & Timepieces", price: 675.00, originalPrice: 675.00, rating: 4.8, reviews: 834, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", badge: "Luxury" },
    { _id: "f10", title: "Women's 14K Gold Diamond Stud Earrings", category: "fashion", subCategory: "Jewelry & Timepieces", price: 89.99, originalPrice: 120.00, rating: 4.7, reviews: 4500, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", badge: "" },
    { _id: "f11", title: "Timberland Men's 6'' Waterproof Leather Boots", category: "fashion", subCategory: "Footwear", price: 199.99, originalPrice: 229.99, rating: 4.7, reviews: 8721, image: "https://images.unsplash.com/photo-1520975954732-57dd22299614?w=400&h=400&fit=crop", badge: "Popular" },
    { _id: "f12", title: "Women's Yoga Leggings High-Waist 4-Way Stretch", category: "fashion", subCategory: "Women's Fashion", price: 35.00, originalPrice: 50.00, rating: 4.5, reviews: 12000, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop", badge: "Best Seller" },

    // ===================== HOME & KITCHEN =====================
    { _id: "h1", title: "Ninja Foodi 9-in-1 Pressure Cooker & Air Fryer", category: "home", subCategory: "Kitchen & Dining", price: 229.99, originalPrice: 279.99, rating: 4.8, reviews: 34500, image: "https://images.unsplash.com/photo-1556909211-36987daf1dc2?w=400&h=400&fit=crop", badge: "Best Seller" },
    { _id: "h2", title: "Nespresso Vertuo Plus Coffee Maker", category: "home", subCategory: "Kitchen & Dining", price: 199.99, originalPrice: 219.99, rating: 4.7, reviews: 4519, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop", badge: "" },
    { _id: "h3", title: "Vitamix 5200 Professional Blender", category: "home", subCategory: "Kitchen & Dining", price: 449.95, originalPrice: 549.95, rating: 4.8, reviews: 6210, image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop", badge: "Pro" },
    { _id: "h4", title: "Dyson V15 Detect Cordless Vacuum Cleaner", category: "home", subCategory: "Decor & Lighting", price: 649.99, originalPrice: 749.99, rating: 4.8, reviews: 1547, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", badge: "Top Pick" },
    { _id: "h5", title: "Luxury Egyptian Cotton 1000-Thread Bed Sheets", category: "home", subCategory: "Furniture & Bedding", price: 115.00, originalPrice: 145.00, rating: 4.6, reviews: 890, image: "https://images.unsplash.com/photo-1522771731535-64906f230dae?w=400&h=400&fit=crop", badge: "Comfort" },
    { _id: "h6", title: "Herman Miller Aeron Ergonomic Office Chair", category: "home", subCategory: "Furniture & Bedding", price: 1495.00, originalPrice: 1495.00, rating: 4.9, reviews: 3120, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop", badge: "Premium" },
    { _id: "h7", title: "Large Scented Soy Candles Set (4-pack)", category: "home", subCategory: "Decor & Lighting", price: 49.99, originalPrice: 59.99, rating: 4.6, reviews: 7800, image: "https://images.unsplash.com/photo-1548625361-58a9b86aa83b?w=400&h=400&fit=crop", badge: "" },
    { _id: "h8", title: "Moroccan Geometric Area Rug 5x8 feet", category: "home", subCategory: "Decor & Lighting", price: 89.99, originalPrice: 120.00, rating: 4.5, reviews: 3412, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", badge: "Trending" },
    { _id: "h9", title: "Greenworks 40V Cordless Lawn Mower", category: "home", subCategory: "Garden & Outdoor", price: 399.99, originalPrice: 449.99, rating: 4.6, reviews: 2109, image: "https://images.unsplash.com/photo-1416879598555-46e3cb98e663?w=400&h=400&fit=crop", badge: "" },
    { _id: "h10", title: "3-Piece Wicker Patio Furniture Set with Cushions", category: "home", subCategory: "Garden & Outdoor", price: 349.99, originalPrice: 499.99, rating: 4.5, reviews: 987, image: "https://images.unsplash.com/photo-1592318048602-54070a7df8cb?w=400&h=400&fit=crop", badge: "Sale" },
    { _id: "h11", title: "Cuisinart 12-Piece Stainless Steel Cookware Set", category: "home", subCategory: "Kitchen & Dining", price: 249.99, originalPrice: 349.99, rating: 4.7, reviews: 5600, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop", badge: "Sale" },
    { _id: "h12", title: "IKEA KALLAX 4x4 Cube Bookshelf Unit", category: "home", subCategory: "Furniture & Bedding", price: 189.99, originalPrice: 189.99, rating: 4.6, reviews: 9810, image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=400&fit=crop", badge: "" },

    // ===================== BEAUTY =====================
    { _id: "b1", title: "Charlotte Tilbury Magic Cream Moisturizer 50ml", category: "beauty", subCategory: "Skincare", price: 105.00, originalPrice: 105.00, rating: 4.7, reviews: 4231, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop", badge: "Luxury" },
    { _id: "b2", title: "CeraVe Moisturizing Cream 19oz", category: "beauty", subCategory: "Skincare", price: 19.99, originalPrice: 19.99, rating: 4.8, reviews: 85000, image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400&h=400&fit=crop", badge: "Best Seller" },
    { _id: "b3", title: "The Ordinary Niacinamide 10% + Zinc Serum", category: "beauty", subCategory: "Skincare", price: 7.90, originalPrice: 7.90, rating: 4.5, reviews: 65000, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", badge: "Popular" },
    { _id: "b4", title: "Maybelline Fit Me Matte + Poreless Foundation", category: "beauty", subCategory: "Cosmetics", price: 9.99, originalPrice: 12.99, rating: 4.4, reviews: 45000, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", badge: "" },
    { _id: "b5", title: "MAC Ruby Woo Matte Lipstick", category: "beauty", subCategory: "Cosmetics", price: 21.50, originalPrice: 21.50, rating: 4.6, reviews: 22000, image: "https://images.unsplash.com/photo-1586495777744-4e6232bf2ebb?w=400&h=400&fit=crop", badge: "Iconic" },
    { _id: "b6", title: "Dyson Airwrap Multi-Styler Complete", category: "beauty", subCategory: "Personal Care", price: 599.99, originalPrice: 599.99, rating: 4.7, reviews: 8945, image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop", badge: "Premium" },
    { _id: "b7", title: "OGX Argan Oil of Morocco Shampoo 13oz", category: "beauty", subCategory: "Personal Care", price: 8.97, originalPrice: 10.99, rating: 4.5, reviews: 38000, image: "https://images.unsplash.com/photo-1631390030062-ab4c37fbc38e?w=400&h=400&fit=crop", badge: "" },
    { _id: "b8", title: "Chanel No. 5 Eau de Parfum 100ml", category: "beauty", subCategory: "Personal Care", price: 149.00, originalPrice: 149.00, rating: 4.8, reviews: 12000, image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=400&fit=crop", badge: "Classic" },
    { _id: "b9", title: "ELF Cosmetics Power Grip Eye Shadow Primer", category: "beauty", subCategory: "Cosmetics", price: 10.00, originalPrice: 10.00, rating: 4.6, reviews: 15000, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop", badge: "" },
    { _id: "b10", title: "La Roche-Posay Anthelios SPF 60 Sunscreen", category: "beauty", subCategory: "Skincare", price: 36.99, originalPrice: 42.00, rating: 4.7, reviews: 9800, image: "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?w=400&h=400&fit=crop", badge: "Dermatologist" },

    // ===================== HEALTH & WELLNESS =====================
    { _id: "hw1", title: "Optimum Nutrition Gold Standard Whey Protein 5lb", category: "health", subCategory: "Health & Fitness", price: 69.99, originalPrice: 89.99, rating: 4.8, reviews: 55000, image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop", badge: "Best Seller" },
    { _id: "hw2", title: "Manduka PRO Yoga Mat 6mm", category: "health", subCategory: "Health & Fitness", price: 129.00, originalPrice: 129.00, rating: 4.8, reviews: 3200, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", badge: "" },
    { _id: "hw3", title: "Garden of Life Vitamin D3 5000IU Organic", category: "health", subCategory: "Health & Fitness", price: 22.99, originalPrice: 27.99, rating: 4.7, reviews: 18000, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop", badge: "" },
    { _id: "hw4", title: "Fitbit Charge 6 Advanced Health & Fitness Tracker", category: "health", subCategory: "Health & Fitness", price: 159.99, originalPrice: 179.99, rating: 4.5, reviews: 7320, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop", badge: "New" },
    { _id: "hw5", title: "Bowflex SelectTech 552 Adjustable Dumbbells (Pair)", category: "health", subCategory: "Health & Fitness", price: 429.00, originalPrice: 549.00, rating: 4.8, reviews: 12900, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop", badge: "Sale" },
    { _id: "hw6", title: "Omron Blood Pressure Monitor Upper Arm", category: "health", subCategory: "Health & Fitness", price: 69.99, originalPrice: 79.99, rating: 4.7, reviews: 25000, image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop", badge: "" },

    // ===================== BABY & KIDS =====================
    { _id: "k1", title: "Pampers Swaddlers Newborn Diapers 132 Count", category: "kids", subCategory: "Baby Essentials", price: 39.99, originalPrice: 49.99, rating: 4.8, reviews: 112000, image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop", badge: "Best Seller" },
    { _id: "k2", title: "LEGO Star Wars Millennium Falcon 1353 Pieces", category: "kids", subCategory: "Toys & Learning", price: 159.99, originalPrice: 169.99, rating: 4.9, reviews: 4200, image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&h=400&fit=crop", badge: "" },
    { _id: "k3", title: "Fisher-Price Deluxe Baby Bouncer with Melodies", category: "kids", subCategory: "Baby Essentials", price: 79.99, originalPrice: 99.99, rating: 4.6, reviews: 6700, image: "https://images.unsplash.com/photo-1519340241574-2727f7f543e0?w=400&h=400&fit=crop", badge: "Popular" },
    { _id: "k4", title: "UNO Card Game Classic (112 cards)", category: "kids", subCategory: "Toys & Learning", price: 10.99, originalPrice: 12.99, rating: 4.8, reviews: 78000, image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", badge: "" },
    { _id: "k5", title: "Baby Jogger City Mini GT2 All-Terrain Stroller", category: "kids", subCategory: "Baby Essentials", price: 499.99, originalPrice: 569.99, rating: 4.7, reviews: 3800, image: "https://images.unsplash.com/photo-1548449112-96a38a643324?w=400&h=400&fit=crop", badge: "Premium" },
    { _id: "k6", title: "NanoBaby Organic 100% Cotton Onesies 5-Pack", category: "kids", subCategory: "Kids Clothing", price: 29.99, originalPrice: 39.99, rating: 4.7, reviews: 9300, image: "https://images.unsplash.com/photo-1519340241574-2727f7f543e0?w=400&h=400&fit=crop", badge: "Organic" },
    { _id: "k7", title: "Magna-Tiles Clear Colors 100-Piece Set", category: "kids", subCategory: "Toys & Learning", price: 119.99, originalPrice: 139.99, rating: 4.8, reviews: 15000, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop", badge: "STEM" },

    // ===================== GROCERY =====================
    { _id: "g1", title: "Lavazza Super Crema Whole Bean Coffee 2.2lb", category: "grocery", subCategory: "Grocery & Gourmet", price: 22.50, originalPrice: 25.00, rating: 4.6, reviews: 29000, image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&h=400&fit=crop", badge: "" },
    { _id: "g2", title: "Premium Extra Virgin Olive Oil 1L - Italian", category: "grocery", subCategory: "Grocery & Gourmet", price: 18.99, originalPrice: 24.99, rating: 4.8, reviews: 3400, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop", badge: "Organic" },
    { _id: "g3", title: "Four Sigmatic Mushroom Coffee Mix 30 Packets", category: "grocery", subCategory: "Grocery & Gourmet", price: 37.00, originalPrice: 40.00, rating: 4.4, reviews: 8900, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop", badge: "Wellness" },
    { _id: "g4", title: "KIND Bars Variety Pack 24-Count", category: "grocery", subCategory: "Grocery & Gourmet", price: 26.99, originalPrice: 31.99, rating: 4.7, reviews: 42000, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=400&fit=crop", badge: "Healthy" },
    { _id: "g5", title: "HelloFresh Classic Family Meal Kit (4 Meals)", category: "grocery", subCategory: "Grocery & Gourmet", price: 49.99, originalPrice: 79.99, rating: 4.3, reviews: 18000, image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=400&fit=crop", badge: "Meal Kit" },

    // ===================== SPECIALIZED / AUTO / PET =====================
    { _id: "s1", title: "Vantrue E1 Lite 1080P Dash Cam WiFi GPS", category: "specialized", subCategory: "Automotive Gear", price: 89.99, originalPrice: 119.99, rating: 4.5, reviews: 7200, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=400&h=400&fit=crop", badge: "" },
    { _id: "s2", title: "Chemical Guys Complete Car Wash Kit (7-item)", category: "specialized", subCategory: "Automotive Gear", price: 39.99, originalPrice: 55.00, rating: 4.6, reviews: 12000, image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=400&fit=crop", badge: "Value" },
    { _id: "s3", title: "KONG Classic Large Dog Chew Toy", category: "specialized", subCategory: "Pet Supplies", price: 14.99, originalPrice: 14.99, rating: 4.8, reviews: 98000, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop", badge: "Best Seller" },
    { _id: "s4", title: "Purina Pro Plan Adult Dry Dog Food 35lb", category: "specialized", subCategory: "Pet Supplies", price: 69.98, originalPrice: 79.98, rating: 4.7, reviews: 55000, image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&h=400&fit=crop", badge: "" },
    { _id: "s5", title: "Shimano SLX M7100 12-Speed MTB Bike Drivetrain", category: "specialized", subCategory: "Sports & Outdoors", price: 199.99, originalPrice: 249.99, rating: 4.8, reviews: 3100, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop", badge: "" },
    { _id: "s6", title: "Coleman Sundome 4-Person Camping Tent", category: "specialized", subCategory: "Sports & Outdoors", price: 89.99, originalPrice: 109.99, rating: 4.5, reviews: 21000, image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop", badge: "Popular" },

    // ===================== DIGITAL PRODUCTS =====================
    { _id: "d1", title: "Adobe Creative Cloud All Apps 1-Year Plan", category: "digital", subCategory: "Learning & Software", price: 599.99, originalPrice: 659.99, rating: 4.7, reviews: 22000, image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=400&fit=crop", badge: "Pro" },
    { _id: "d2", title: "Udemy Lifetime Course Bundle - 100+ Courses", category: "digital", subCategory: "Learning & Software", price: 29.99, originalPrice: 199.99, rating: 4.5, reviews: 85000, image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=400&fit=crop", badge: "Best Value" },
    { _id: "d3", title: "Notion Pro Plan 1-Year Subscription", category: "digital", subCategory: "Learning & Software", price: 96.00, originalPrice: 96.00, rating: 4.8, reviews: 41000, image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop", badge: "Productivity" },
    { _id: "d4", title: "Atomic Habits by James Clear (eBook)", category: "digital", subCategory: "Learning & Software", price: 11.98, originalPrice: 27.00, rating: 4.9, reviews: 105000, image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop", badge: "Must Read" },

    // ===================== ARTS & HOBBIES =====================
    { _id: "a1", title: "Arteza 72-Color Watercolor Paint Set", category: "specialized", subCategory: "Arts & Hobbies", price: 34.99, originalPrice: 44.99, rating: 4.5, reviews: 18000, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop", badge: "" },
    { _id: "a2", title: "Yamaha P-45 88-Key Digital Piano", category: "specialized", subCategory: "Arts & Hobbies", price: 449.99, originalPrice: 499.99, rating: 4.8, reviews: 7800, image: "https://images.unsplash.com/photo-1512733596533-7b00ccf8ebaf?w=400&h=400&fit=crop", badge: "Popular" },
    { _id: "a3", title: "Barnyard Chunky Knitting Starter Kit - Complete Set", category: "specialized", subCategory: "Arts & Hobbies", price: 49.99, originalPrice: 59.99, rating: 4.6, reviews: 5400, image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=400&h=400&fit=crop", badge: "Trending" },

    // ===================== BOOKS =====================
    { _id: "bk1", title: "Atomic Habits - Hardcover by James Clear", category: "digital", subCategory: "Learning & Software", price: 18.29, originalPrice: 27.00, rating: 4.9, reviews: 105000, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop", badge: "Must Read" },
    { _id: "bk2", title: "The Psychology of Money - Morgan Housel", category: "digital", subCategory: "Learning & Software", price: 13.40, originalPrice: 18.99, rating: 4.7, reviews: 54000, image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop", badge: "" },
    { _id: "bk3", title: "Rich Dad Poor Dad 25th Anniversary Edition", category: "digital", subCategory: "Learning & Software", price: 12.29, originalPrice: 18.99, rating: 4.7, reviews: 88000, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop", badge: "Classic" }

];

const CATEGORY_ARCHITECTURE = {
    electronics: {
        subCategories: {
            "Computing & Peripherals": ["Laptops", "Desktop PCs", "Monitors", "Mechanical Keyboards", "Hard Drives"],
            "Mobile & Wearables": ["Smartphones", "Power Banks", "Magsafe Mounts", "Wireless Earbuds", "Smartwatches"],
            "Home Entertainment": ["Smart TVs", "Projectors", "Streaming Sticks", "Soundbars", "Gaming Consoles"],
            "Smart Home & Security": ["Security Cameras", "Smart Lights", "Thermostats", "Voice Assistants", "Smart Locks"]
        }
    },
    fashion: {
        subCategories: {
            "Women's Fashion": ["Dresses", "Sarees", "Handbags", "Blazers", "Leggings"],
            "Men's Fashion": ["Polo Shirts", "Jeans", "Hoodies", "Dress Shoes", "Belts"],
            "Footwear": ["Sneakers", "Leather Boots", "Sandals", "Running Shoes", "Loafers"],
            "Jewelry & Timepieces": ["Earrings", "Necklaces", "Smartwatches", "Luxury Watches", "Bracelets"]
        }
    },
    home: {
        subCategories: {
            "Kitchen & Dining": ["Air Fryers", "Coffee Makers", "Blenders", "Knife Sets", "Utensils"],
            "Furniture & Bedding": ["Office Chairs", "Bed Frames", "Bookshelves", "Sofas", "Mattresses"],
            "Decor & Lighting": ["Wall Art", "Scented Candles", "Rugs", "Throw Blankets", "Lamps"],
            "Garden & Outdoor": ["Patio Furniture", "Grills", "Lawn Mowers", "Power Tools", "Grow Bags"]
        }
    },
    beauty: {
        subCategories: {
            "Skincare": ["Serums", "Moisturizers", "Facial Peels", "Sunscreen", "Cleansers"],
            "Cosmetics": ["Lip Stains", "Mascara", "Foundations", "Makeup Brushes", "Eyeliners"],
            "Personal Care": ["Shampoo", "Hair Straighteners", "Electric Shavers", "Perfume", "Conditioners"],
            "Health & Fitness": ["Vitamins", "Protein Powder", "Yoga Mats", "Fitness Trackers", "Resistance Bands"]
        }
    },
    health: {
        subCategories: {
            "Supplements": ["Vitamins", "Protein Powders", "Herbal Remedies", "Omega 3", "Electrolytes"],
            "Medical Supplies": ["First Aid", "Mobility Aids", "Diagnostic Kits", "Blood Pressure Monitors", "Thermometers"],
            "Fitness": ["Yoga Mats", "Resistance Bands", "Dumbbells", "Treadmills", "Foam Rollers"],
            "Wellness": ["Sleep Aids", "Massagers", "Aromatherapy", "Posture Correctors", "Eye Masks"]
        }
    },
    kids: {
        subCategories: {
            "Baby Essentials": ["Diapers", "Wipes", "Baby Monitors", "Strollers", "Baby Bottles"],
            "Toys & Learning": ["STEM Kits", "Board Games", "Building Blocks", "RC Cars", "Puzzles"],
            "Kids Clothing": ["Onesies", "Sleep Sacks", "Bamboo Baby Clothes", "Kids Shoes", "Jackets"],
            "School Time": ["Backpacks", "Lunch Boxes", "Color Sets", "Story Books", "Stationery Kits"]
        }
    },
    grocery: {
        subCategories: {
            "Grocery & Gourmet": ["Coffee Beans", "Organic Snacks", "Meal Kits", "Spices", "Tea"],
            "Pantry": ["Rice", "Pasta", "Cooking Oil", "Sauces", "Flour"],
            "Fresh": ["Fruits", "Vegetables", "Dairy", "Bakery", "Eggs"],
            "Beverages": ["Water", "Energy Drinks", "Juices", "Soda", "Sports Drinks"]
        }
    },
    specialized: {
        subCategories: {
            "Automotive Gear": ["Dash Cams", "Tires", "Brake Pads", "Car Wax", "Seat Covers"],
            "Pet Supplies": ["Smart Collars", "GPS Trackers", "Grooming Kits", "Pet Food", "Litter"],
            "Sports & Outdoors": ["Bicycles", "Hiking Boots", "Tents", "Fishing Rods", "Camping Stoves"],
            "Arts & Hobbies": ["Crochet Kits", "Yarn", "Paint Sets", "Musical Instruments", "Sketch Books"]
        }
    },
    digital: {
        subCategories: {
            "Learning & Software": ["Online Courses", "eBooks", "SaaS Tools", "Gaming Skins", "Mobile Apps"],
            "Software": ["Antivirus", "Video Editors", "Design Tools", "Office Suites", "Cloud Storage"],
            "Education": ["Language Courses", "Coding Bootcamps", "Exam Prep", "Study Notes", "Templates"],
            "Media": ["Music Subscription", "Video Streaming", "Audiobooks", "Podcast Premium", "Stock Media"]
        }
    }
};

const ensureMinCategoryProducts = (products, minPerCategory = 50) => {
    const expanded = [...products];

    Object.entries(CATEGORY_ARCHITECTURE).forEach(([categoryId, arch]) => {
        const categoryProducts = expanded.filter(p => p.category === categoryId);
        let nextIndex = 1;

        while (categoryProducts.length < minPerCategory) {
            Object.entries(arch.subCategories).forEach(([subCategory, items]) => {
                items.forEach((itemName) => {
                    if (categoryProducts.length >= minPerCategory) return;
                    const base = categoryProducts[nextIndex % Math.max(categoryProducts.length, 1)] || expanded[0];

                    const synthetic = {
                        ...base,
                        _id: `${categoryId}-auto-${categoryProducts.length + 1}`,
                        title: `${itemName} ${nextIndex} (${subCategory})`,
                        category: categoryId,
                        subCategory,
                        price: Number((12 + (nextIndex * 3.17) % 799).toFixed(2)),
                        originalPrice: Number((18 + (nextIndex * 3.67) % 899).toFixed(2)),
                        rating: Number((4 + ((nextIndex % 10) * 0.08)).toFixed(1)),
                        reviews: 120 + nextIndex * 37,
                        badge: nextIndex % 4 === 0 ? 'Global Pick' : ''
                    };

                    expanded.push(synthetic);
                    categoryProducts.push(synthetic);
                    nextIndex += 1;
                });
            });
        }
    });

    return expanded;
};

const ALL_PRODUCTS = ensureMinCategoryProducts(DUMMY_PRODUCTS);


// @route   GET /api/products
// @desc    Get all products (with optional ?category= filter)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;

        // If DB is not connected, serve dummy data
        if (mongoose.connection.readyState !== 1) {
            if (category) {
                return res.json(ALL_PRODUCTS.filter(p => p.category === category));
            }
            return res.json(ALL_PRODUCTS);
        }

        const query = category ? { category } : {};
        const products = await Product.find(query);
        if (products.length === 0) {
            if (category) {
                return res.json(ALL_PRODUCTS.filter(p => p.category === category));
            }
            return res.json(ALL_PRODUCTS);
        }

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// @route   POST /api/products
// @desc    Add a new product (requires DB)
router.post('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ msg: "Database not connected. Provide a real MONGO_URI in your Vercel env settings." });
        }
        const newProduct = new Product(req.body);
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
