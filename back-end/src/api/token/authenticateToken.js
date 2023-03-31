const jwt = require('jsonwebtoken');
const { secretKey } = require('./generateToken');

const authenticateToken = async (req, res, next) => {
    // estou pegando o token pelo localStorage e passando pelo body
    const { token } = req.body.user;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    try {
        const secret = await secretKey();
        const decryptedData = jwt.verify(token, secret);
        req.user = decryptedData;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = authenticateToken;
