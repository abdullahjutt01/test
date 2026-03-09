const fs = require('fs');

const categories = [
    { id: "electronics", subCategories: ["Mobile & Wearables", "Computing & Peripherals", "Home Entertainment", "Smart Home & Security"] },
    { id: "fashion", subCategories: ["Men's Fashion", "Women's Fashion", "Jewelry & Timepieces", "Footwear"] },
    { id: "home", subCategories: ["Kitchen & Dining", "Decor & Lighting", "Furniture & Bedding", "Garden & Outdoor"] },
    { id: "beauty", subCategories: ["Skincare", "Cosmetics", "Personal Care"] },
    { id: "health", subCategories: ["Health & Fitness", "Vitamins & Supplements", "Medical Supplies"] },
    { id: "kids", subCategories: ["Baby Essentials", "Toys & Learning", "Kids Clothing"] },
    { id: "grocery", subCategories: ["Grocery & Gourmet", "Snacks & Sweets", "Beverages"] },
    { id: "specialized", subCategories: ["Automotive Gear", "Pet Supplies", "Sports & Outdoors", "Arts & Hobbies"] },
    { id: "digital", subCategories: ["Learning & Software", "Digital Tools", "eBooks"] }
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

function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function uniform(min, max) { return Math.random() * (max - min) + min; }

function generateProducts() {
    let products = [];
    let pidCounter = 1;

    for (let cat of categories) {
        let catId = cat.id;
        for (let i = 0; i < 55; i++) {
            let brand = randomChoice(brands[catId]);
            let adj = randomChoice(adjectives);
            let noun = randomChoice(nouns[catId]);

            let modelChar = randomChoice(['X', 'Pro', 'Max', 'Plus', 'Eco', 'Lite', `Series ${Math.floor(uniform(1, 8))}`]);

            let title = `${brand} ${adj} ${noun} ${modelChar}`;
            if (catId === "fashion") {
                title = `${brand} ${adj} ${noun}`;
            } else if (catId === "grocery") {
                title = `${adj} ${brand} ${noun} ${randomChoice(['Pack', 'Bundle', '1kg', '500g', 'Family Size'])}`;
            }

            let originalPrice = Math.round(uniform(10.0, 1500.0) * 100) / 100;
            if (["grocery", "beauty", "kids"].includes(catId)) {
                originalPrice = Math.round(uniform(5.0, 100.0) * 100) / 100;
            }

            let discountPct = randomChoice([0, 0, 0, 10, 15, 20, 30, 50]);
            let price = Math.round(originalPrice * (1 - discountPct / 100.0) * 100) / 100;
            if (price === originalPrice) {
                price = Number((originalPrice - 0.01).toFixed(2));
            }

            let rating = Math.round(uniform(4.0, 5.0) * 10) / 10;
            let reviews = Math.floor(uniform(50, 150000));

            let badge = randomChoice(badges);
            let subCat = randomChoice(cat.subCategories);

            let image = `https://picsum.photos/seed/${pidCounter * 10}/400/400`;

            products.append = products.push({
                id: `${catId.charAt(0)}${pidCounter}`,
                title,
                category: catId,
                subCategory: subCat,
                price,
                originalPrice,
                rating,
                reviews,
                image,
                badge
            });
            pidCounter++;
        }
    }
    return products;
}

const products = generateProducts();
const productsJsonStr = JSON.stringify(products, null, 4);

// Replace in script.js
const frontendPath = "frontend/script.js";
let fContent = fs.readFileSync(frontendPath, 'utf8');
const fPattern = /const PRODUCTS = \[\s*[\s\S]*?\n\s*\];/;
fContent = fContent.replace(fPattern, "const PRODUCTS = " + productsJsonStr + ";");
fs.writeFileSync(frontendPath, fContent);
console.log(`Updated ${frontendPath}`);

// Replace in products.js
const backendPath = "backend/routes/products.js";
let bContent = fs.readFileSync(backendPath, 'utf8');
const bPattern = /const DUMMY_PRODUCTS = \[[\s\S]*?\];/;
const bJsonStr = productsJsonStr.replace(/"id":/g, '"_id":');
bContent = bContent.replace(bPattern, "const DUMMY_PRODUCTS = " + bJsonStr + ";");
fs.writeFileSync(backendPath, bContent);
console.log(`Updated ${backendPath}`);
console.log(`Generated 495 products successfully!`);
