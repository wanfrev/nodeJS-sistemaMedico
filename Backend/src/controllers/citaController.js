const Cita = require("../BO/Cita/cita");

module.exports = {
  async crearCita(req, res, next) {
    console.log("Datos recibidos en el servidor:", req.body);
    const { hora, fecha, doctorId, departamentoId, personaId } = req.body;

    if (!hora || !fecha || !doctorId || !departamentoId || !personaId) {
      return res.status(400).json({
        code: 1,
        message: "Todos los campos son obligatorios",
        errors: [
          !hora ? "La hora es obligatoria." : null,
          !fecha ? "La fecha es obligatoria." : null,
          !doctorId ? "El ID del médico es obligatorio." : null,
          !departamentoId ? "El ID del departamento es obligatorio." : null,
          !personaId ? "El ID de la persona es obligatorio." : null,
        ].filter(Boolean),
      });
    }

    try {
      const cita = new Cita(req.db);
      const params = { hora, fecha, personaId, doctorId, departamentoId };
      const result = await cita.crearCita(params);
      res.status(201).json({
        code: 0,
        message: "Cita creada exitosamente",
        data: result,
      });
    } catch (error) {
      console.error("Error al crear cita:", error);
      res.status(500).json({
        code: 1,
        message: "Error interno al crear cita",
        error: error.message,
      });
    }
  },

  async obtenerCitas(req, res, next) {
    try {
      const cita = new Cita(req.db);
      const result = await cita.obtenerCitas();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async listarMedicos(req, res, next) {
    try {
      console.log("Solicitud recibida para listar médicos");
      const query = `
            SELECT 
              p.person_id AS doctor_id, 
              p.person_na AS doctor_name, 
              p.person_lna AS doctor_lastname,
              d.department_de AS department
            FROM person p
            JOIN department d ON d.department_id = p.person_type_id
            WHERE p.person_type_id = 2;
          `;
      console.log("Ejecutando consulta:", query);
      const result = await req.db.query(query); // Asegúrate de que req.db sea el pool
      console.log("Resultado de la consulta:", result.rows);
      res.status(200).json({
        code: 0,
        message: "Médicos listados exitosamente",
        data: result.rows,
      });
    } catch (error) {
      console.error("Error al listar médicos:", error.message);
      res.status(500).json({
        code: 1,
        message: "Error al listar médicos",
        error: error.message,
      });
    }
  },
};
