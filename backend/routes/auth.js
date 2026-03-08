const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User'); // MongoDB Model

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Simple validation
    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Mock fallback if DB is not connected
        if (mongoose.connection.readyState !== 1) {
            const token = jwt.sign({ user: { id: "mock_id_123" } }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1h' });
            return res.json({ token, user: { id: "mock_id_123", username, email } });
        }

        // Check for existing user in MongoDB
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Create JWT
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/auth/login
// @desc    Login user & get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Mock fallback if DB is not connected
        if (mongoose.connection.readyState !== 1) {
            const token = jwt.sign({ user: { id: "mock_user_1" } }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1h' });
            return res.json({ token, user: { id: "mock_user_1", username: "Demo User", email } });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret123', { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
