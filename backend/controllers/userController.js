const bcrypt = require('bcrypt');
const db = require('../config/db');
const { generateToken } = require('../utils/jwUtils');

// Registrar usuario
const registerUser = async (req, res) => {
    const { email, password, rol, lenguage } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.query(
            'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, rol, lenguage]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

// Iniciar sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (!user.rows.length) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }
        const token = generateToken(user.rows[0].email);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// Obtener usuario autenticado
const getUser = async (req, res) => {
    const email = req.userEmail; // Esto viene del middleware authMiddleware
    try {
        const user = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser
};
