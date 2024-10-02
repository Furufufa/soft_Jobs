const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Generar un token
const generateToken = (email) => {
    return jwt.sign({ email }, secret, { expiresIn: '1h' });
};

// Verificar y decodificar un token
function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Token inválido');
    }
 }
 

module.exports = {
    generateToken,
    verifyToken
};
