const express = require('express');
const router = express.Router();

const methodController = require('../controllers/methodController');
const userController = require('../controllers/userController');
const { validate } = require('../middlewares/validationMiddleware');
const { processMethodValidation } = require('../validations/methodValidations');
const { loginValidation, registerValidation } = require('../validations/userValidations');

// Rutas para manejar métodos
router.post('/toProcess', validate(processMethodValidation), (req, res, next) => {
    try {
        methodController.invokeMethod(req.body);
        res.status(200).send('Metodo procesado correctamente');
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
