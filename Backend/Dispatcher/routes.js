const express = require('express');
const router = express.Router();

const methodController = require('../src/controllers/methodController');
const userController = require('../src/controllers/userController');
const { validate } = require('../src/middlewares/validationMiddleware');
const { processMethodValidation } = require('../src/validations/methodValidations');
const { loginValidation, registerValidation } = require('../src/validations/userValidations');

// Rutas para manejar métodos
router.post('/toProcess', validate(processMethodValidation), (req, res, next) => {
    try {
        methodController.invokeMethod(req.body);
        res.status(200).send('Método procesado correctamente');
    } catch (error) {
        next(new Error('Error al procesar el método'));
    }
});

// Rutas para usuarios
router.post('/login', validate(loginValidation), (req, res, next) => {
    try {
        userController.login(req.body);
        res.status(200).send('Inicio de sesión exitoso');
    } catch (error) {
        next(new Error('Error en el inicio de sesión'));
    }
});

router.post('/register', validate(registerValidation), (req, res, next) => {
    try {
        userController.register(req.body);
        res.status(201).send('Usuario registrado correctamente');
    } catch (error) {
        next(new Error('Error al registrar el usuario'));
    }
});

module.exports = router;
