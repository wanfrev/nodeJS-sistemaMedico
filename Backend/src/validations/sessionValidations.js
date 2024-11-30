const { header } = require('express-validator');

// Validación para logout (opcional)
exports.logoutValidation = [
    header('Authorization')
        .notEmpty().withMessage('El token de autorización es obligatorio.')
        .isString().withMessage('El token debe ser una cadena válida.'),
];
