document.addEventListener("DOMContentLoaded", () => {

    const CATEGORIES = [
        { id: "electronics", label: "Electronics", icon: "💻", color: "#6366f1" },
        { id: "fashion", label: "Fashion", icon: "👗", color: "#ec4899" },
        { id: "beauty", label: "Beauty", icon: "💄", color: "#f59e0b" },
        { id: "home", label: "Home & Living", icon: "🏠", color: "#10b981" },
        { id: "sports", label: "Sports", icon: "⚽", color: "#3b82f6" },
        { id: "books", label: "Books", icon: "📚", color: "#8b5cf6" },
        { id: "toys", label: "Toys", icon: "🧸", color: "#f97316" },
        { id: "grocery", label: "Grocery", icon: "🛒", color: "#14b8a6" }
    ];

    const PRODUCTS = [
        { id: 1, title: "Sony WH-1000XM5 Wireless Headphones", category: "electronics", price: 349.99, originalPrice: 449.99, rating: 4.8, reviews: 2847, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", badge: "Best Seller" },
        { id: 2, title: "Apple iPhone 15 Pro Max 256GB", category: "electronics", price: 1199.99, originalPrice: 1299.99, rating: 4.9, reviews: 5621, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", badge: "Hot" },
        { id: 3, title: "Nike Air Max 270 Running Shoes", category: "sports", price: 129.99, originalPrice: 159.99, rating: 4.6, reviews: 1203, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", badge: "Sale" },
        { id: 4, title: "Samsung 4K QLED Smart TV 55\"", category: "electronics", price: 799.99, originalPrice: 999.99, rating: 4.7, reviews: 892, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", badge: "Deal" },
        { id: 5, title: "Levi's 501 Original Fit Jeans", category: "fashion", price: 79.99, originalPrice: 99.99, rating: 4.5, reviews: 3412, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", badge: "Classic" },
        { id: 6, title: "Dyson V15 Detect Cordless Vacuum", category: "home", price: 649.99, originalPrice: 749.99, rating: 4.8, reviews: 1547, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", badge: "Top Pick" },
        { id: 7, title: "Charlotte Tilbury Magic Cream", category: "beauty", price: 105.00, originalPrice: 105.00, rating: 4.7, reviews: 4231, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop", badge: "Luxury" },
        { id: 11, title: "Adidas Ultraboost 23 Sneakers", category: "sports", price: 189.99, originalPrice: 220.00, rating: 4.6, reviews: 967, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop", badge: "New" }
    ];

    let cart = [];
    let wishlist = [];
    window.PRODUCTS = PRODUCTS;

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
        productsList.forEach(p => {
            const discount = getDiscount(p.price, p.originalPrice);
            const discountHTML = discount > 0 ? `<div class="product-discount">-${discount}%</div>` : '';
            const oldPriceHTML = discount > 0 ? `<span class="price-old">${formatPrice(p.originalPrice)}</span>` : '';
            const badgeHTML = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';

            // Generate stars
            let stars = '';
            for (let i = 1; i <= 5; i++) { stars += i <= Math.floor(p.rating) ? '★' : '☆'; }

            grid.innerHTML += `
                <div class="product-card">
                    <div class="product-image-container" style="cursor: pointer;" onclick="openProduct(${p.id})">
                        <img src="${p.image}" class="product-image" alt="${p.title}">
                        ${badgeHTML}
                        ${discountHTML}
                        <button class="wishlist-btn" onclick="addToWishlist(${p.id}, event)">🤍</button>
                    </div>
                    <div class="product-info">
                        <div class="product-cat">${p.category}</div>
                        <div class="product-title" style="cursor: pointer;" onclick="openProduct(${p.id})">${p.title}</div>
                        <div class="product-rating">
                            <span class="stars">${stars}</span>
                            <span>(${p.reviews})</span>
                        </div>
                        <div class="product-price-row">
                            <span class="price-current">${formatPrice(p.price)}</span>
                            ${oldPriceHTML}
                        </div>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart(${p.id})">🛒 Add to Cart</button>
                    </div>
                </div>
            `;
        });
    }

    renderProducts("featured-products", PRODUCTS.slice(0, 4));
    renderProducts("best-sellers", PRODUCTS.slice(4, 8));


    // Global Functions for buttons
    window.addToCart = (productId) => {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            document.getElementById("cart-count").innerText = cart.length;
            showToast("Product added to cart! 🛒");
        }
    }

    window.addToWishlist = (productId, event) => {
        event.stopPropagation();
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            const exists = wishlist.some(item => item.id === productId);
            if (!exists) {
                wishlist.push(product);
                showToast("Added to wishlist ♥");
            } else {
                showToast("Already in wishlist!");
            }
        }
    }

    window.openProduct = (productId) => {
        const p = PRODUCTS.find(item => item.id === productId);
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
                            <button class="btn btn-primary" style="flex: 1; padding: 15px; font-size: 16px; justify-content: center;" onclick="addToCart(${p.id}); closeModal('product-modal')">🛒 Add to Cart</button>
                            <button onclick="addToWishlist(${p.id}, event)" style="background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 10px; width: 50px; height: 50px; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s;">🤍</button>
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
                    <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="addToCart(${p.id}); removeFromWishlist(${index})">Move to Cart</button>
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
