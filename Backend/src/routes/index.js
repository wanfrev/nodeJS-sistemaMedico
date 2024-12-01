const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

// Agrupación de rutas
router.use('/users', userRoutes);

module.exports = router;
