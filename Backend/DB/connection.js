const { Pool } = require('pg');
const config = require('../src/config/config.json'); // Lee la configuración desde json

const pool = new Pool(config.dbConfig);

pool.on('connect', () => {
    console.log('Conexión a la base de datos establecida');
});

pool.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err.message);
});

const openDatabaseConnection = async () => {
    try {
        return await pool.connect();
    } catch (error) {
        console.error('Database connection error:', error.message);
        throw error;
    }
};

const closeConnectionPool = async () => {
    try {
        await pool.end();
    } catch (error) {
        console.error('Error releasing pool:', error.message);
        throw error;
    }
};

module.exports = {
    pool,
    openDatabaseConnection,
    closeConnectionPool,
};
