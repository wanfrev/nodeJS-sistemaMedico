const { validationResult } = require('express-validator');

/**
 * Middleware para ejecutar las validaciones definidas en las rutas.
 * @param {Array} validations - Array de validaciones definidas con express-validator.
 * @returns {Function} Middleware que procesa las validaciones.
 */
exports.validate = (validations) => {
    return async (req, res, next) => {
        // Ejecutar todas las validaciones
        await Promise.all(validations.map(validation => validation.run(req)));

        // Verificar si hay errores
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        // Responder con errores de validación
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    };
};
