const cors = require('cors');
const express = require('express');
const requestLogger = require('../../Logger/requestLogger');

const configureApp = (app) => {
    // Configuración de CORS
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));

    app.use(requestLogger);

    // Configuración de middlewares generales
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
};

module.exports = { configureApp };
