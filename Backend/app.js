const express = require('express');
const { configureApp } = require('./src/config/appConfig');
const { configureSession } = require('./src/config/sessionConfig');
const routes = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorHandler'); // Importar el manejador de errores
const logger = require('./Logger/logger');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la aplicación
configureApp(app); // Middlewares generales
configureSession(app); // Configuración de sesiones

app.use((req, res, next) => {
  logger.info(`Solicitud recibida: ${req.method} ${req.url}, sesión activa.`);
  next();
});

app.use((req, res, next) => {
  logger.debug(`CORS ejecutado para ${req.method} ${req.url}`);
  next();
});

// Rutas principales
app.use('/api', routes); // Todas las rutas centralizadas
logger.info('Rutas registradas: /api');

app.use(bodyParser.json());  // Para que Express pueda manejar JSON
app.use('/api', userRoutes); // Usamos el archivo de rutas

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la página principal');
});

// Middleware global para manejar errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  logger.info(`Servidor escuchando en el puerto ${port}`);
});

// Test route for frontend-backend connection
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});