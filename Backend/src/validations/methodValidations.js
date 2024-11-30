const { body } = require('express-validator');

exports.processMethodValidation = [
    body('methodName')
        .notEmpty().withMessage('El nombre del método es obligatorio.')
        .isString().withMessage('El nombre del método debe ser una cadena de texto.'),
    body('objectName')
        .notEmpty().withMessage('El nombre del objeto es obligatorio.')
        .isString().withMessage('El nombre del objeto debe ser una cadena de texto.'),
    body('params')
        .optional()
        .isArray().withMessage('Los parámetros deben ser un arreglo.')
];
