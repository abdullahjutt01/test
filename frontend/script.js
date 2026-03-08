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

    let cartCount = 0;

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
                    <div class="product-image-container">
                        <img src="${p.image}" class="product-image" alt="${p.title}">
                        ${badgeHTML}
                        ${discountHTML}
                        <button class="wishlist-btn" onclick="showToast('Added to wishlist ♥')">🤍</button>
                    </div>
                    <div class="product-info">
                        <div class="product-cat">${p.category}</div>
                        <div class="product-title">${p.title}</div>
                        <div class="product-rating">
                            <span class="stars">${stars}</span>
                            <span>(${p.reviews})</span>
                        </div>
                        <div class="product-price-row">
                            <span class="price-current">${formatPrice(p.price)}</span>
                            ${oldPriceHTML}
                        </div>
                        <button class="btn btn-primary btn-add-cart" onclick="addToCart()">🛒 Add to Cart</button>
                    </div>
                </div>
            `;
        });
    }

    renderProducts("featured-products", PRODUCTS.slice(0, 4));
    renderProducts("best-sellers", PRODUCTS.slice(4, 8));


    // Global Functions for buttons
    window.addToCart = () => {
        cartCount++;
        document.getElementById("cart-count").innerText = cartCount;
        showToast("Product added to cart! 🛒");
    }

    window.showToast = (msg) => {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = "✓ " + msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    window.openAuthModal = () => {
        document.getElementById("auth-modal").classList.add("active");
    }
    window.closeAuthModal = () => {
        document.getElementById("auth-modal").classList.remove("active");
    }

});
