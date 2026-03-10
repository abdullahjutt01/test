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
            let safeName = noun.replace(/ /g, '_').toLowerCase();
            let image = `images/${safeName}.jpg`;

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
