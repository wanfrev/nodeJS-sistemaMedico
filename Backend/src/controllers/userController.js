const dbHandler = require('../../DB/dbHandler');
const sendRecoveryEmail = require('../utils/PassRecovery');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await dbHandler.runQueryFromFile('login', [username, password]);
    if (result && result.length > 0) {
      req.session.userId = result[0].user_id;
      req.session.userProfile = result[0].profile_id;

      req.session.save(err => {
        if (err) {
          console.error('Error al guardar la sesión:', err);
          return res.status(500).json({ error: 'Error al guardar la sesión' });
        }

        res.json({ success: true, userProfile: result[0].profile_id });
      });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const register = async (req, res) => {
  const { username, password, name, lastName, phone, email, address, document_nu, documentTypeId } = req.body;
  const client = await dbHandler.getClient();

  try {
    await client.query('BEGIN');

    const existsResult = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existsResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).send({ msg: "Usuario ya existente" });
    }

    const documentResult = await client.query('INSERT INTO document (document_nu, document_type_id) VALUES ($1, $2) RETURNING document_id', [document_nu, documentTypeId]);
    const newDocumentId = documentResult.rows[0].document_id;

    const personResult = await client.query('INSERT INTO person (person_na, person_lna, person_pho, person_eml, person_dir, person_type_id, document_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING person_id', [name, lastName, phone, email, address, 1, newDocumentId]);
    const personId = personResult.rows[0].person_id;

    const userResult = await client.query('INSERT INTO users (username, password, person_id) VALUES ($1, $2, $3) RETURNING user_id', [username, password, personId]);
    const userId = userResult.rows[0].user_id;

    await client.query('INSERT INTO user_profile (user_id, profile_id) VALUES ($1, $2)', [userId, 1]);
    await client.query('COMMIT');

    res.send({ msg: "Usuario registrado con éxito" });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error en registro:', error);
    res.status(500).send({ msg: "Error del servidor", error: error.message });
  } finally {
    client.release();
  }
};

const logout = (req, res) => {
  console.log('Logout iniciado');
  console.log('Sesión actual:', req.session);

  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        console.error('Error al destruir la sesión:', err);
        return res.status(500).send({ error: 'Error al cerrar sesión' });
      } else {
        console.log('Sesión destruida correctamente');
        res.clearCookie('connect.sid', { path: '/' });
        res.send({ success: true });
      }
    });
  } else {
    console.log('No se encontró una sesión activa');
    res.status(400).send({ error: 'No hay ninguna sesión activa' });
  }
};


module.exports = { login, register, logout };
