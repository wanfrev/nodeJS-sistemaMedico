const dbHandler = require('../../DB/dbHandler');
const logger = require('../../Logger/logger');

class UserService {
    async login(username, password, session) {
        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const result = await dbHandler.runQuery(query, [username, password]);

        if (result.length > 0) {
            session.userId = result[0].id;
            session.username = result[0].username;
            return { success: true };
        } else {
            throw new Error('Credenciales incorrectas');
        }
    }

    async register(userData) {
        const { username, password, name, lastName, phone, email, address, document_nu, document_type_id = 1 } = userData;
        logger.info('Datos recibidos en el servicio:', userData); // Log para ver los datos recibidos
        if (!username || !password || !name || !lastName || !phone || !email || !address || !document_nu || !document_type_id) {
            throw new Error("Datos inválidos");
        }

        // Validar si el usuario ya existe
        const existsQuery = 'SELECT * FROM users WHERE username = $1';
        const existsResult = await dbHandler.runQuery(existsQuery, [username]);
        if (existsResult.length > 0) {
            throw new Error('El usuario ya existe');
        }

        // Insertar el documento
        const insertDocumentQuery = `
            INSERT INTO document (document_nu, document_type_id)
            VALUES ($1, $2)
            RETURNING document_id
        `;
        const documentResult = await dbHandler.runQuery(insertDocumentQuery, [document_nu, document_type_id]);
        const documentId = documentResult.rows[0].document_id;

        // Insertar la persona
        const insertPersonQuery = `
            INSERT INTO person (person_na, person_lna, person_pho, person_eml, person_dir, document_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING person_id
        `;
        const personResult = await dbHandler.runQuery(insertPersonQuery, [name, lastName, phone, email, address, documentId]);
        const personId = personResult.rows[0].person_id;

        // Insertar el usuario
        const insertUserQuery = `
            INSERT INTO users (username, password, person_id)
            VALUES ($1, $2, $3)
        `;
        await dbHandler.runQuery(insertUserQuery, [username, password, personId]);
        return { message: "Usuario registrado exitosamente" };
    }
}

module.exports = UserService;