const express = require("express");
const router = express.Router();
const citaController = require("../controllers/citaController");
const { validate } = require("../middlewares/validationMiddleware");
const { citaValidation } = require("../validations/citaValidations");

module.exports = (db) => {
  router.post(
    "/cita",
    validate(citaValidation), // Validación de datos de entrada
    (req, res, next) => {
      req.db = db; // Inyecta la base de datos en la solicitud
      citaController.crearCita(req, res, next);
    }
  );

  router.get("/cita", (req, res, next) => {
    req.db = db; // Inyecta la base de datos en la solicitud
    citaController.obtenerCitas(req, res, next);
  });

  return router;
};
