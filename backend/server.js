const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to MongoDB (only if URI is available and valid)
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI && !MONGO_URI.includes('127.0.0.1') && !MONGO_URI.includes('localhost')) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('✅ MongoDB Atlas Connected!'))
        .catch(err => console.error('❌ MongoDB Connection Error:', err.message));
} else {
    console.log('⚠️  No valid MONGO_URI. Running in dummy data mode (fully functional).');
}

// Health Check Route
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: '🛍️ MegaMart API is running!',
        routes: ['/api/products', '/api/auth/register', '/api/auth/login']
    });
});

// Register Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/products', require('./routes/products.js'));
app.use('/api/payment', require('./routes/payment.js'));

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server.' });
});

// Export for Vercel serverless
module.exports = app;

// Start server locally
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

