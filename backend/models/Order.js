const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
});

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false   // allow guest orders
    },
    guestName: { type: String, default: 'Guest' },
    guestEmail: { type: String, default: '' },
    items: [OrderItemSchema],
    totalPrice: { type: Number, required: true },
    paymentMethod: {
        type: String,
        enum: ['cod', 'stripe', 'jazzcash', 'easypaisa'],
        default: 'cod'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', 'delivered', 'cancelled'],
        default: 'processing'
    },
    shippingAddress: {
        fullName: String,
        address: String,
        city: String,
        phone: String
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
