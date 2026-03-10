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

    const PRODUCTS = generateCatalog();


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
                        <img src="${p.image}" class="product-image" alt="${p.title}" onerror="this.src='https://picsum.photos/seed/${pId}/400/400'">
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


    // ────────────────────────────────────────────────────────
    //  AMAZON-STYLE PRODUCT DETAIL PAGE
    // ────────────────────────────────────────────────────────
    window.openProduct = (productId) => {
        const p = window.PRODUCTS.find(item => String(getId(item)) === String(productId));
        if (!p) return;

        const discount = getDiscount(p.price, p.originalPrice);
        let stars = '';
        for (let i = 1; i <= 5; i++) stars += (i <= Math.floor(p.rating) ? '★' : (i - p.rating < 1 ? '⯨' : '☆'));

        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 2);
        const deliveryStr = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

        const related = window.PRODUCTS.filter(x => x.category === p.category && getId(x) !== getId(p)).slice(0, 8);
        const relatedHTML = related.map(r => `
            <div class="pdp-related-card" onclick="openProduct('${getId(r)}')">
                <img src="${r.image}" alt="${r.title}" onerror="this.src='https://via.placeholder.com/160'">
                <div class="pdp-related-title">${r.title.slice(0, 45)}...</div>
                <div style="color:#f90;font-size:12px;">★★★★☆</div>
                <div style="color:#B12704;font-weight:700;font-size:13px;">$${r.price.toFixed(2)}</div>
            </div>`).join('');

        const bars = [
            { label: '5 star', pct: Math.min(90, Math.round(p.rating * 14)) },
            { label: '4 star', pct: Math.min(60, Math.round(p.rating * 9)) },
            { label: '3 star', pct: 8 },
            { label: '2 star', pct: 4 },
            { label: '1 star', pct: 3 }
        ];
        const barsHTML = bars.map(b => `
            <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#007185;margin-bottom:4px;">
                <span style="min-width:40px;white-space:nowrap;">${b.label}</span>
                <div style="flex:1;background:#e8e8e8;border-radius:3px;height:10px;overflow:hidden;">
                    <div style="width:${b.pct}%;background:#f90;height:10px;"></div>
                </div>
                <span style="min-width:30px;text-align:right;">${b.pct}%</span>
            </div>`).join('');

        const bullets = [
            `Premium ${p.category} – ${p.subCategory || p.category} product with market-leading quality`,
            `Rated <b>${p.rating}/5</b> by <b>${p.reviews.toLocaleString()}</b> verified global customers`,
            `Get it by <b>${deliveryStr}</b> with FREE Prime delivery on eligible orders`,
            `30-day hassle-free returns · full manufacturer warranty included`,
            `Secure checkout: COD · Card · JazzCash · Easypaisa all accepted`
        ];

        const sampleReviews = [
            { name: 'Sarah M.', stars: '★★★★★', date: 'March 2, 2025', verified: true, text: 'Absolutely love this! Exceeded my expectations in every way. Fast delivery and great packaging too.' },
            { name: 'Ahmed K.', stars: '★★★★☆', date: 'Feb 18, 2025', verified: true, text: 'Very good quality. Exactly as described. Would definitely recommend to friends and family.' },
            { name: 'Jessica L.', stars: '★★★★★', date: 'Jan 30, 2025', verified: false, text: 'Best purchase I made this year. The quality is incredible for the price. Will definitely buy again!' }
        ];

        // Remove any existing PDP
        const existing = document.getElementById('pdp-overlay');
        if (existing) existing.remove();

        const pdpDiv = document.createElement('div');
        pdpDiv.id = 'pdp-overlay';
        pdpDiv.className = 'pdp-page';
        pdpDiv.innerHTML = `
            <!-- Sticky topbar -->
            <div class="pdp-topbar">
                <button class="pdp-back-btn" onclick="closePDP()">&#8592; Back</button>
                <span class="pdp-topbar-title">${p.title.slice(0, 60)}${p.title.length > 60 ? '…' : ''}</span>
                <button class="pdp-topbar-cart" onclick="addToCart('${getId(p)}');showToast('Added to cart 🛒')">Add to Cart</button>
            </div>

            <div class="pdp-body">
                <!-- Breadcrumb -->
                <nav class="pdp-breadcrumb">
                    <span onclick="closePDP()" style="cursor:pointer;color:#007185;">Home</span>
                    <span class="pdp-bc-sep">›</span>
                    <span onclick="closePDP();showCategoryView('${p.category}','${p.category}')" style="cursor:pointer;color:#007185;">${(p.category || '').charAt(0).toUpperCase() + (p.category || '').slice(1)}</span>
                    <span class="pdp-bc-sep">›</span>
                    <span style="color:#555;">${p.title.slice(0, 40)}…</span>
                </nav>

                <!-- Main 3-column -->
                <div class="pdp-main">

                    <!-- LEFT: Image gallery -->
                    <div class="pdp-gallery">
                        <div class="pdp-thumbs">
                            ${[p.image, p.image, p.image, p.image].map((img, i) => `
                                <img class="pdp-thumb${i === 0 ? ' active' : ''}" src="${img}"
                                     onclick="document.getElementById('pdp-main-img').src='${img}';
                                              document.querySelectorAll('.pdp-thumb').forEach(t=>t.classList.remove('active'));
                                              this.classList.add('active');">
                            `).join('')}
                        </div>
                        <div class="pdp-main-image-wrap">
                            <img id="pdp-main-img" src="${p.image}" class="pdp-main-img" alt="${p.title}">
                            ${discount > 0 ? `<div class="pdp-img-badge">-${discount}%</div>` : ''}
                        </div>
                    </div>

                    <!-- MIDDLE: Product info -->
                    <div class="pdp-info">
                        ${p.badge ? `<span class="pdp-label-badge">${p.badge}</span>` : ''}
                        <h1 class="pdp-title">${p.title}</h1>

                        <div class="pdp-rating-row">
                            <span class="pdp-stars">${stars}</span>
                            <a class="pdp-rating-link">${p.rating} out of 5</a>
                            <span style="color:#ddd;">|</span>
                            <a class="pdp-rating-link">${p.reviews.toLocaleString()} ratings</a>
                        </div>

                        <div class="pdp-divider"></div>

                        <!-- Price -->
                        <div class="pdp-price-block">
                            ${discount > 0 ? `<div class="pdp-list-price">List Price: <span>$${p.originalPrice.toFixed(2)}</span></div>` : ''}
                            <div class="pdp-price-main">
                                <sup class="pdp-price-sup">$</sup><span class="pdp-price-int">${Math.floor(p.price)}</span><sup class="pdp-price-dec">${(p.price % 1).toFixed(2).slice(1)}</sup>
                            </div>
                            ${discount > 0 ? `<div class="pdp-save-tag">You Save: <b style="color:#CC0C39;">$${(p.originalPrice - p.price).toFixed(2)} (${discount}%)</b></div>` : ''}
                        </div>

                        <!-- Prime -->
                        <div class="pdp-prime-row">
                            <span class="pdp-prime">prime</span>
                            <span class="pdp-prime-text">FREE Returns &amp; FREE Delivery</span>
                        </div>

                        <!-- Delivery -->
                        <div class="pdp-delivery-box">
                            <div><b>FREE delivery</b> <span style="color:#007600;">${deliveryStr}</span>
                            &nbsp;· &nbsp;<span style="color:#CC0C39;font-weight:600;" id="pdp-countdown">12 hrs 34 mins</span></div>
                            <div style="font-size:12px;color:#565959;margin-top:4px;">📍 Deliver to your location</div>
                        </div>

                        <div style="color:#007600;font-size:16px;font-weight:500;margin:10px 0;">In Stock</div>

                        <!-- Qty + Actions -->
                        <div class="pdp-qty-row">
                            <label>Qty:</label>
                            <select class="pdp-qty-select">
                                ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `<option>${n}</option>`).join('')}
                            </select>
                        </div>

                        <div class="pdp-action-btns">
                            <button class="pdp-cart-btn" onclick="addToCart('${getId(p)}');showToast('Added to cart! 🛒')">Add to Cart</button>
                            <button class="pdp-buy-btn" onclick="addToCart('${getId(p)}');closePDP();proceedToCheckout()">Buy Now</button>
                        </div>

                        <!-- Meta table -->
                        <div class="pdp-meta-table">
                            <div class="pdp-meta-row"><span>Ships from</span><span>MegaMart</span></div>
                            <div class="pdp-meta-row"><span>Sold by</span><span style="color:#007185;">MegaMart Official</span></div>
                            <div class="pdp-meta-row"><span>Returns</span><span>30-day easy returns</span></div>
                            <div class="pdp-meta-row"><span>Payment</span><span>🔒 Secure transaction</span></div>
                        </div>

                        <button class="pdp-wishlist-btn" onclick="addToWishlist('${getId(p)}',event)">♡ Add to Wish List</button>
                    </div>

                    <!-- RIGHT: Buy box -->
                    <div class="pdp-buybox">
                        <div class="pdp-buybox-price">$${p.price.toFixed(2)}</div>
                        <div class="pdp-prime-row" style="margin:6px 0 4px;">
                            <span class="pdp-prime" style="font-size:11px;">prime</span>
                            <span style="font-size:12px;color:#0f1111;">FREE Delivery</span>
                        </div>
                        <div style="font-size:12px;color:#007600;margin-bottom:10px;">Get it by <b>${deliveryStr}</b></div>
                        <div style="color:#007600;font-size:13px;font-weight:600;margin-bottom:10px;">In Stock</div>
                        <div style="margin-bottom:10px;">
                            <select class="pdp-qty-select" style="width:100%;font-size:12px;">
                                ${[1, 2, 3, 4, 5].map(n => `<option>Qty: ${n}</option>`).join('')}
                            </select>
                        </div>
                        <button class="pdp-cart-btn" style="width:100%;margin-bottom:8px;font-size:13px;" onclick="addToCart('${getId(p)}');showToast('Added! 🛒')">Add to Cart</button>
                        <button class="pdp-buy-btn" style="width:100%;margin-bottom:12px;font-size:13px;" onclick="addToCart('${getId(p)}');closePDP();proceedToCheckout()">Buy Now</button>
                        <div style="font-size:11px;text-align:center;color:#565959;margin-bottom:10px;">🔒 Secure transaction</div>
                        <div class="pdp-meta-table" style="font-size:11px;">
                            <div class="pdp-meta-row"><span>Ships from</span><span>MegaMart</span></div>
                            <div class="pdp-meta-row"><span>Sold by</span><span style="color:#007185;">MegaMart</span></div>
                            <div class="pdp-meta-row"><span>Returns</span><span>30-day</span></div>
                        </div>
                        <button class="pdp-wishlist-btn" style="width:100%;margin-top:10px;font-size:12px;" onclick="addToWishlist('${getId(p)}',event)">♡ Add to Wish List</button>
                    </div>
                </div>

                <!-- About this item -->
                <div class="pdp-section">
                    <h2 class="pdp-section-h">About this item</h2>
                    <ul class="pdp-bullets">
                        ${bullets.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                </div>

                <!-- Description -->
                <div class="pdp-section">
                    <h2 class="pdp-section-h">Product Description</h2>
                    <div class="pdp-desc-body">
                        <p>Experience the pinnacle of quality with the <strong>${p.title}</strong>. Engineered for performance and built to last, this product combines innovation with everyday usability.</p>
                        <p>Backed by <strong>${p.reviews.toLocaleString()}</strong> verified reviews and a stellar <strong>${p.rating}-star</strong> rating, it's the choice of thousands of satisfied customers worldwide.</p>
                        <p>Order today and enjoy fast, free Prime delivery, 30-day hassle-free returns, and full after-sale support from MegaMart's dedicated customer care team.</p>
                    </div>
                </div>

                <!-- Reviews -->
                <div class="pdp-section">
                    <h2 class="pdp-section-h">Customer reviews</h2>
                    <div class="pdp-reviews-layout">
                        <div class="pdp-rating-summary">
                            <div class="pdp-big-rating">${p.rating}<span style="font-size:20px;">/5</span></div>
                            <div style="color:#f90;font-size:20px;margin:4px 0;">${stars}</div>
                            <div style="font-size:12px;color:#565959;">${p.reviews.toLocaleString()} global ratings</div>
                            <div style="margin-top:16px;">${barsHTML}</div>
                        </div>
                        <div class="pdp-review-cards">
                            ${sampleReviews.map(r => `
                                <div class="pdp-review-card">
                                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                                        <div class="pdp-avatar">${r.name[0]}</div>
                                        <div>
                                            <div style="font-weight:700;font-size:13px;">${r.name}</div>
                                            ${r.verified ? `<div style="font-size:11px;color:#c45500;">✓ Verified Purchase</div>` : ''}
                                        </div>
                                    </div>
                                    <div style="color:#f90;font-size:14px;margin-bottom:2px;">${r.stars}</div>
                                    <div style="font-size:11px;color:#767676;margin-bottom:6px;">${r.date}</div>
                                    <p style="font-size:13px;color:#0f1111;line-height:1.6;">${r.text}</p>
                                    <div style="font-size:12px;color:#565959;margin-top:8px;">Helpful? <a href="#" onclick="return false;" style="color:#007185;">Yes (${Math.floor(Math.random() * 30) + 5})</a></div>
                                </div>`).join('')}
                        </div>
                    </div>
                </div>

                <!-- Related products -->
                ${related.length > 0 ? `
                <div class="pdp-section">
                    <h2 class="pdp-section-h">Customers also viewed</h2>
                    <div class="pdp-related-scroll">${relatedHTML}</div>
                </div>` : ''}

            </div><!-- end pdp-body -->
        `;

        document.body.appendChild(pdpDiv);
        window.scrollTo(0, 0);
    };

    window.closePDP = () => {
        const el = document.getElementById('pdp-overlay');
        if (el) el.remove();
        window.scrollTo(0, 0);
    };

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

    window.showCategoryView = (categoryId, categoryLabel, searchQuery = '') => {
        const homeView = document.getElementById('home-view');
        const catView = document.getElementById('category-view');
        const grid = document.getElementById('category-products-grid');
        const resultsText = document.getElementById('category-results-text');
        const sidebarActive = document.querySelector('.filter-list li.active');

        // Filter products
        const filtered = window.PRODUCTS.filter(p => {
            const matchesCat = (categoryId === 'all' || p.category === categoryId);
            if (!searchQuery) return matchesCat;
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.subCategory && p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCat && matchesSearch;
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
                        <div class="cat-card-delivery">
                            Get it by <b>${deliveryStr}</b><br>
                            <span class="cat-card-delivery-prime">✓ prime</span>
                        </div>
                        <button class="btn-add-cart-small" onclick="addToCart('${pId}')">Add to Cart</button>
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
    document.querySelectorAll('.cat-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const catId = btn.getAttribute('data-cat');
            const catName = btn.textContent.trim();
            showCategoryView(catId, catName);
        });
    });

    // Hook up homepage amazon cards to categories
    document.querySelectorAll('.cat-card-clickable').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const catId = card.getAttribute('data-cat');
            const catName = card.querySelector('.a-card-title').textContent.trim();
            showCategoryView(catId, catName);
        });
    });

    // Hook up the Search bar and button
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');
    const searchDropdown = document.querySelector('.search-dropdown');

    const handleSearch = () => {
        const catId = searchDropdown ? searchDropdown.value : 'all';
        let catName = searchDropdown && searchDropdown.options.length > 0
            ? searchDropdown.options[searchDropdown.selectedIndex].text
            : 'Search Results';

        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

        // If there's a specific search query, let's treat it as an "all" search for the keyword, 
        // or a filtered search within the selected category.
        if (query) {
            catName = `Search: "${query}"`;
            showCategoryView(catId, catName, query);
        } else {
            showCategoryView(catId, catName);
        }
    };

    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    window.showToast = (msg) => {
        const container = document.getElementById("toast-container");
        if (!container) return;
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = "✓ " + msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

});
