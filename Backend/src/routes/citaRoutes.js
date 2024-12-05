const express = require("express");
const router = express.Router();
const citaController = require("../controllers/citaController");
const { validate } = require("../middlewares/validationMiddleware");
const { citaValidation } = require("../validations/citaValidations");

module.exports = (db) => {
  router.post("/cita", validate(citaValidation), (req, res, next) => {
    req.db = db.pool; // Inyecta el pool en lugar del objeto `db`
    citaController.crearCita(req, res, next);
  });

  router.get("/cita", (req, res, next) => {
    req.db = db.pool; // Inyecta el pool en lugar del objeto `db`
    citaController.obtenerCitas(req, res, next);
  });

  router.get('/medicos', (req, res, next) => {
    req.db = db.pool; // Inyecta el pool en lugar del objeto `db`
    citaController.listarMedicos(req, res, next);
  });

  router.get("/citas", (req, res, next) => {
  req.db = db; // Inyecta la base de datos
  citaController.listarCitasPorUsuario(req, res, next);
});


  return router;
};
