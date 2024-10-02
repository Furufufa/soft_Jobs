const db = require('../config/db');

// Crear un nuevo usuario
const createUser = async (email, hashedPassword, rol, lenguage) => {
    const query = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [email, hashedPassword, rol, lenguage];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Buscar un usuario por email
const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
};

// Buscar un usuario por su ID
const findUserById = async (id) => {
    const query = 'SELECT * FROM usuarios WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
};
