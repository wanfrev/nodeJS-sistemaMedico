const { pool } = require('./connection');
const path = require('path');
const logger = require('../src/utils/logger');

exports.runQuery = async (query, params) => {
    const client = await pool.connect();
    try {
        const result = await client.query(query, params);
        return result.rows;
    } catch (error) {
        logger.error('Error en la consulta:', error.message);
        throw error;
    } finally {
        client.release();
    }
};

exports.runQueryByKey = async ({ key, params = [] }) => {
    const query = this.querys[key]; // Obtener la consulta por clave
    return this.runQuery(query, params); // Ejecutar la consulta con los parámetros
}

exports.runQueryFromFile = async (queryKey, params) => {
    const queriesPath = path.join(__dirname, '../src/json/queries.json');
    const queries = require(queriesPath);
    const query = queries[queryKey];
    if (!query) {
        throw new Error(`Consulta ${queryKey} no encontrada`);
    }
    return this.runQuery(query, params);
};

exports.executeTransaction = async ({ querys = [] }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Iniciar la transacción
        for (const elemento of querys) {
            const { key, params } = elemento;
            const query = require(`../src/json/queries${key}.json`)[key];
            await client.query(query, params); // Ejecutar cada consulta en la transacción
        }
        await client.query('COMMIT'); // Confirmar la transacción
    } catch (error) {
        await client.query('ROLLBACK'); // Revertir la transacción
        logger.error('Transaction error:', error.message);
        throw error;
    } finally {
        client.release();
    }
};

exports.getClient = async () => {
    return await pool.connect();
};