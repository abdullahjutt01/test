const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Database
if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is missing from environment variables. Please add it to your Vercel Dashboard.');
} else {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('✅ MongoDB Database Connected!'))
        .catch(err => console.error('❌ MongoDB Connection Error:', err));
}

// Define Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/payment', require('./routes/payment.js'));
app.use('/api/products', require('./routes/products.js')); // New Product Route

// Basic Route
app.get('/', (req, res) => {
    res.send('Ecommerce API is running... Routes: /api/auth, /api/payment, /api/products');
});

// Export the app for Vercel Serverless environments
module.exports = app;

// Only start the server locally if this file is run directly
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}
