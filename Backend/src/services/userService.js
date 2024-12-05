const dbHandler = require('../../DB/dbHandler');
const logger = require('../../Logger/logger');
const queries = require('../json/queries.json');

class UserService {
    async login(username, password, session) {
        const result = await dbHandler.runQuery(queries.userService.validateUser, [username, password]);

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
        const existsResult = await dbHandler.runQuery(queries.userService.checkExists, [username]);
        if (existsResult.length > 0) {
            throw new Error('El usuario ya existe');
        }

        // Insertar el documento
        const documentResult = await dbHandler.runQuery(queries.userService.createDocument, [document_nu, document_type_id]);
        const documentId = documentResult.rows[0].document_id;

        // Insertar la persona
        const personResult = await dbHandler.runQuery(queries.userService.createPerson, [name, lastName, phone, email, address, documentId]);
        const personId = personResult.rows[0].person_id;

        // Insertar el usuario
        await dbHandler.runQuery(queries.userService.createUser, [username, password, personId]);
        return { message: "Usuario registrado exitosamente" };
    }
}

module.exports = UserService;
