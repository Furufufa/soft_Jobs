const { verifyToken } = require('../utils/jwUtils');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = verifyToken(token);
        req.userEmail = decoded.email;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = { authMiddleware };
