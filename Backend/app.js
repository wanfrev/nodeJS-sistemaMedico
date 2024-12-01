const express = require('express');
const { configureApp } = require('./src/config/appConfig');
const { configureSession } = require('./src/config/sessionConfig');
const routes = require('./src/routes/index');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la aplicación
configureApp(app); // Middlewares generales
configureSession(app); // Configuración de sesiones

app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}, sesión:`, req.session);
  next();
});


app.use((req, res, next) => {
  console.log(`CORS ejecutado para ${req.method} ${req.url}`);
  next();
});



// Rutas principales
app.use('/api', routes); // Todas las rutas centralizadas
console.log('Rutas registradas: /api');


// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la página principal');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
