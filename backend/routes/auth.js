const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'megamart_secret_key';

// ─── POST /api/auth/register ─────────────────────────────────────────────────
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(400).json({ msg: 'Please fill all fields' });

    if (password.length < 6)
        return res.status(400).json({ msg: 'Password must be at least 6 characters' });

    try {
        // Fallback mode (no DB)
        if (mongoose.connection.readyState !== 1) {
            const token = jwt.sign({ user: { id: 'demo_' + Date.now() } }, JWT_SECRET, { expiresIn: '7d' });
            return res.json({ token, user: { id: 'demo_1', username, email, isAdmin: false } });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'Email already registered' });

        user = new User({ username, email, password });
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin } });

    } catch (err) {
        console.error('Register error:', err.message);
        res.status(500).json({ msg: 'Server error during registration' });
    }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ msg: 'Please fill all fields' });

    try {
        // Fallback mode (no DB)  — any credentials work in demo mode
        if (mongoose.connection.readyState !== 1) {
            const token = jwt.sign({ user: { id: 'demo_user' } }, JWT_SECRET, { expiresIn: '7d' });
            return res.json({ token, user: { id: 'demo_user', username: 'Demo User', email, isAdmin: false } });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

        const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin } });

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ msg: 'Server error during login' });
    }
});

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
router.get('/me', authMiddleware, async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ id: req.user.id, username: 'Demo User', email: 'demo@megamart.com', isAdmin: false });
        }
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// ─── PUT /api/auth/wishlist ───────────────────────────────────────────────────
router.put('/wishlist', authMiddleware, async (req, res) => {
    const { productId } = req.body;
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ msg: 'Wishlist updated (demo mode)' });
        }
        const user = await User.findById(req.user.id);
        const idx = user.wishlist.indexOf(productId);
        if (idx > -1) {
            user.wishlist.splice(idx, 1);   // remove if already in list
        } else {
            user.wishlist.push(productId);  // add to list
        }
        await user.save();
        res.json({ wishlist: user.wishlist });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
