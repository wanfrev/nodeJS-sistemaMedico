const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

// Rutas de usuario bajo /api
router.use('/', userRoutes);

module.exports = router;
