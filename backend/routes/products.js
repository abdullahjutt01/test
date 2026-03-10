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

    const nounImages = {
        "Smartphone": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
        "Laptop": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
        "Monitor": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
        "Headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        "Speaker": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        "Camera": "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=400&h=400&fit=crop",
        "Tablet": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
        "Smartwatch": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
        "Jacket": "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        "Sneakers": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        "T-Shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        "Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        "Watch": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        "Sunglasses": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        "Handbag": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
        "Dress": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
        "Blender": "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop",
        "Coffee Maker": "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=400&fit=crop",
        "Vacuum": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        "Air Fryer": "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
        "Sofa": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
        "Desk": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop",
        "Lamp": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
        "Rug": "https://images.unsplash.com/photo-1575414003130-58c5d3684f5a?w=400&h=400&fit=crop",
        "Lipstick": "https://images.unsplash.com/photo-1586495777744-4e6232bf2f9d?w=400&h=400&fit=crop",
        "Foundation": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
        "Moisturizer": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        "Serum": "https://images.unsplash.com/photo-1571781926291-c477eb31f82f?w=400&h=400&fit=crop",
        "Perfume": "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=400&fit=crop",
        "Shampoo": "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=400&fit=crop",
        "Cleanser": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop",
        "Mascara": "https://images.unsplash.com/photo-1631214499865-fc0a1a5e36a5?w=400&h=400&fit=crop",
        "Protein Powder": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=400&h=400&fit=crop",
        "Yoga Mat": "https://images.unsplash.com/photo-1601925228008-9bddcc0e07e1?w=400&h=400&fit=crop",
        "Treadmill": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=400&fit=crop",
        "Vitamins": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
        "Dumbbells": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
        "Foam Roller": "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=400&h=400&fit=crop",
        "Blood Pressure Monitor": "https://images.unsplash.com/photo-1631563019676-dade0dbdb8fc?w=400&h=400&fit=crop",
        "Action Figure": "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=400&h=400&fit=crop",
        "Board Game": "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=400&fit=crop",
        "Building Blocks": "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
        "Stroller": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=400&fit=crop",
        "Diapers": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
        "Plush Toy": "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop",
        "Puzzle": "https://images.unsplash.com/photo-1581873372796-635b67ca2008?w=400&h=400&fit=crop",
        "Coffee Beans": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
        "Olive Oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
        "Pasta": "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=400&h=400&fit=crop",
        "Chocolate": "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=400&fit=crop",
        "Tea": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
        "Honey": "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400&h=400&fit=crop",
        "Almonds": "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&h=400&fit=crop",
        "Cereal": "https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=400&h=400&fit=crop",
        "Tent": "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400&h=400&fit=crop",
        "Bike Helmet": "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=400&fit=crop",
        "Dog Food": "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&h=400&fit=crop",
        "Car Wash Kit": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=400&fit=crop",
        "Dash Cam": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=400&fit=crop",
        "Fishing Rod": "https://images.unsplash.com/photo-1514649923863-ceaf75b7ec40?w=400&h=400&fit=crop",
        "Drill": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
        "Guitar": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop",
        "Software": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop",
        "Course Bundle": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=400&fit=crop",
        "Subscription": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop",
        "eBook": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
        "App License": "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop",
        "Template Pack": "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=400&h=400&fit=crop",
        "Antivirus": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop"
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

            // Use noun-specific CDN image (works on Vercel)
            let image = nounImages[noun] || `https://picsum.photos/seed/${noun.replace(/ /g, '_')}/400/400`;

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
