const cors = require('cors');
const express = require('express');

const configureApp = (app) => {
    // Configuración de CORS
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));    

    // Configuración de middlewares generales
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
};

module.exports = { configureApp };
