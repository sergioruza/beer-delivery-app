const jwt = require('jsonwebtoken');
const { secretKey } = require('./generateToken');

const authenticateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    try {
        const secret = await secretKey();
        const decryptedData = jwt.verify(authorization, secret);
        req.user = decryptedData;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = authenticateToken;
