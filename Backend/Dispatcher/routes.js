const express = require('express');
const router = express.Router();

const methodController = require('../src/controllers/methodController');
const userController = require('../src/controllers/userController');
const { validate } = require('../src/middlewares/validationMiddleware');
const { processMethodValidation } = require('../src/validations/methodValidations');
const { loginValidation, registerValidation } = require('../src/validations/userValidations');

// Rutas para manejar métodos
router.post('/toProcess', validate(processMethodValidation), methodController.invokeMethod);

// Rutas para usuarios
router.post('/login', validate(loginValidation), userController.login);
router.post('/register', validate(registerValidation), userController.register);

module.exports = router;
