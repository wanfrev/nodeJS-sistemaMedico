const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validate } = require('../middlewares/validationMiddleware');
const { registerValidation, loginValidation } = require('../validations/userValidations');

// Rutas para usuarios
router.post('/register', validate(registerValidation), userController.register);
router.post('/login', validate(loginValidation), userController.login);
router.post('/logout', userController.logout);

module.exports = router;