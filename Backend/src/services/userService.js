const dbHandler = require('../../DB/dbHandler');

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
        const { username, password, name, lastName, phone, email, address } = userData;
        if (!username || !password || !name || !lastName || !phone || !email || !address) {
            throw new Error("Datos inválidos");
        }

        // Validar si el usuario ya existe
        const existsQuery = 'SELECT * FROM users WHERE username = $1';
        const existsResult = await dbHandler.runQuery(existsQuery, [username]);
        if (existsResult.length > 0) {
            throw new Error('El usuario ya existe');
        }

        // Insertar el usuario
        const insertQuery = `
      INSERT INTO users (username, password, name, lastName, phone, email, address)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
        await dbHandler.runQuery(insertQuery, [username, password, name, lastName, phone, email, address]);
        return { message: "Usuario registrado exitosamente" };
    }
}

module.exports = UserService;
