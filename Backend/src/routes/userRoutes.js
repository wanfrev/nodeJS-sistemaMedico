
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dispatcher = require('../../Dispatcher/dispatcher');
const { validate } = require('../middlewares/validationMiddleware');
const { loginValidation, registerValidation } = require('../validations/userValidations');
const { recoverPasswordValidation } = require('../validations/authValidations');
const { processMethodValidation } = require('../validations/methodValidations');

// Ruta protegida con Dispatcher y validación
router.post(
    '/process-method',
    validate(processMethodValidation), // Validación de datos
    dispatcher(['user', 'admin']), // Validación de sesión y permisos
    userController.processMethod
);

// Rutas públicas con validaciones
router.post('/login', validate(loginValidation), userController.login);
router.post('/register', validate(registerValidation), userController.register);
router.post('/recover-password', validate(recoverPasswordValidation), userController.recoverPassword);

// Ruta pública sin validación
router.post('/logout', userController.logout);

module.exports = router;
