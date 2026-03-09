const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const generateCatalog = () => {
    const categories = [
        { id: "electronics", subs: ["Mobile & Wearables", "Computing & Peripherals", "Home Entertainment", "Smart Home & Security"] },
        { id: "fashion", subs: ["Men's Fashion", "Women's Fashion", "Jewelry & Timepieces", "Footwear"] },
        { id: "home", subs: ["Kitchen & Dining", "Decor & Lighting", "Furniture & Bedding", "Garden & Outdoor"] },
        { id: "beauty", subs: ["Skincare", "Cosmetics", "Personal Care"] },
        { id: "health", subs: ["Health & Fitness", "Vitamins & Supplements", "Medical Supplies"] },
        { id: "kids", subs: ["Baby Essentials", "Toys & Learning", "Kids Clothing"] },
        { id: "grocery", subs: ["Grocery & Gourmet", "Snacks & Sweets", "Beverages"] },
        { id: "specialized", subs: ["Automotive Gear", "Pet Supplies", "Sports & Outdoors", "Arts & Hobbies"] },
        { id: "digital", subs: ["Learning & Software", "Digital Tools", "eBooks"] }
    ];

    const brands = {
        "electronics": ["Sony", "Samsung", "Apple", "Dell", "HP", "Asus", "LG", "Anker", "Razer", "Logitech"],
        "fashion": ["Nike", "Adidas", "Levi's", "Puma", "Gucci", "Zara", "H&M", "Ray-Ban", "Rolex"],
        "home": ["IKEA", "Dyson", "Ninja", "Philips", "Breville", "KitchenAid", "Nespresso", "Cuisinart"],
        "beauty": ["MAC", "L'Oreal", "Maybelline", "Clinique", "Estee Lauder", "Dior", "Chanel", "The Ordinary"],
        "health": ["Optimum", "Fitbit", "Garmin", "GNC", "NatureMade", "Omron", "Theragun"],
        "kids": ["Lego", "Fisher-Price", "Mattel", "Hasbro", "Pampers", "Huggies", "Disney", "Nerf"],
        "grocery": ["Nestle", "Kelloggs", "Coca-Cola", "Pepsi", "Oreo", "Quaker", "Heinz", "Lavazza"],
        "specialized": ["Shimano", "KONG", "Coleman", "Yamaha", "Bosch", "Michelin", "Purina", "Pedigree"],
        "digital": ["Adobe", "Microsoft", "Udemy", "Coursera", "Notion", "Kaspersky", "TurboTax"]
    };

    const adjectives = ["Premium", "Ultra", "Elite", "Pro", "Advanced", "Classic", "Smart", "Compact", "Deluxe", "Essential", "Original", "Wireless"];
    const nouns = {
        "electronics": ["Smartphone", "Laptop", "Monitor", "Headphones", "Speaker", "Camera", "Tablet", "Smartwatch"],
        "fashion": ["Jacket", "Sneakers", "T-Shirt", "Jeans", "Watch", "Sunglasses", "Handbag", "Dress"],
        "home": ["Blender", "Coffee Maker", "Vacuum", "Air Fryer", "Sofa", "Desk", "Lamp", "Rug"],
        "beauty": ["Lipstick", "Foundation", "Moisturizer", "Serum", "Perfume", "Shampoo", "Cleanser", "Mascara"],
        "health": ["Protein Powder", "Yoga Mat", "Treadmill", "Vitamins", "Dumbbells", "Foam Roller", "Blood Pressure Monitor"],
        "kids": ["Action Figure", "Board Game", "Building Blocks", "Stroller", "Diapers", "Plush Toy", "Puzzle"],
        "grocery": ["Coffee Beans", "Olive Oil", "Pasta", "Chocolate", "Tea", "Honey", "Almonds", "Cereal"],
        "specialized": ["Tent", "Bike Helmet", "Dog Food", "Car Wash Kit", "Dash Cam", "Fishing Rod", "Drill", "Guitar"],
        "digital": ["Software", "Course Bundle", "Subscription", "eBook", "App License", "Template Pack", "Antivirus"]
    };

    const badges = ["", "", "", "New", "Hot", "Sale", "Best Seller", "Popular", "Premium", "Trending", "Deal"];

    const categoryImages = {
        "electronics": [
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1572569433494-1a3b1a8d0cf3?w=400&h=400&fit=crop"
        ],
        "fashion": [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
        ],
        "home": [
            "https://images.unsplash.com/photo-1556909211-36987daf1dc2?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&h=400&fit=crop"
        ],
        "beauty": [
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1590156546946-cb5fa57375ce?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571781926291-c477eb31f82f?w=400&h=400&fit=crop"
        ],
        "health": [
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop"
        ],
        "kids": [
            "https://images.unsplash.com/photo-1519340241574-2727f7f543e0?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1596461404969-9ce205b34006?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1566579090262-51cde5ebe92e?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=400&fit=crop"
        ],
        "grocery": [
            "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1515706886582-54ac73c5ea8c?w=400&h=400&fit=crop"
        ],
        "specialized": [
            "https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1563212046-6bb62325c99d?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1498887960847-2a5e46312788?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1507133750070-44473e51fe94?w=400&h=400&fit=crop"
        ],
        "digital": [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1531297172868-9f1d1b5a5932?w=400&h=400&fit=crop"
        ]
    };

    let generated = [];
    let pId = 1;
    let seed = 12345;
    const sRandom = () => {
        let x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    const sGetRandom = (arr) => arr[Math.floor(sRandom() * arr.length)];
    const sGetNum = (min, max) => sRandom() * (max - min) + min;

    categories.forEach(cat => {
        // Generate absolutely minimum 55 per category
        for (let i = 0; i < 55; i++) {
            let brand = sGetRandom(brands[cat.id]);
            let adj = sGetRandom(adjectives);
            let noun = sGetRandom(nouns[cat.id]);
            let suffix = sGetRandom(['X', 'Pro', 'Max', 'Plus', 'Eco', 'Lite', `Series ${Math.floor(sGetNum(1, 8))}`]);

            let title = `${brand} ${adj} ${noun} ${suffix}`;
            if (cat.id === "fashion") title = `${brand} ${adj} ${noun}`;
            if (cat.id === "grocery") title = `${adj} ${brand} ${noun} ${sGetRandom(['Pack', 'Bundle', '1kg', '500g', 'Family Size'])}`;

            let originalPrice = Math.round(sGetNum(10, 1500) * 100) / 100;
            if (["grocery", "beauty", "kids"].includes(cat.id)) originalPrice = Math.round(sGetNum(5, 100) * 100) / 100;

            let discountPct = sGetRandom([0, 0, 0, 0, 10, 15, 20, 30, 50]);
            let price = Math.round(originalPrice * (1 - discountPct / 100) * 100) / 100;
            if (price === originalPrice) price = Number((originalPrice - 0.01).toFixed(2));

            // Use specific category images
            let catImgs = categoryImages[cat.id];
            let image = sGetRandom(catImgs);

            generated.push({
                _id: `${cat.id.charAt(0)}${pId}`,
                id: `${cat.id.charAt(0)}${pId}`,
                title: title,
                category: cat.id,
                subCategory: sGetRandom(cat.subs),
                price: price,
                originalPrice: originalPrice,
                rating: Number(sGetNum(4.0, 5.0).toFixed(1)),
                reviews: Math.floor(sGetNum(50, 150000)),
                image: image,
                badge: sGetRandom(badges)
            });
            pId++;
        }
    });
    return generated;
};

const DUMMY_PRODUCTS = generateCatalog();

// @route   GET /api/products
// @desc    Get all products (with optional ?category= filter)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;

        // If DB is not connected, serve dummy data
        if (mongoose.connection.readyState !== 1) {
            if (category) {
                return res.json(DUMMY_PRODUCTS.filter(p => p.category === category));
            }
            return res.json(DUMMY_PRODUCTS);
        }

        const query = category ? { category } : {};
        const products = await Product.find(query);
        if (products.length === 0) {
            if (category) {
                return res.json(DUMMY_PRODUCTS.filter(p => p.category === category));
            }
            return res.json(DUMMY_PRODUCTS);
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
