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
        // Electronics
        { id: "1", title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones", category: "electronics", price: 349.99, originalPrice: 449.99, rating: 4.8, reviews: 2847, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", badge: "Best Seller" },
        { id: "2", title: "Apple iPhone 15 Pro Max 256GB - Titanium", category: "electronics", price: 1199.99, originalPrice: 1299.99, rating: 4.9, reviews: 5621, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", badge: "Hot" },
        { id: "3", title: "Apple MacBook Pro 14-inch M3", category: "electronics", price: 1599.00, originalPrice: 1599.00, rating: 4.9, reviews: 1045, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", badge: "" },
        { id: "4", title: "Samsung 4K QLED Smart TV 55\"", category: "electronics", price: 799.99, originalPrice: 999.99, rating: 4.7, reviews: 892, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", badge: "Deal" },
        { id: "5", title: "Nintendo Switch OLED Model", category: "electronics", price: 349.99, originalPrice: 349.99, rating: 4.8, reviews: 14200, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop", badge: "Popular" },

        // Fashion
        { id: "6", title: "Levi's 501 Original Fit Men's Jeans", category: "fashion", price: 79.99, originalPrice: 99.99, rating: 4.5, reviews: 3412, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", badge: "Classic" },
        { id: "7", title: "Ray-Ban Classic Aviator Sunglasses", category: "fashion", price: 160.00, originalPrice: 160.00, rating: 4.7, reviews: 2984, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop", badge: "" },
        { id: "8", title: "Men's Premium Cotton Oxford Shirt", category: "fashion", price: 45.00, originalPrice: 55.00, rating: 4.4, reviews: 846, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop", badge: "New" },

        // Sports
        { id: "9", title: "Nike Air Max 270 Running Shoes", category: "sports", price: 129.99, originalPrice: 159.99, rating: 4.6, reviews: 1203, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", badge: "Sale" },
        { id: "10", title: "Adidas Ultraboost 23 Sneakers", category: "sports", price: 189.99, originalPrice: 220.00, rating: 4.6, reviews: 967, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop", badge: "" },
        { id: "11", title: "Manduka PRO Yoga Mat", category: "sports", price: 129.00, originalPrice: 129.00, rating: 4.8, reviews: 3200, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", badge: "" },

        // Home
        { id: "12", title: "Dyson V15 Detect Cordless Vacuum", category: "home", price: 649.99, originalPrice: 749.99, rating: 4.8, reviews: 1547, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", badge: "Top Pick" },
        { id: "13", title: "Nespresso Vertuo Plus Coffee Maker", category: "home", price: 199.99, originalPrice: 219.99, rating: 4.7, reviews: 4519, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop", badge: "" },
        { id: "14", title: "Luxury Egyptian Cotton Bed Sheets Set", category: "home", price: 115.00, originalPrice: 145.00, rating: 4.6, reviews: 890, image: "https://images.unsplash.com/photo-1522771731535-64906f230dae?w=400&h=400&fit=crop", badge: "Comfort" },

        // Beauty
        { id: "15", title: "Charlotte Tilbury Magic Cream 50ml", category: "beauty", price: 105.00, originalPrice: 105.00, rating: 4.7, reviews: 4231, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop", badge: "Luxury" },
        { id: "16", title: "CeraVe Moisturizing Cream", category: "beauty", price: 19.99, originalPrice: 19.99, rating: 4.8, reviews: 85000, image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400&h=400&fit=crop", badge: "Best Seller" },

        // Books
        { id: "17", title: "Atomic Habits by James Clear", category: "books", price: 11.98, originalPrice: 27.00, rating: 4.9, reviews: 105000, image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop", badge: "Must Read" },
        { id: "18", title: "The Psychology of Money", category: "books", price: 13.40, originalPrice: 18.99, rating: 4.7, reviews: 54000, image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop", badge: "" },

        // Toys
        { id: "19", title: "LEGO Star Wars Millennium Falcon", category: "toys", price: 159.99, originalPrice: 169.99, rating: 4.9, reviews: 4200, image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&h=400&fit=crop", badge: "" },

        // Grocery
        { id: "20", title: "Lavazza Super Crema Whole Bean Coffee Blend", category: "grocery", price: 22.50, originalPrice: 25.00, rating: 4.6, reviews: 29000, image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&h=400&fit=crop", badge: "" },
        { id: "21", title: "Premium Extra Virgin Olive Oil 1L", category: "grocery", price: 18.99, originalPrice: 24.99, rating: 4.8, reviews: 3400, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop", badge: "Organic" }
    ];

    let cart = [];
    let wishlist = [];
    window.PRODUCTS = [...PRODUCTS];

    // Helper to get ID (handles both hardcoded 'id' and MongoDB '_id')
    const getId = (product) => product._id || product.id;

    // Render Categories
    const catGrid = document.getElementById("categories-grid");
    CATEGORIES.forEach(c => {
        catGrid.innerHTML += `
            <div class="category-card" onmouseover="this.style.borderColor='${c.color}'" onmouseout="this.style.borderColor='transparent'">
                <div class="category-icon">${c.icon}</div>
                <div class="category-label">${c.label}</div>
            </div>
        `;
    });

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
                <div style="display: flex; gap: 15px; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                    <img src="${p.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" />
                    <div style="flex: 1;">
                        <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">${p.title}</div>
                        <div style="color: #6366f1; font-weight: 800;">${formatPrice(p.price)}</div>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background: #fee2e2; color: #ef4444; border: none; width: 30px; height: 30px; border-radius: 6px; cursor: pointer;">🗑️</button>
                </div>
                `;
            }).join('');
        }

        document.getElementById("cart-modal-count").innerText = cart.length;
        document.getElementById("cart-total").innerText = total.toFixed(2);
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
        openWishlistModal(); // re-render
        showToast("Removed from wishlist");
    }

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
