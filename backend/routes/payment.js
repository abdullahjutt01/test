const express = require('express');
const router = express.Router();

// ─── POST /api/payment/cod ────────────────────────────────────────────────────
router.post('/cod', (req, res) => {
    const { orderId, totalPrice } = req.body;
    res.json({
        success: true,
        msg: 'Cash on Delivery order confirmed!',
        orderId: orderId || 'COD-' + Date.now(),
        totalPrice,
        paymentMethod: 'cod'
    });
});

// ─── POST /api/payment/stripe ─────────────────────────────────────────────────
router.post('/stripe', async (req, res) => {
    const { amount, currency = 'usd', description } = req.body;

    // Check if Stripe key is set
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
        // Demo mode — simulate a successful payment
        return res.json({
            success: true,
            msg: 'Stripe payment simulated (add real STRIPE_SECRET_KEY in Vercel env vars to enable)',
            paymentIntentId: 'pi_demo_' + Date.now(),
            amount,
            currency
        });
    }

    try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),   // convert to cents
            currency,
            description: description || 'MegaMart Order',
            automatic_payment_methods: { enabled: true }
        });
        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (err) {
        console.error('Stripe error:', err.message);
        res.status(500).json({ success: false, msg: err.message });
    }
});

// ─── POST /api/payment/jazzcash ───────────────────────────────────────────────
router.post('/jazzcash', (req, res) => {
    const { amount, orderId, phone } = req.body;

    if (!process.env.JAZZCASH_MERCHANT_ID || process.env.JAZZCASH_MERCHANT_ID.includes('placeholder')) {
        return res.json({
            success: true,
            msg: 'JazzCash payment simulated (add real JAZZCASH_MERCHANT_ID in Vercel env vars)',
            orderId: orderId || 'JC-' + Date.now(),
            amount
        });
    }

    // Real JazzCash integration requires HMAC-SHA256 hash and redirect
    // This is the pattern to follow once you have real credentials:
    const crypto = require('crypto');
    const pp_TxnRefNo = 'T' + Date.now();
    const pp_Amount = (amount * 100).toString();
    const pp_TxnDateTime = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
    const pp_TxnExpiryDateTime = new Date(Date.now() + 3600000).toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);

    const hashString = [
        process.env.JAZZCASH_PASSWORD,
        process.env.JAZZCASH_MERCHANT_ID,
        pp_TxnRefNo,
        pp_Amount,
        'PKR',
        pp_TxnDateTime,
        pp_TxnExpiryDateTime,
        phone || ''
    ].join('&');

    const hash = crypto.createHmac('sha256', process.env.JAZZCASH_PASSWORD).update(hashString).digest('hex');

    res.json({
        success: true,
        pp_TxnRefNo,
        pp_Amount,
        pp_SecureHash: hash,
        msg: 'JazzCash payload prepared'
    });
});

// ─── POST /api/payment/easypaisa ──────────────────────────────────────────────
router.post('/easypaisa', (req, res) => {
    const { amount, orderId } = req.body;

    if (!process.env.EASYPAISA_STORE_ID || process.env.EASYPAISA_STORE_ID.includes('placeholder')) {
        return res.json({
            success: true,
            msg: 'Easypaisa payment simulated (add real EASYPAISA_STORE_ID in Vercel env vars)',
            orderId: orderId || 'EP-' + Date.now(),
            amount
        });
    }

    res.json({
        success: true,
        storeId: process.env.EASYPAISA_STORE_ID,
        amount,
        orderId,
        msg: 'Easypaisa payment initiated'
    });
});

module.exports = router;
