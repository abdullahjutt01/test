// seller.js - Dashboard functionality

document.addEventListener("DOMContentLoaded", () => {
    // Basic Tab Switching
    const tabs = document.querySelectorAll('.menu-item');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const target = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById('tab-' + target).classList.add('active');
        });
    });

    // Backend fetching logic mapped to /api endpoints
    const renderSellerProducts = () => {
        const tbody = document.getElementById('seller-products-list');
        if (!tbody) return;

        fetch('/api/products')
            .then(res => res.json())
            .then(products => {
                const safeProds = Array.isArray(products) ? products.slice(0, 15) : window.PRODUCTS?.slice(0, 15) || [];
                document.getElementById('total-product-count').innerText = safeProds.length;
                tbody.innerHTML = safeProds.map(p => `
                    <tr>
                        <td><img src="${p.image}" style="width:50px; height:50px; border-radius:6px; object-fit:cover;"></td>
                        <td style="font-weight:700;">${p.title.slice(0, 30)}...</td>
                        <td style="text-transform:capitalize;">${p.category}</td>
                        <td style="color:#B12704; font-weight:700;">$${p.price.toFixed(2)}</td>
                        <td><span class="status-badge ${Math.random() > 0.2 ? 'status-delivered' : 'status-cancelled'}">
                            ${Math.floor(Math.random() * 100) + 10} in stock
                        </span></td>
                        <td>
                            <button class="action-btn">✏️ Edit</button>
                            <button class="action-btn delete" onclick="this.closest('tr').remove()">🗑️</button>
                        </td>
                    </tr>
                `).join('');
            }).catch(e => console.error("Could not load products"));
    };

    const renderOrders = () => {
        const fetchOrders = () => {
            fetch('/api/orders/my')
                .then(res => res.json())
                .then(orders => {
                    const tbodyOptions = [document.getElementById('recent-orders-list'), document.getElementById('all-orders-list')];

                    // Simple mock display if no user orders exist locally yet
                    const mockOrders = [
                        { id: 'ORD-' + Math.floor(Math.random() * 90000), date: new Date().toLocaleDateString(), customer: 'Sarah Jenkins', total: 145.99, status: 'shipped', payment: 'Stripe' },
                        { id: 'ORD-' + Math.floor(Math.random() * 90000), date: new Date().toLocaleDateString(), customer: 'Muhammad Ali', total: 890.00, status: 'processing', payment: 'COD' },
                        { id: 'ORD-' + Math.floor(Math.random() * 90000), date: new Date().toLocaleDateString(), customer: 'Ayesha Khan', total: 45.50, status: 'delivered', payment: 'JazzCash' },
                        { id: 'ORD-' + Math.floor(Math.random() * 90000), date: new Date().toLocaleDateString(), customer: 'John Doe', total: 299.99, status: 'cancelled', payment: 'Easypaisa' }
                    ];

                    const displayData = (orders.length > 0 && Array.isArray(orders)) ? orders : mockOrders;

                    tbodyOptions.forEach(tbody => {
                        if (!tbody) return;
                        tbody.innerHTML = displayData.map(o => `
                            <tr>
                                <td style="font-weight:700; color:#0f1111;">${o.id || o._id}</td>
                                <td>${o.customer || o.guestName || 'Guest'}</td>
                                <td>${o.date || new Date().toLocaleDateString()}</td>
                                <td style="font-weight:700; color:#B12704;">$${(o.total || o.totalPrice).toFixed(2)}</td>
                                ${tbody.id === 'all-orders-list' ? `<td style="font-transform:uppercase;">${o.payment || o.paymentMethod}</td>` : ''}
                                <td><span class="status-badge status-${o.status || o.orderStatus}">${(o.status || o.orderStatus).toUpperCase()}</span></td>
                                ${tbody.id === 'all-orders-list' ? `
                                <td>
                                    <button class="action-btn">View</button>
                                </td>` : ''}
                            </tr>
                        `).join('');
                    });
                });
        };
        fetchOrders();
    };

    renderSellerProducts();
    renderOrders();

    // Modal forms
    window.openAddProductModal = () => {
        document.getElementById('add-product-modal').classList.add('active');
    };

    window.closeModal = (id) => {
        document.getElementById(id).classList.remove('active');
    };

    document.getElementById('add-product-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const payload = {
            title: document.getElementById('prod-title').value,
            price: parseFloat(document.getElementById('prod-price').value),
            category: document.getElementById('prod-cat').value,
            image: document.getElementById('prod-image').value,
            description: document.getElementById('prod-desc').value,
            rating: 5.0,
            reviews: 0
        };

        fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(() => {
                alert("Product added successfully!");
                renderSellerProducts();
                closeModal('add-product-modal');
                e.target.reset();
            })
            .catch(err => {
                alert("Failed to save product in demo mode. Make sure Vercel DB is connected.");
            });
    });

});
