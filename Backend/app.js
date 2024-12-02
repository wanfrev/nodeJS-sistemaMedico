const express = require('express');
const { configureApp } = require('./src/config/appConfig');
const { configureSession } = require('./src/config/sessionConfig');
const routes = require('./src/routes/index');
const errorHandler = require('./middleware/errorHandler'); // Importar el manejador de errores
const logger = require('./src/utils/logger');

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
