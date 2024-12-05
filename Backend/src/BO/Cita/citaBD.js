const queries = require('../json/queries.json');

class CitaBD {
  constructor(db) {
    this.db = db; // Dependencia para la base de datos
  }

  async obtenerCitas() {
    return this.db.query(queries.appointment.getAll);
  }

  async obtenerCitaPorId(id) {
    return this.db.query(queries.appointment.getById, [id]);
  }

  async crearCita(params) {
    const { hora, fecha, personaId, doctorId, departamentoId } = params;
    return this.db.query(queries.appointment.create, [hora, fecha, personaId, doctorId, departamentoId]);
  }

  async actualizarCita(id, params) {
    const { hora, fecha, personaId, doctorId, departamentoId } = params;
    return this.db.query(queries.appointment.update, [hora, fecha, personaId, doctorId, departamentoId, id]);
  }

  async eliminarCita(id) {
    return this.db.query(queries.appointment.delete, [id]);
  }

  async obtenerConteoDeCitasCompletadasYEliminadas() {
    return this.db.query(queries.appointment.countCompletedAndDeleted);
  }
}

module.exports = CitaBD;
