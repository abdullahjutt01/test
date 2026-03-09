const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');



// ─── POST /api/orders ─────────────────────────────────────────────────────────
// Place a new order (works for guests too)
router.post('/', async (req, res) => {
    const { items, totalPrice, paymentMethod, shippingAddress, guestName, guestEmail } = req.body;

    if (!items || items.length === 0)
        return res.status(400).json({ msg: 'Cart is empty' });

    if (!totalPrice || !shippingAddress?.fullName || !shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.phone)
        return res.status(400).json({ msg: 'Please fill all shipping details' });

    // Demo mode — no DB needed
    if (mongoose.connection.readyState !== 1) {
        return res.json({
            success: true,
            orderId: 'DEMO-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
            msg: 'Order placed successfully! (Demo mode)',
            items,
            totalPrice,
            paymentMethod: paymentMethod || 'cod',
            orderStatus: 'processing'
        });
    }

    try {
        // Get user from token if available
        let userId = null;
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            const jwt = require('jsonwebtoken');
            try { userId = jwt.verify(token, process.env.JWT_SECRET || 'megamart_secret_key').user.id; } catch { }
        }

        const order = new Order({
            user: userId,
            guestName: guestName || 'Guest',
            guestEmail: guestEmail || '',
            items,
            totalPrice,
            paymentMethod: paymentMethod || 'cod',
            shippingAddress
        });
        await order.save();

        res.json({
            success: true,
            orderId: order._id,
            msg: 'Order placed successfully!',
            orderStatus: order.orderStatus
        });

    } catch (err) {
        console.error('Order error:', err.message);
        res.status(500).json({ msg: 'Server error placing order' });
    }
});

// ─── GET /api/orders/my ───────────────────────────────────────────────────────
// Get logged-in user's past orders
router.get('/my', authMiddleware, async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json([]);
        }
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// ─── GET /api/orders/:id ──────────────────────────────────────────────────────
// Get a single order by ID
router.get('/:id', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ orderId: req.params.id, status: 'processing', msg: 'Demo order' });
        }
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
