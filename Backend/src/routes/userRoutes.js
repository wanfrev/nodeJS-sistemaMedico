const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validate } = require('../middlewares/validationMiddleware');
const { loginValidation, registerValidation } = require('../validations/userValidations');
const { logoutValidation } = require('../validations/sessionValidations');
const { recoverPasswordValidation } = require('../validations/authValidations');
const { processMethodValidation } = require('../validations/methodValidations');

// Rutas de usuario
router.post('/login', validate(loginValidation), userController.login);
router.post('/register', validate(registerValidation), userController.register);
router.post('/recover-password', validate(recoverPasswordValidation), userController.recoverPassword);

// Rutas de métodos personalizados
router.post('/process-method', validate(processMethodValidation), userController.processMethod);

router.post('/logout', userController.logout);

module.exports = router;
