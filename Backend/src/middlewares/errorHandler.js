const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Código de estado por defecto
    const message = err.message || 'Error interno del servidor';

    // Log del error (puedes reemplazar esto con un logger como Winston)
    console.error(`[Error]: ${message}`, {
        status: statusCode,
        stack: err.stack,
    });

    // Respuesta al cliente
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Mostrar stack solo en desarrollo
    });
};

module.exports = errorHandler;
