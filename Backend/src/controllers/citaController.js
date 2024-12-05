const Cita = require('../BO/Cita/cita');

module.exports = {
    async crearCita(req, res, next) {
      console.log('Datos recibidos:', req.body); // Verifica el cuerpo de la solicitud
      const params = req.body;
  
      try {
        const cita = new Cita(req.db);
        const result = await cita.crearCita(params);
        res.status(201).json({
          code: 0,
          message: 'Cita creada exitosamente',
          data: result,
        });
      } catch (error) {
        next(error);
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
  };
  
