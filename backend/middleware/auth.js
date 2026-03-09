const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'megamart_secret_key';

/**
 * Express middleware – verifies the Bearer JWT token in the Authorization header.
 * Attaches req.user = { id } on success.
 */
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token, access denied' });
    try {
        req.user = jwt.verify(token, JWT_SECRET).user;
        next();
    } catch {
        res.status(401).json({ msg: 'Token is invalid or expired' });
    }
};

module.exports = authMiddleware;
