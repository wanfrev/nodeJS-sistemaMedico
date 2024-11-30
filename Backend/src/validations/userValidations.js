const { body } = require('express-validator');

// Validación para el registro de usuarios
exports.registerValidation = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio.')
        .isString().withMessage('El nombre de usuario debe ser una cadena de texto.'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido.'),
];

// Validación para el inicio de sesión
exports.loginValidation = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio.')
        .isString().withMessage('El nombre de usuario debe ser una cadena de texto.'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
];
