const { validationResult } = require('express-validator');
const logger = require('../../Logs/logger'); // Integración con Winston

exports.validate = (validations) => {
    return async (req, res, next) => {
        // Ejecutar todas las validaciones
        await Promise.all(validations.map((validation) => validation.run(req)));

        // Verificar si hay errores
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        // Extraer mensajes de error
        const errorMessages = errors.array().map((err) => err.msg);

        // Registrar errores en logs
        logger.warn(`Errores de validación: ${errorMessages.join(', ')}`);

        // Responder con errores de validación
        return res.status(400).json({
            success: false,
            errors: errorMessages,
        });
    };
};
