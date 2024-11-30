const { body } = require('express-validator');

// Validación para recuperación de contraseña
exports.recoverPasswordValidation = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio.')
        .isString().withMessage('El nombre de usuario debe ser una cadena de texto.'),
];
