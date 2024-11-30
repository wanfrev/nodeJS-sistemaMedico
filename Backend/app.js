const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Importar componentes del backend
const dbHandler = require('./DB/dbHandler');
const { pool } = require('./DB/connection');
const routes = require('./Dispatcher/routes');
const userRoutes = require('./src/routes/userRoutes'); // Importar rutas de usuario
const userController = require('./src/controllers/userController'); // Importar userController
const Security = require('./Security/Security');
const sendRecoveryEmail = require('./src/utils/PassRecovery');
const { validate } = require('./src/middlewares/validationMiddleware');
const { loginValidation, registerValidation } = require('./src/validations/userValidations');
const { recoverPasswordValidation } = require('./src/validations/authValidations');
const { logoutValidation } = require('./src/validations/sessionValidations');

// Configuración inicial de la aplicación
const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de sesiones
const configPath = path.join(__dirname, 'src', 'config', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
app.use(session({
  secret: config.sessionConfig.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: config.sessionConfig.cookie.maxAge
  }
}));

// Middleware para manejar la base de datos en las solicitudes
app.use((req, res, next) => {
  req.db = dbHandler;
  next();
});

// Rutas principales
app.get('/', (req, res) => {
  res.send('Bienvenido a la página principal');
});

app.post('/api/recover-password', validate(recoverPasswordValidation), async (req, res) => {
  const { username } = req.body;
  try {
    const message = await sendRecoveryEmail(username);
    res.status(200).send({ message });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/login', validate(loginValidation), async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await dbHandler.runQueryFromFile('login', [username, password]);
    if (result && result.length > 0) {
      req.session.userId = result[0].user_id;
      req.session.userProfile = result[0].profile_id;

      req.session.save(err => {
        if (err) console.error('Error al guardar la sesión:', err);
      });

      res.json({ success: true, userProfile: result[0].profile_id });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error del servidor. Intente nuevamente más tarde.' });
  }
});

app.post('/register', validate(registerValidation), async (req, res) => {
  const { username, password, name, lastName, phone, email, address, document_nu, documentTypeId } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const existsResult = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existsResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).send({ msg: "Usuario ya existente" });
    }

    const documentExistsResult = await client.query('SELECT * FROM document WHERE document_nu = $1 AND document_type_id = $2', [document_nu, documentTypeId]);
    if (documentExistsResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).send({ msg: "Documento ya existente" });
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
});

app.post('/logout', userController.logout); // Mover la ruta antes del middleware de autenticación

// Middleware de autenticación
const checkUserAuthentication = (req, res, next) => {
  console.log('Verificando autenticación:', req.session);
  if (req.session.userId && req.session.userProfile) {
    return next();
  } else {
    return res.status(401).send('Acceso denegado');
  }
};

app.use('/api', checkUserAuthentication, routes);
app.use('/api', userRoutes); // Registrar rutas de usuario

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});