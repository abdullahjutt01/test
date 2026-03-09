import os
import json
import random
import re

categories = [
    {"id": "electronics", "subCategories": ["Mobile & Wearables", "Computing & Peripherals", "Home Entertainment", "Smart Home & Security"]},
    {"id": "fashion", "subCategories": ["Men's Fashion", "Women's Fashion", "Jewelry & Timepieces", "Footwear"]},
    {"id": "home", "subCategories": ["Kitchen & Dining", "Decor & Lighting", "Furniture & Bedding", "Garden & Outdoor"]},
    {"id": "beauty", "subCategories": ["Skincare", "Cosmetics", "Personal Care"]},
    {"id": "health", "subCategories": ["Health & Fitness", "Vitamins & Supplements", "Medical Supplies"]},
    {"id": "kids", "subCategories": ["Baby Essentials", "Toys & Learning", "Kids Clothing"]},
    {"id": "grocery", "subCategories": ["Grocery & Gourmet", "Snacks & Sweets", "Beverages"]},
    {"id": "specialized", "subCategories": ["Automotive Gear", "Pet Supplies", "Sports & Outdoors", "Arts & Hobbies"]},
    {"id": "digital", "subCategories": ["Learning & Software", "Digital Tools", "eBooks"]}
]

brands = {
    "electronics": ["Sony", "Samsung", "Apple", "Dell", "HP", "Asus", "LG", "Anker", "Razer", "Logitech"],
    "fashion": ["Nike", "Adidas", "Levi's", "Puma", "Gucci", "Zara", "H&M", "Ray-Ban", "Rolex"],
    "home": ["IKEA", "Dyson", "Ninja", "Philips", "Breville", "KitchenAid", "Nespresso", "Cuisinart"],
    "beauty": ["MAC", "L'Oreal", "Maybelline", "Clinique", "Estee Lauder", "Dior", "Chanel", "The Ordinary"],
    "health": ["Optimum", "Fitbit", "Garmin", "GNC", "NatureMade", "Omron", "Theragun"],
    "kids": ["Lego", "Fisher-Price", "Mattel", "Hasbro", "Pampers", "Huggies", "Disney", "Nerf"],
    "grocery": ["Nestle", "Kelloggs", "Coca-Cola", "Pepsi", "Oreo", "Quaker", "Heinz", "Lavazza"],
    "specialized": ["Shimano", "KONG", "Coleman", "Yamaha", "Bosch", "Michelin", "Purina", "Pedigree"],
    "digital": ["Adobe", "Microsoft", "Udemy", "Coursera", "Notion", "Kaspersky", "TurboTax"]
}

adjectives = ["Premium", "Ultra", "Elite", "Pro", "Advanced", "Classic", "Smart", "Compact", "Deluxe", "Essential", "Original", "Wireless"]
nouns = {
    "electronics": ["Smartphone", "Laptop", "Monitor", "Headphones", "Speaker", "Camera", "Tablet", "Smartwatch"],
    "fashion": ["Jacket", "Sneakers", "T-Shirt", "Jeans", "Watch", "Sunglasses", "Handbag", "Dress"],
    "home": ["Blender", "Coffee Maker", "Vacuum", "Air Fryer", "Sofa", "Desk", "Lamp", "Rug"],
    "beauty": ["Lipstick", "Foundation", "Moisturizer", "Serum", "Perfume", "Shampoo", "Cleanser", "Mascara"],
    "health": ["Protein Powder", "Yoga Mat", "Treadmill", "Vitamins", "Dumbbells", "Foam Roller", "Blood Pressure Monitor"],
    "kids": ["Action Figure", "Board Game", "Building Blocks", "Stroller", "Diapers", "Plush Toy", "Puzzle"],
    "grocery": ["Coffee Beans", "Olive Oil", "Pasta", "Chocolate", "Tea", "Honey", "Almonds", "Cereal"],
    "specialized": ["Tent", "Bike Helmet", "Dog Food", "Car Wash Kit", "Dash Cam", "Fishing Rod", "Drill", "Guitar"],
    "digital": ["Software", "Course Bundle", "Subscription", "eBook", "App License", "Template Pack", "Antivirus"]
}

badges = ["", "", "", "New", "Hot", "Sale", "Best Seller", "Popular", "Premium", "Trending", "Deal"]

def generate_products():
    products = []
    pid_counter = 1
    
    for cat in categories:
        cat_id = cat["id"]
        for i in range(55): # 55 products per category
            brand = random.choice(brands[cat_id])
            adj = random.choice(adjectives)
            noun = random.choice(nouns[cat_id])
            
            # Additional details to make it realistic
            version = str(random.randint(1, 9))
            model_char = random.choice(['X', 'Pro', 'Max', 'Plus', 'Eco', 'Lite', 'Series ' + str(random.randint(1,7))])
            
            title = f"{brand} {adj} {noun} {model_char}"
            if cat_id == "fashion":
                title = f"{brand} {adj} {noun}"
            elif cat_id == "grocery":
                title = f"{adj} {brand} {noun} {random.choice(['Pack', 'Bundle', '1kg', '500g', 'Family Size'])}"
                
            original_price = round(random.uniform(10.0, 1500.0), 2)
            if cat_id in ["grocery", "beauty", "kids"]:
                original_price = round(random.uniform(5.0, 100.0), 2)
                
            discount_pct = random.choice([0, 0, 0, 10, 15, 20, 30, 50])
            price = round(original_price * (1 - discount_pct/100.0), 2)
            if price == original_price:
                price = original_price - 0.01 # ensure x.99 aesthetic sometimes
            
            # Give a high-rating bias
            rating = round(random.uniform(4.0, 5.0), 1)
            reviews = random.randint(50, 150000)
            
            badge = random.choice(badges)
            subCat = random.choice(cat["subCategories"])
            
            # Simple placeholder image based on category via Picsum
            image = f"https://picsum.photos/seed/{pid_counter * 10}/400/400"
            
            p = {
                "id": f"{cat_id[0]}{pid_counter}",
                "title": title,
                "category": cat_id,
                "subCategory": subCat,
                "price": price,
                "originalPrice": original_price,
                "rating": rating,
                "reviews": reviews,
                "image": image,
                "badge": badge
            }
            products.append(p)
            pid_counter += 1
            
    return products

products = generate_products()
products_json_str = json.dumps(products, indent=4)

frontend_path = r"e:\New folder (2)\frontend\script.js"
backend_path = r"e:\New folder (2)\backend\routes\products.js"

# Write Frontend
with open(frontend_path, "r", encoding="utf-8") as f:
    f_content = f.read()

# Replace `const PRODUCTS = [...];`
f_pattern = re.compile(r"const PRODUCTS = \[\s*//(.*?)\n\];", re.DOTALL)
# It might match differently depending on comments, let's broadly match the array and everything inside until the semicolon
f_pattern2 = re.compile(r"const PRODUCTS = \[[\s\S]*?\];", re.MULTILINE)

f_content_new = f_pattern2.sub("const PRODUCTS = " + products_json_str + ";", f_content)

with open(frontend_path, "w", encoding="utf-8") as f:
    f.write(f_content_new)
print(f"Updated {frontend_path}")

# Write Backend
with open(backend_path, "r", encoding="utf-8") as f:
    b_content = f.read()

b_pattern = re.compile(r"const DUMMY_PRODUCTS = \[[\s\S]*?\];", re.MULTILINE)
b_json_str = products_json_str.replace('"id":', '"_id":')
b_content_new = b_pattern.sub("const DUMMY_PRODUCTS = " + b_json_str + ";", b_content)

with open(backend_path, "w", encoding="utf-8") as f:
    f.write(b_content_new)
print(f"Updated {backend_path}")
print(f"Generated {len(products)} products total.")
