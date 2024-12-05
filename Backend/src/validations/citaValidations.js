const { body } = require('express-validator');

module.exports = {
  citaValidation: [
    body('hora').isString().withMessage('La hora es obligatoria y debe ser un string.'),
    body('fecha').isDate().withMessage('La fecha es obligatoria y debe ser una fecha válida.'),
    body('personaId').isNumeric().withMessage('El ID de la persona es obligatorio y debe ser un número.'),
    body('doctorId').isNumeric().withMessage('El ID del doctor es obligatorio y debe ser un número.'),
    body('departamentoId').isNumeric().withMessage('El ID del departamento es obligatorio y debe ser un número.'),
  ],
};
