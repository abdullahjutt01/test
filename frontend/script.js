document.addEventListener("DOMContentLoaded", () => {

    const CATEGORIES = [
        { id: "electronics", label: "Electronics & Tech", icon: "💻", color: "#6366f1" },
        { id: "fashion", label: "Fashion & Apparel", icon: "👗", color: "#ec4899" },
        { id: "home", label: "Home & Kitchen", icon: "🏠", color: "#10b981" },
        { id: "beauty", label: "Beauty & Personal Care", icon: "💄", color: "#f59e0b" },
        { id: "health", label: "Health & Wellness", icon: "💊", color: "#14b8a6" },
        { id: "kids", label: "Baby & Kids", icon: "🧸", color: "#f97316" },
        { id: "grocery", label: "Grocery & Food", icon: "🛒", color: "#84cc16" },
        { id: "specialized", label: "Auto & Industrial", icon: "⚙️", color: "#64748b" },
        { id: "digital", label: "Digital Products", icon: "📱", color: "#8b5cf6" }
    ];

    const PRODUCTS = [
        // ===================== ELECTRONICS =====================
        { id: "e1", title: "Apple iPhone 15 Pro Max 256GB - Titanium", category: "electronics", subCategory: "Mobile & Wearables", price: 1199.99, originalPrice: 1299.99, rating: 4.9, reviews: 5621, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", badge: "Hot" },
        { id: "e2", title: "Samsung Galaxy S24 Ultra 512GB", category: "electronics", subCategory: "Mobile & Wearables", price: 1099.99, originalPrice: 1199.99, rating: 4.8, reviews: 3891, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", badge: "Best Seller" },
        { id: "e3", title: "Apple MacBook Pro 14-inch M3 Chip", category: "electronics", subCategory: "Computing & Peripherals", price: 1599.00, originalPrice: 1799.00, rating: 4.9, reviews: 1045, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", badge: "" },
        { id: "e4", title: "Dell XPS 15 Laptop 32GB RAM 1TB SSD", category: "electronics", subCategory: "Computing & Peripherals", price: 1399.99, originalPrice: 1599.99, rating: 4.7, reviews: 762, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop", badge: "Deal" },
        { id: "e5", title: "Sony WH-1000XM5 Noise Cancelling Headphones", category: "electronics", subCategory: "Mobile & Wearables", price: 349.99, originalPrice: 449.99, rating: 4.8, reviews: 2847, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", badge: "Best Seller" },
        { id: "e6", title: "Samsung 55'' 4K QLED Smart TV", category: "electronics", subCategory: "Home Entertainment", price: 799.99, originalPrice: 999.99, rating: 4.7, reviews: 892, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", badge: "Deal" },
        { id: "e7", title: "Nintendo Switch OLED Model - White", category: "electronics", subCategory: "Home Entertainment", price: 349.99, originalPrice: 349.99, rating: 4.8, reviews: 14200, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop", badge: "Popular" },
        { id: "e8", title: "Apple Watch Series 9 GPS 45mm", category: "electronics", subCategory: "Mobile & Wearables", price: 429.99, originalPrice: 499.99, rating: 4.8, reviews: 6743, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop", badge: "" },
        { id: "e9", title: "Anker 26800mAh Portable Power Bank", category: "electronics", subCategory: "Mobile & Wearables", price: 49.99, originalPrice: 69.99, rating: 4.7, reviews: 18900, image: "https://images.unsplash.com/photo-1609592424793-f7af3b67a98c?w=400&h=400&fit=crop", badge: "Value" },
        { id: "e10", title: "LG 27'' 4K UHD IPS Monitor", category: "electronics", subCategory: "Computing & Peripherals", price: 449.99, originalPrice: 549.99, rating: 4.7, reviews: 2341, image: "https://images.unsplash.com/photo-1527443224154-c4a573d9f05c?w=400&h=400&fit=crop", badge: "" },
        { id: "e11", title: "Amazon Echo Dot (5th Gen) Smart Speaker", category: "electronics", subCategory: "Smart Home & Security", price: 49.99, originalPrice: 49.99, rating: 4.7, reviews: 89000, image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop", badge: "Popular" },
        { id: "e12", title: "Arlo Pro 4 Wireless Security Camera System", category: "electronics", subCategory: "Smart Home & Security", price: 299.99, originalPrice: 349.99, rating: 4.6, reviews: 4512, image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=400&fit=crop", badge: "" },

        // ===================== FASHION =====================
        { id: "f1", title: "Levi's 501 Original Fit Men's Jeans - Blue", category: "fashion", subCategory: "Men's Fashion", price: 79.99, originalPrice: 99.99, rating: 4.5, reviews: 3412, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", badge: "Classic" },
        { id: "f2", title: "Nike Essential Fleece Pullover Hoodie", category: "fashion", subCategory: "Men's Fashion", price: 55.00, originalPrice: 70.00, rating: 4.6, reviews: 5120, image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop", badge: "" },
        { id: "f3", title: "Women's Summer Floral Wrap Dress", category: "fashion", subCategory: "Women's Fashion", price: 39.99, originalPrice: 59.99, rating: 4.4, reviews: 1823, image: "https://images.unsplash.com/photo-1515347619252-abbb4eb4dd2a?w=400&h=400&fit=crop", badge: "Trending" },
        { id: "f4", title: "Ray-Ban Classic Aviator Sunglasses", category: "fashion", subCategory: "Jewelry & Timepieces", price: 160.00, originalPrice: 160.00, rating: 4.7, reviews: 2984, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop", badge: "" },
        { id: "f5", title: "Nike Air Max 270 Running Shoes", category: "fashion", subCategory: "Footwear", price: 129.99, originalPrice: 159.99, rating: 4.6, reviews: 1203, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", badge: "Sale" },
        { id: "f6", title: "Adidas Ultraboost 23 Performance Sneakers", category: "fashion", subCategory: "Footwear", price: 189.99, originalPrice: 220.00, rating: 4.6, reviews: 967, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop", badge: "" },
        { id: "f7", title: "Men's Premium Cotton Oxford Button-Down Shirt", category: "fashion", subCategory: "Men's Fashion", price: 45.00, originalPrice: 55.00, rating: 4.4, reviews: 846, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop", badge: "New" },
        { id: "f8", title: "Women's Genuine Leather Handbag - Tan", category: "fashion", subCategory: "Women's Fashion", price: 119.99, originalPrice: 149.99, rating: 4.5, reviews: 2109, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", badge: "" },
        { id: "f9", title: "Tissot PRX Powermatic 80 Watch", category: "fashion", subCategory: "Jewelry & Timepieces", price: 675.00, originalPrice: 675.00, rating: 4.8, reviews: 834, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", badge: "Luxury" },
        { id: "f10", title: "Women's 14K Gold Diamond Stud Earrings", category: "fashion", subCategory: "Jewelry & Timepieces", price: 89.99, originalPrice: 120.00, rating: 4.7, reviews: 4500, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", badge: "" },
        { id: "f11", title: "Timberland Men's 6'' Waterproof Leather Boots", category: "fashion", subCategory: "Footwear", price: 199.99, originalPrice: 229.99, rating: 4.7, reviews: 8721, image: "https://images.unsplash.com/photo-1520975954732-57dd22299614?w=400&h=400&fit=crop", badge: "Popular" },
        { id: "f12", title: "Women's Yoga Leggings High-Waist 4-Way Stretch", category: "fashion", subCategory: "Women's Fashion", price: 35.00, originalPrice: 50.00, rating: 4.5, reviews: 12000, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop", badge: "Best Seller" },

        // ===================== HOME & KITCHEN =====================
        { id: "h1", title: "Ninja Foodi 9-in-1 Pressure Cooker & Air Fryer", category: "home", subCategory: "Kitchen & Dining", price: 229.99, originalPrice: 279.99, rating: 4.8, reviews: 34500, image: "https://images.unsplash.com/photo-1556909211-36987daf1dc2?w=400&h=400&fit=crop", badge: "Best Seller" },
        { id: "h2", title: "Nespresso Vertuo Plus Coffee Maker", category: "home", subCategory: "Kitchen & Dining", price: 199.99, originalPrice: 219.99, rating: 4.7, reviews: 4519, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop", badge: "" },
        { id: "h3", title: "Vitamix 5200 Professional Blender", category: "home", subCategory: "Kitchen & Dining", price: 449.95, originalPrice: 549.95, rating: 4.8, reviews: 6210, image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop", badge: "Pro" },
        { id: "h4", title: "Dyson V15 Detect Cordless Vacuum Cleaner", category: "home", subCategory: "Decor & Lighting", price: 649.99, originalPrice: 749.99, rating: 4.8, reviews: 1547, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", badge: "Top Pick" },
        { id: "h5", title: "Luxury Egyptian Cotton 1000-Thread Bed Sheets", category: "home", subCategory: "Furniture & Bedding", price: 115.00, originalPrice: 145.00, rating: 4.6, reviews: 890, image: "https://images.unsplash.com/photo-1522771731535-64906f230dae?w=400&h=400&fit=crop", badge: "Comfort" },
        { id: "h6", title: "Herman Miller Aeron Ergonomic Office Chair", category: "home", subCategory: "Furniture & Bedding", price: 1495.00, originalPrice: 1495.00, rating: 4.9, reviews: 3120, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop", badge: "Premium" },
        { id: "h7", title: "Large Scented Soy Candles Set (4-pack)", category: "home", subCategory: "Decor & Lighting", price: 49.99, originalPrice: 59.99, rating: 4.6, reviews: 7800, image: "https://images.unsplash.com/photo-1548625361-58a9b86aa83b?w=400&h=400&fit=crop", badge: "" },
        { id: "h8", title: "Moroccan Geometric Area Rug 5x8 feet", category: "home", subCategory: "Decor & Lighting", price: 89.99, originalPrice: 120.00, rating: 4.5, reviews: 3412, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", badge: "Trending" },
        { id: "h9", title: "Greenworks 40V Cordless Lawn Mower", category: "home", subCategory: "Garden & Outdoor", price: 399.99, originalPrice: 449.99, rating: 4.6, reviews: 2109, image: "https://images.unsplash.com/photo-1416879598555-46e3cb98e663?w=400&h=400&fit=crop", badge: "" },
        { id: "h10", title: "3-Piece Wicker Patio Furniture Set with Cushions", category: "home", subCategory: "Garden & Outdoor", price: 349.99, originalPrice: 499.99, rating: 4.5, reviews: 987, image: "https://images.unsplash.com/photo-1592318048602-54070a7df8cb?w=400&h=400&fit=crop", badge: "Sale" },
        { id: "h11", title: "Cuisinart 12-Piece Stainless Steel Cookware Set", category: "home", subCategory: "Kitchen & Dining", price: 249.99, originalPrice: 349.99, rating: 4.7, reviews: 5600, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop", badge: "Sale" },
        { id: "h12", title: "IKEA KALLAX 4x4 Cube Bookshelf Unit", category: "home", subCategory: "Furniture & Bedding", price: 189.99, originalPrice: 189.99, rating: 4.6, reviews: 9810, image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=400&fit=crop", badge: "" },

        // ===================== BEAUTY =====================
        { id: "b1", title: "Charlotte Tilbury Magic Cream Moisturizer 50ml", category: "beauty", subCategory: "Skincare", price: 105.00, originalPrice: 105.00, rating: 4.7, reviews: 4231, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop", badge: "Luxury" },
        { id: "b2", title: "CeraVe Moisturizing Cream 19oz", category: "beauty", subCategory: "Skincare", price: 19.99, originalPrice: 19.99, rating: 4.8, reviews: 85000, image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400&h=400&fit=crop", badge: "Best Seller" },
        { id: "b3", title: "The Ordinary Niacinamide 10% + Zinc Serum", category: "beauty", subCategory: "Skincare", price: 7.90, originalPrice: 7.90, rating: 4.5, reviews: 65000, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", badge: "Popular" },
        { id: "b4", title: "Maybelline Fit Me Matte + Poreless Foundation", category: "beauty", subCategory: "Cosmetics", price: 9.99, originalPrice: 12.99, rating: 4.4, reviews: 45000, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", badge: "" },
        { id: "b5", title: "MAC Ruby Woo Matte Lipstick", category: "beauty", subCategory: "Cosmetics", price: 21.50, originalPrice: 21.50, rating: 4.6, reviews: 22000, image: "https://images.unsplash.com/photo-1586495777744-4e6232bf2ebb?w=400&h=400&fit=crop", badge: "Iconic" },
        { id: "b6", title: "Dyson Airwrap Multi-Styler Complete", category: "beauty", subCategory: "Personal Care", price: 599.99, originalPrice: 599.99, rating: 4.7, reviews: 8945, image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop", badge: "Premium" },
        { id: "b7", title: "OGX Argan Oil of Morocco Shampoo 13oz", category: "beauty", subCategory: "Personal Care", price: 8.97, originalPrice: 10.99, rating: 4.5, reviews: 38000, image: "https://images.unsplash.com/photo-1631390030062-ab4c37fbc38e?w=400&h=400&fit=crop", badge: "" },
        { id: "b8", title: "Chanel No. 5 Eau de Parfum 100ml", category: "beauty", subCategory: "Personal Care", price: 149.00, originalPrice: 149.00, rating: 4.8, reviews: 12000, image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=400&fit=crop", badge: "Classic" },
        { id: "b9", title: "ELF Cosmetics Power Grip Eye Shadow Primer", category: "beauty", subCategory: "Cosmetics", price: 10.00, originalPrice: 10.00, rating: 4.6, reviews: 15000, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop", badge: "" },
        { id: "b10", title: "La Roche-Posay Anthelios SPF 60 Sunscreen", category: "beauty", subCategory: "Skincare", price: 36.99, originalPrice: 42.00, rating: 4.7, reviews: 9800, image: "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?w=400&h=400&fit=crop", badge: "Dermatologist" },

        // ===================== HEALTH =====================
        { id: "hw1", title: "Optimum Nutrition Gold Standard Whey Protein 5lb", category: "health", subCategory: "Health & Fitness", price: 69.99, originalPrice: 89.99, rating: 4.8, reviews: 55000, image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop", badge: "Best Seller" },
        { id: "hw2", title: "Manduka PRO Yoga Mat 6mm", category: "health", subCategory: "Health & Fitness", price: 129.00, originalPrice: 129.00, rating: 4.8, reviews: 3200, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", badge: "" },
        { id: "hw3", title: "Garden of Life Vitamin D3 5000IU Organic", category: "health", subCategory: "Health & Fitness", price: 22.99, originalPrice: 27.99, rating: 4.7, reviews: 18000, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop", badge: "" },
        { id: "hw4", title: "Fitbit Charge 6 Advanced Fitness Tracker", category: "health", subCategory: "Health & Fitness", price: 159.99, originalPrice: 179.99, rating: 4.5, reviews: 7320, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop", badge: "New" },
        { id: "hw5", title: "Bowflex SelectTech 552 Adjustable Dumbbells", category: "health", subCategory: "Health & Fitness", price: 429.00, originalPrice: 549.00, rating: 4.8, reviews: 12900, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop", badge: "Sale" },
        { id: "hw6", title: "Omron Blood Pressure Monitor Upper Arm", category: "health", subCategory: "Health & Fitness", price: 69.99, originalPrice: 79.99, rating: 4.7, reviews: 25000, image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop", badge: "" },

        // ===================== KIDS =====================
        { id: "k1", title: "Pampers Swaddlers Newborn Diapers 132 Count", category: "kids", subCategory: "Baby Essentials", price: 39.99, originalPrice: 49.99, rating: 4.8, reviews: 112000, image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop", badge: "Best Seller" },
        { id: "k2", title: "LEGO Star Wars Millennium Falcon 1353 Pieces", category: "kids", subCategory: "Toys & Learning", price: 159.99, originalPrice: 169.99, rating: 4.9, reviews: 4200, image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&h=400&fit=crop", badge: "" },
        { id: "k3", title: "Fisher-Price Deluxe Baby Bouncer with Melodies", category: "kids", subCategory: "Baby Essentials", price: 79.99, originalPrice: 99.99, rating: 4.6, reviews: 6700, image: "https://images.unsplash.com/photo-1519340241574-2727f7f543e0?w=400&h=400&fit=crop", badge: "Popular" },
        { id: "k4", title: "UNO Card Game Classic (112 cards)", category: "kids", subCategory: "Toys & Learning", price: 10.99, originalPrice: 12.99, rating: 4.8, reviews: 78000, image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop", badge: "" },
        { id: "k5", title: "Baby Jogger City Mini GT2 All-Terrain Stroller", category: "kids", subCategory: "Baby Essentials", price: 499.99, originalPrice: 569.99, rating: 4.7, reviews: 3800, image: "https://images.unsplash.com/photo-1548449112-96a38a643324?w=400&h=400&fit=crop", badge: "Premium" },
        { id: "k6", title: "NanoBaby Organic 100% Cotton Onesies 5-Pack", category: "kids", subCategory: "Kids Clothing", price: 29.99, originalPrice: 39.99, rating: 4.7, reviews: 9300, image: "https://images.unsplash.com/photo-1519340241574-2727f7f543e0?w=400&h=400&fit=crop", badge: "Organic" },
        { id: "k7", title: "Magna-Tiles Clear Colors 100-Piece Set", category: "kids", subCategory: "Toys & Learning", price: 119.99, originalPrice: 139.99, rating: 4.8, reviews: 15000, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop", badge: "STEM" },

        // ===================== GROCERY =====================
        { id: "g1", title: "Lavazza Super Crema Whole Bean Coffee 2.2lb", category: "grocery", subCategory: "Grocery & Gourmet", price: 22.50, originalPrice: 25.00, rating: 4.6, reviews: 29000, image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&h=400&fit=crop", badge: "" },
        { id: "g2", title: "Premium Extra Virgin Olive Oil 1L - Italian", category: "grocery", subCategory: "Grocery & Gourmet", price: 18.99, originalPrice: 24.99, rating: 4.8, reviews: 3400, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop", badge: "Organic" },
        { id: "g3", title: "Four Sigmatic Mushroom Coffee Mix 30 Packets", category: "grocery", subCategory: "Grocery & Gourmet", price: 37.00, originalPrice: 40.00, rating: 4.4, reviews: 8900, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop", badge: "Wellness" },
        { id: "g4", title: "KIND Bars Variety Pack 24-Count", category: "grocery", subCategory: "Grocery & Gourmet", price: 26.99, originalPrice: 31.99, rating: 4.7, reviews: 42000, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=400&fit=crop", badge: "Healthy" },
        { id: "g5", title: "HelloFresh Classic Family Meal Kit (4 Meals)", category: "grocery", subCategory: "Grocery & Gourmet", price: 49.99, originalPrice: 79.99, rating: 4.3, reviews: 18000, image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=400&fit=crop", badge: "Meal Kit" },

        // ===================== SPECIALIZED =====================
        { id: "s1", title: "Vantrue E1 Lite 1080P Dash Cam WiFi GPS", category: "specialized", subCategory: "Automotive Gear", price: 89.99, originalPrice: 119.99, rating: 4.5, reviews: 7200, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=400&h=400&fit=crop", badge: "" },
        { id: "s2", title: "Chemical Guys Complete Car Wash Kit (7-item)", category: "specialized", subCategory: "Automotive Gear", price: 39.99, originalPrice: 55.00, rating: 4.6, reviews: 12000, image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=400&fit=crop", badge: "Value" },
        { id: "s3", title: "KONG Classic Large Dog Chew Toy", category: "specialized", subCategory: "Pet Supplies", price: 14.99, originalPrice: 14.99, rating: 4.8, reviews: 98000, image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop", badge: "Best Seller" },
        { id: "s4", title: "Purina Pro Plan Adult Dry Dog Food 35lb", category: "specialized", subCategory: "Pet Supplies", price: 69.98, originalPrice: 79.98, rating: 4.7, reviews: 55000, image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&h=400&fit=crop", badge: "" },
        { id: "s5", title: "Shimano SLX M7100 12-Speed MTB Bike Drivetrain", category: "specialized", subCategory: "Sports & Outdoors", price: 199.99, originalPrice: 249.99, rating: 4.8, reviews: 3100, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop", badge: "" },
        { id: "s6", title: "Coleman Sundome 4-Person Camping Tent", category: "specialized", subCategory: "Sports & Outdoors", price: 89.99, originalPrice: 109.99, rating: 4.5, reviews: 21000, image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop", badge: "Popular" },
        { id: "a1", title: "Arteza 72-Color Watercolor Paint Set", category: "specialized", subCategory: "Arts & Hobbies", price: 34.99, originalPrice: 44.99, rating: 4.5, reviews: 18000, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop", badge: "" },
        { id: "a2", title: "Yamaha P-45 88-Key Digital Piano", category: "specialized", subCategory: "Arts & Hobbies", price: 449.99, originalPrice: 499.99, rating: 4.8, reviews: 7800, image: "https://images.unsplash.com/photo-1512733596533-7b00ccf8ebaf?w=400&h=400&fit=crop", badge: "Popular" },
        { id: "a3", title: "Barnyard Chunky Knitting Starter Kit", category: "specialized", subCategory: "Arts & Hobbies", price: 49.99, originalPrice: 59.99, rating: 4.6, reviews: 5400, image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=400&h=400&fit=crop", badge: "Trending" },

        // ===================== DIGITAL =====================
        { id: "d1", title: "Adobe Creative Cloud All Apps 1-Year Plan", category: "digital", subCategory: "Learning & Software", price: 599.99, originalPrice: 659.99, rating: 4.7, reviews: 22000, image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=400&fit=crop", badge: "Pro" },
        { id: "d2", title: "Udemy Lifetime Course Bundle - 100+ Courses", category: "digital", subCategory: "Learning & Software", price: 29.99, originalPrice: 199.99, rating: 4.5, reviews: 85000, image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=400&fit=crop", badge: "Best Value" },
        { id: "d3", title: "Notion Pro Plan 1-Year Subscription", category: "digital", subCategory: "Learning & Software", price: 96.00, originalPrice: 96.00, rating: 4.8, reviews: 41000, image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop", badge: "Productivity" },
        { id: "d4", title: "Atomic Habits by James Clear (eBook)", category: "digital", subCategory: "Learning & Software", price: 11.98, originalPrice: 27.00, rating: 4.9, reviews: 105000, image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop", badge: "Must Read" },
        { id: "bk1", title: "The Psychology of Money - Morgan Housel", category: "digital", subCategory: "Learning & Software", price: 13.40, originalPrice: 18.99, rating: 4.7, reviews: 54000, image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop", badge: "" },
        { id: "bk2", title: "Rich Dad Poor Dad 25th Anniversary Edition", category: "digital", subCategory: "Learning & Software", price: 12.29, originalPrice: 18.99, rating: 4.7, reviews: 88000, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop", badge: "Classic" }
    ];


    let cart = [];
    let wishlist = [];
    window.PRODUCTS = [...PRODUCTS];

    // Helper to get ID (handles both hardcoded 'id' and MongoDB '_id')
    const getId = (product) => product._id || product.id;

    // Render Categories
    const catGrid = document.getElementById("categories-grid");
    if (catGrid) {
        CATEGORIES.forEach(c => {
            const div = document.createElement('div');
            div.className = 'category-card';
            div.innerHTML = `<div class="category-icon">${c.icon}</div><div class="category-label">${c.label}</div>`;
            div.addEventListener('mouseover', () => div.style.borderColor = c.color);
            div.addEventListener('mouseout', () => div.style.borderColor = 'transparent');
            div.addEventListener('click', () => showCategoryView(c.id, c.label));
            catGrid.appendChild(div);
        });
    }

    // Format Price Utility
    const formatPrice = p => `$${parseFloat(p).toFixed(2)}`;
    const getDiscount = (p, op) => op > p ? Math.round(((op - p) / op) * 100) : 0;

    // Render Products
    const renderProducts = (containerId, productsList) => {
        const grid = document.getElementById(containerId);
        grid.innerHTML = ''; // clear loading state
        productsList.forEach(p => {
            const pId = getId(p);
            const discount = getDiscount(p.price, p.originalPrice);
            const discountHTML = discount > 0 ? `<div class="product-discount">-${discount}%</div>` : '';
            const oldPriceHTML = discount > 0 ? `<span class="price-old">${formatPrice(p.originalPrice)}</span>` : '';
            const badgeHTML = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';

            // Generate stars
            let stars = '';
            for (let i = 1; i <= 5; i++) { stars += i <= Math.floor(p.rating) ? '★' : '☆'; }

            grid.innerHTML += `
                <div class="product-card">
                    <div class="product-image-container" style="cursor: pointer;" onclick="openProduct('${pId}')">
                        <img src="${p.image}" class="product-image" alt="${p.title}">
                        ${badgeHTML}
                        ${discountHTML}
                        <button class="wishlist-btn" onclick="addToWishlist('${pId}', event)">🤍</button>
                    </div>
                    <div class="product-info">
                        <div class="product-cat">${p.category}</div>
                        <div class="product-title" style="cursor: pointer;" onclick="openProduct('${pId}')">${p.title}</div>
                        <div class="product-rating">
                            <span class="stars">${stars}</span>
                            <span>(${p.reviews})</span>
                        </div>
                        <div class="product-price-row">
                            <span class="price-current">${formatPrice(p.price)}</span>
                            ${oldPriceHTML}
                        </div>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart('${pId}')">🛒 Add to Cart</button>
                    </div>
                </div>
            `;
        });
    }

    // Fetch Products from Backend
    const fetchAndRenderProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    window.PRODUCTS = data;
                }
            }
        } catch (error) {
            console.error("Failed to load products from backend API. Using dummy data.", error);
        }

        renderProducts("featured-products", window.PRODUCTS.slice(0, 4));
        renderProducts("best-sellers", window.PRODUCTS.slice(4, 8));
    };

    fetchAndRenderProducts();

    // Global Functions for buttons
    window.addToCart = (productId) => {
        const product = window.PRODUCTS.find(p => String(getId(p)) === String(productId));
        if (product) {
            cart.push(product);
            document.getElementById("cart-count").innerText = cart.length;
            showToast("Product added to cart! 🛒");
        }
    }

    window.addToWishlist = (productId, event) => {
        event.stopPropagation();
        const product = window.PRODUCTS.find(p => String(getId(p)) === String(productId));
        if (product) {
            const exists = wishlist.some(item => String(getId(item)) === String(productId));
            if (!exists) {
                wishlist.push(product);
                showToast("Added to wishlist ♥");
            } else {
                showToast("Already in wishlist!");
            }
        }
    }

    window.openProduct = (productId) => {
        const p = window.PRODUCTS.find(item => String(getId(item)) === String(productId));
        if (p) {
            const discount = getDiscount(p.price, p.originalPrice);
            const discountHTML = discount > 0 ? `<div style="background:#10b981; color:#fff; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;">-${discount}%</div>` : '';
            const oldPriceHTML = discount > 0 ? `<span style="text-decoration: line-through; color: #94a3b8; font-size: 16px;">${formatPrice(p.originalPrice)}</span>` : '';

            let stars = '';
            for (let i = 1; i <= 5; i++) { stars += i <= Math.floor(p.rating) ? '★' : '☆'; }

            const modalContent = `
                <div style="width: 100%; display: flex; flex-direction: column; md:flex-row;">
                    <div style="flex: 1; text-align: center; background: #f8fafc; padding: 20px;">
                        <img src="${p.image}" style="max-width: 100%; max-height: 400px; object-fit: contain; border-radius: 12px;" />
                    </div>
                    <div style="flex: 1; padding: 30px;">
                        <div style="color: #6366f1; text-transform: uppercase; font-size: 12px; font-weight: bold; margin-bottom: 8px;">${p.category}</div>
                        <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 12px; color: #1e293b;">${p.title}</h1>
                        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 20px;">
                            <span style="color: #f59e0b; font-size: 16px;">${stars}</span>
                            <span style="color: #64748b; font-size: 14px;">(${p.reviews} reviews)</span>
                        </div>
                        <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 20px;">
                            <span style="font-size: 28px; font-weight: 900; color: #1e293b;">${formatPrice(p.price)}</span>
                            ${oldPriceHTML}
                            ${discountHTML}
                        </div>
                        <p style="color: #64748b; margin-bottom: 30px; font-size: 15px; line-height: 1.6;">Experience the best with ${p.title}. This product offers premium quality, outstanding performance, and excellent value for your money. Order now and enjoy free shipping!</p>
                        
                        <div style="display: flex; gap: 15px;">
                            <button class="btn btn-primary" style="flex: 1; padding: 15px; font-size: 16px; justify-content: center;" onclick="addToCart('${getId(p)}'); closeModal('product-modal')">🛒 Add to Cart</button>
                            <button onclick="addToWishlist('${getId(p)}', event)" style="background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 10px; width: 50px; height: 50px; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s;">🤍</button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById("product-modal-content").innerHTML = modalContent;
            document.getElementById("product-modal").classList.add("active");
        }
    }

    // Modal Logic
    window.openModal = (modalId) => {
        document.getElementById(modalId).classList.add("active");
    }

    window.closeModal = (modalId) => {
        document.getElementById(modalId).classList.remove("active");
    }

    window.openCartModal = () => {
        const container = document.getElementById("cart-items");
        let total = 0;

        if (cart.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #64748b; padding: 30px;">Your cart is empty.</p>';
        } else {
            container.innerHTML = cart.map((p, index) => {
                total += p.price;
                return `
                <div style="display: flex; gap: 15px; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; margin-bottom:8px;">
                    <img src="${p.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" />
                    <div style="flex: 1;">
                        <div style="font-weight: bold; font-size: 13px; margin-bottom: 4px; color:#0f1111;">${p.title.slice(0, 50)}...</div>
                        <div style="color: #B12704; font-weight: 800;">${formatPrice(p.price)}</div>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background: #fee2e2; color: #ef4444; border: none; width: 30px; height: 30px; border-radius: 6px; cursor: pointer;">🗑️</button>
                </div>
                `;
            }).join('');
        }

        document.getElementById("cart-modal-count").innerText = cart.length;
        document.getElementById("cart-total").innerText = total.toFixed(2);
        window._cartTotal = total;
        openModal('cart-modal');
    }

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        document.getElementById("cart-count").innerText = cart.length;
        openCartModal(); // re-render cart elements
        showToast("Removed from cart");
    }

    window.openWishlistModal = () => {
        const container = document.getElementById("wishlist-items");
        if (wishlist.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #64748b; padding: 30px;">Your wishlist is empty.</p>';
        } else {
            container.innerHTML = wishlist.map((p, index) => `
                <div style="display: flex; gap: 15px; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                    <img src="${p.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" />
                    <div style="flex: 1;">
                        <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">${p.title}</div>
                        <div style="color: #6366f1; font-weight: 800;">${formatPrice(p.price)}</div>
                    </div>
                    <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="addToCart('${getId(p)}'); removeFromWishlist(${index})">Move to Cart</button>
                    <button onclick="removeFromWishlist(${index})" style="background: none; border: none; font-size: 16px; cursor: pointer;">✕</button>
                </div>
            `).join('');
        }
        openModal('wishlist-modal');
    }

    window.removeFromWishlist = (index) => {
        wishlist.splice(index, 1);
        openWishlistModal();
        showToast("Removed from wishlist");
    }

    // ============================================
    //  CHECKOUT - Backend Connected
    // ============================================

    window.proceedToCheckout = () => {
        if (cart.length === 0) { showToast('Your cart is empty!'); return; }
        closeModal('cart-modal');

        const total = window._cartTotal || cart.reduce((s, p) => s + p.price, 0);

        // Build checkout modal dynamically
        let checkoutModal = document.getElementById('checkout-modal');
        if (!checkoutModal) {
            checkoutModal = document.createElement('div');
            checkoutModal.id = 'checkout-modal';
            checkoutModal.className = 'modal-overlay';
            document.body.appendChild(checkoutModal);
        }

        checkoutModal.innerHTML = `
            <div class="modal-box" style="max-width:520px; padding:30px;">
                <div class="modal-header" style="margin-bottom:20px;">
                    <h2 style="color:#0f1111;">🧾 Checkout</h2>
                    <button onclick="closeModal('checkout-modal')" style="background:none;border:none;font-size:20px;cursor:pointer;">✕</button>
                </div>

                <div style="background:#FFF3CD; border:1px solid #FFC107; border-radius:8px; padding:10px 14px; margin-bottom:18px; font-size:13px; color:#664d03;">
                    🛒 <b>${cart.length} item(s)</b> — Total: <b style="color:#B12704;">$${total.toFixed(2)}</b>
                </div>

                <form id="checkout-form" onsubmit="submitOrder(event)" style="display:flex;flex-direction:column;gap:12px;">
                    <input id="co-name" type="text" placeholder="Full Name *" required
                        style="padding:10px 12px;border:1px solid #ccc;border-radius:6px;font-size:14px;">
                    <input id="co-email" type="email" placeholder="Email Address *" required
                        style="padding:10px 12px;border:1px solid #ccc;border-radius:6px;font-size:14px;">
                    <input id="co-phone" type="tel" placeholder="Phone Number *" required
                        style="padding:10px 12px;border:1px solid #ccc;border-radius:6px;font-size:14px;">
                    <input id="co-address" type="text" placeholder="Street Address *" required
                        style="padding:10px 12px;border:1px solid #ccc;border-radius:6px;font-size:14px;">
                    <input id="co-city" type="text" placeholder="City *" required
                        style="padding:10px 12px;border:1px solid #ccc;border-radius:6px;font-size:14px;">

                    <div style="margin-top:6px;">
                        <div style="font-weight:700;font-size:14px;margin-bottom:8px;color:#0f1111;">Payment Method</div>
                        <div style="display:flex;flex-direction:column;gap:8px;">
                            <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;">
                                <input type="radio" name="payment" value="cod" checked> 💵 Cash on Delivery (COD)
                            </label>
                            <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;">
                                <input type="radio" name="payment" value="stripe"> 💳 Credit / Debit Card (Stripe)
                            </label>
                            <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;">
                                <input type="radio" name="payment" value="jazzcash"> 📱 JazzCash
                            </label>
                            <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;">
                                <input type="radio" name="payment" value="easypaisa"> 📲 Easypaisa
                            </label>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary"
                        style="justify-content:center;padding:14px;font-size:16px;margin-top:8px;background:#FFD814;color:#0f1111;border:1px solid #FFC200;border-radius:8px;cursor:pointer;font-weight:700;">
                        ✅ Place Order — $${total.toFixed(2)}
                    </button>
                </form>
            </div>
        `;

        checkoutModal.classList.add('active');
    };

    window.submitOrder = async (e) => {
        e.preventDefault();
        const fullName = document.getElementById('co-name').value.trim();
        const email = document.getElementById('co-email').value.trim();
        const phone = document.getElementById('co-phone').value.trim();
        const address = document.getElementById('co-address').value.trim();
        const city = document.getElementById('co-city').value.trim();
        const payment = document.querySelector('input[name="payment"]:checked').value;
        const total = window._cartTotal || cart.reduce((s, p) => s + p.price, 0);

        const orderPayload = {
            guestName: fullName,
            guestEmail: email,
            items: cart.map(p => ({ title: p.title, image: p.image, price: p.price, quantity: 1 })),
            totalPrice: parseFloat(total.toFixed(2)),
            paymentMethod: payment,
            shippingAddress: { fullName, address, city, phone }
        };

        const submitBtn = document.querySelector('#checkout-form button[type="submit"]');
        submitBtn.textContent = '⏳ Placing order...';
        submitBtn.disabled = true;

        try {
            // 1. Place order
            const orderRes = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });
            const orderData = await orderRes.json();

            // 2. Process payment
            await fetch(`/api/payment/${payment}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: total, orderId: orderData.orderId })
            });

            // 3. Show success
            closeModal('checkout-modal');
            cart = [];
            document.getElementById('cart-count').innerText = 0;

            // Success message
            const successEl = document.createElement('div');
            successEl.className = 'modal-overlay active';
            successEl.innerHTML = `
                <div class="modal-box" style="max-width:420px;text-align:center;padding:40px;">
                    <div style="font-size:64px;margin-bottom:16px;">🎉</div>
                    <h2 style="color:#007600;margin-bottom:8px;">Order Placed!</h2>
                    <p style="color:#555;margin-bottom:16px;">Thank you, <b>${fullName}</b>! Your order has been received.</p>
                    <div style="background:#f0f9f0;border:1px solid #007600;border-radius:8px;padding:12px;margin-bottom:20px;font-size:14px;">
                        <b>Order ID:</b> ${orderData.orderId || 'N/A'}<br>
                        <b>Payment:</b> ${payment.toUpperCase()}<br>
                        <b>Total:</b> <span style="color:#B12704;">$${total.toFixed(2)}</span><br>
                        <b>City:</b> ${city}
                    </div>
                    <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-primary"
                        style="justify-content:center;width:100%;">
                        Continue Shopping
                    </button>
                </div>
            `;
            document.body.appendChild(successEl);

        } catch (err) {
            submitBtn.textContent = '✅ Place Order';
            submitBtn.disabled = false;
            showToast('⚠️ Could not connect to server. Please try again.');
        }
    };

    // ============================================
    //  AUTH - Backend Connected
    // ============================================

    let currentUser = JSON.parse(localStorage.getItem('megamart_user') || 'null');

    const updateNavUser = () => {
        const accountBtn = document.getElementById('account-btn');
        if (accountBtn && currentUser) {
            accountBtn.innerHTML = `👤 ${currentUser.username.split(' ')[0]}`;
        }
    };
    updateNavUser();

    window.openAuthModal = () => {
        const modal = document.getElementById('auth-modal');
        modal.innerHTML = `
            <div class="modal-box" style="max-width:400px;">
                <div class="modal-header">
                    <h2 id="auth-title">Sign In</h2>
                    <button onclick="closeModal('auth-modal')" style="background:none;border:none;font-size:20px;cursor:pointer;">✕</button>
                </div>
                <div style="margin-top:20px;display:flex;flex-direction:column;gap:12px;" id="auth-form-area">
                    <input id="auth-email" type="email" placeholder="Email" style="width:100%;padding:12px;border:1px solid #e2e8f0;border-radius:8px;box-sizing:border-box;">
                    <input id="auth-pass" type="password" placeholder="Password" style="width:100%;padding:12px;border:1px solid #e2e8f0;border-radius:8px;box-sizing:border-box;">
                    <div id="auth-name-wrap" style="display:none;">
                        <input id="auth-name" type="text" placeholder="Full Name" style="width:100%;padding:12px;border:1px solid #e2e8f0;border-radius:8px;box-sizing:border-box;">
                    </div>
                    <div id="auth-error" style="color:red;font-size:13px;display:none;"></div>
                    <button onclick="submitAuth('login')" id="auth-login-btn" class="btn btn-primary" style="width:100%;justify-content:center;">Sign In</button>
                    <p style="text-align:center;font-size:13px;color:#555;">
                        New customer? <a href="#" onclick="toggleAuthMode()" style="color:#007185;">Create account</a>
                    </p>
                </div>
            </div>
        `;
        openModal('auth-modal');
    };

    window.toggleAuthMode = () => {
        const title = document.getElementById('auth-title');
        const nameWrap = document.getElementById('auth-name-wrap');
        const loginBtn = document.getElementById('auth-login-btn');
        const isLogin = title.textContent === 'Sign In';
        if (isLogin) {
            title.textContent = 'Create Account';
            nameWrap.style.display = 'block';
            loginBtn.textContent = 'Register';
            loginBtn.onclick = () => submitAuth('register');
        } else {
            title.textContent = 'Sign In';
            nameWrap.style.display = 'none';
            loginBtn.textContent = 'Sign In';
            loginBtn.onclick = () => submitAuth('login');
        }
    };

    window.submitAuth = async (mode) => {
        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-pass').value.trim();
        const username = document.getElementById('auth-name')?.value.trim();
        const errEl = document.getElementById('auth-error');
        errEl.style.display = 'none';

        if (!email || !password) { errEl.textContent = 'Please fill all fields'; errEl.style.display = 'block'; return; }

        const body = mode === 'register' ? { username, email, password } : { email, password };

        try {
            const res = await fetch(`/api/auth/${mode}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();

            if (!res.ok) { errEl.textContent = data.msg || 'Error'; errEl.style.display = 'block'; return; }

            currentUser = data.user;
            localStorage.setItem('megamart_user', JSON.stringify(data.user));
            localStorage.setItem('megamart_token', data.token);
            updateNavUser();
            closeModal('auth-modal');
            showToast(`Welcome, ${data.user.username}! 👋`);

        } catch {
            errEl.textContent = 'Server unavailable. Try again.'; errEl.style.display = 'block';
        }
    };

    window.closeAuthModal = () => closeModal('auth-modal');

    // ============================================
    //  CATEGORY VIEW TOGGLE
    // ============================================

    const getStars = (rating) => {
        let s = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) s += '★';
            else if (i - rating < 1) s += '½';
            else s += '☆';
        }
        return s;
    };

    window.showCategoryView = (categoryId, categoryLabel) => {
        const homeView = document.getElementById('home-view');
        const catView = document.getElementById('category-view');
        const grid = document.getElementById('category-products-grid');
        const resultsText = document.getElementById('category-results-text');
        const sidebarActive = document.querySelector('.filter-list li.active');

        // Filter products
        const filtered = window.PRODUCTS.filter(p => {
            if (categoryId === 'all') return true;
            return p.category === categoryId;
        });

        // Update results text
        if (resultsText) {
            resultsText.innerHTML = `1-${filtered.length} of over 1,000 results for "<span>${categoryLabel}</span>"`;
        }

        // Update sidebar active label
        if (sidebarActive) sidebarActive.textContent = categoryLabel;

        // Render cat cards
        grid.innerHTML = '';

        // Breadcrumb
        grid.innerHTML += `
            <div class="category-breadcrumb" onclick="showHomeView()">← Back to Home</div>
        `;

        if (filtered.length === 0) {
            grid.innerHTML += `<p style="padding: 20px; color: #555;">No products found in this category. Try "Electronics" or "Home".</p>`;
        }

        filtered.forEach(p => {
            const pId = getId(p);
            const discount = getDiscount(p.price, p.originalPrice);
            const discountLabel = discount > 0 ? `<span class="cat-card-discount">(-${discount}%)</span>` : '';
            const originalLabel = discount > 0 ? `<span class="cat-card-original">${formatPrice(p.originalPrice)}</span>` : '';
            const stars = getStars(p.rating);
            // Fake delivery date (3 days from now)
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 3);
            const deliveryStr = deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

            grid.innerHTML += `
                <div class="cat-card">
                    <img class="cat-card-image" src="${p.image}" alt="${p.title}" onclick="openProduct('${pId}')">
                    <div class="cat-card-body">
                        <div class="cat-card-title" onclick="openProduct('${pId}')">${p.title}</div>
                        <div class="cat-card-rating">
                            <span class="cat-card-stars">${stars}</span>
                            <span class="cat-card-reviews">${(p.reviews || 0).toLocaleString()} ratings</span>
                        </div>
                        <div class="cat-card-price-block">
                            <span class="cat-card-price"><sup>$</sup>${p.price.toFixed(2)}</span>
                            ${originalLabel}
                            ${discountLabel}
                        </div>
                        <div class="cat-card-prime">
                            <span class="prime-badge">prime</span>
                            FREE Delivery
                        </div>
                        <div class="cat-card-delivery">Get it by <b>${deliveryStr}</b></div>
                        <button class="cat-card-add-btn" onclick="addToCart('${pId}')">Add to Cart</button>
                    </div>
                </div>
            `;
        });

        homeView.style.display = 'none';
        catView.style.display = 'flex';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.showHomeView = () => {
        document.getElementById('home-view').style.display = 'block';
        document.getElementById('category-view').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Make logo click go back to home
    const logoEl = document.querySelector('.logo');
    if (logoEl) logoEl.addEventListener('click', showHomeView);

    // Hook up sub-navbar links to category views
    const subNavBtns = document.querySelectorAll('.sub-nav-btn');
    subNavBtns.forEach(btn => {
        btn.addEventListener('click', () => showCategoryView('all', btn.textContent.trim()));
    });

    // Hook all a-card-links and quad-items to trigger category view
    document.querySelectorAll('.a-card-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = link.textContent.includes('gaming') ? 'electronics' :
                link.textContent.includes('Home') ? 'home' :
                    link.textContent.includes('kitchen') ? 'home' :
                        link.textContent.includes('Fashion') ? 'fashion' :
                            link.textContent.includes('garden') ? 'home' : 'all';
            showCategoryView(cat, link.closest('.a-card').querySelector('.a-card-title').textContent);
        });
    });

    document.querySelectorAll('.quad-item').forEach(qi => {
        qi.addEventListener('click', () => {
            showCategoryView('all', qi.querySelector('span').textContent);
        });
    });

    window.showToast = (msg) => {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = "✓ " + msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    window.openAuthModal = () => openModal('auth-modal');
    window.closeAuthModal = () => closeModal('auth-modal');

});
