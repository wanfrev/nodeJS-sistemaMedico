const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validate } = require('../middlewares/validationMiddleware');
const { loginValidation, registerValidation } = require('../validations/userValidations');
const { logoutValidation } = require('../validations/sessionValidations');

// Rutas de usuario
router.post('/login', validate(loginValidation), userController.login);
router.post('/register', validate(registerValidation), userController.register);
router.post('/logout', validate(logoutValidation), userController.logout);

module.exports = router;
