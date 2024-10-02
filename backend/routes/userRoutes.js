const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para registrar usuarios
router.post('/usuarios', registerUser);

// Ruta para login
router.post('/login', loginUser);

// Ruta protegida para obtener el usuario autenticado
router.get('/usuarios', authMiddleware, getUser);

module.exports = router;

