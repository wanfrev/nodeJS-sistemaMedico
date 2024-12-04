
const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const routes = require('./routes');

// Integrar rutas bajo /api
router.use('/', userRoutes);
router.use('/users', userRoutes);
router.use('/methods', routes);

module.exports = router;
