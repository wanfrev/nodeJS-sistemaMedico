const { runQueryFromFile } = require("../../../DB/dbHandler");
const path = require('path');

class CitaBD {
  constructor() {
    this.queriesPath = path.join(__dirname, '../../../src/json/queries.json');
    this.queries = require(this.queriesPath).appointments;
  }

  async obtenerCitas() {
    try {
      const result = await runQueryFromFile('appointments.getAll');
      return result;
    } catch (error) {
      throw new Error("Error al obtener las citas: " + error.message);
    }
  }

  async obtenerCitaPorId(id) {
    try {
      const result = await runQueryFromFile('appointments.getById', [id]);
      return result;
    } catch (error) {
      throw new Error("Error al obtener la cita: " + error.message);
    }
  }

  async crearCita({ hora, fecha, personaId, doctorId, departamentoId }) {
    const values = [hora, fecha, personaId, doctorId, departamentoId];
    try {
      const result = await runQueryFromFile('appointments.create', values);
      return result[0];
    } catch (error) {
      throw new Error("Error al crear la cita: " + error.message);
    }
  }

  async actualizarCita(id, params) {
    const { hora, fecha, personaId, doctorId, departamentoId } = params;
    const values = [hora, fecha, personaId, doctorId, departamentoId, id];
    try {
      const result = await runQueryFromFile('appointments.update', values);
      return result[0];
    } catch (error) {
      throw new Error("Error al actualizar la cita: " + error.message);
    }
  }

  async eliminarCita(id) {
    try {
      const result = await runQueryFromFile('appointments.delete', [id]);
      return result[0];
    } catch (error) {
      throw new Error("Error al eliminar la cita: " + error.message);
    }
  }

  async obtenerConteoDeCitasCompletadasYEliminadas() {
    try {
      const result = await runQueryFromFile('appointments.countCompletedAndDeleted');
      return result;
    } catch (error) {
      throw new Error("Error al obtener el conteo de citas: " + error.message);
    }
  }
}

module.exports = CitaBD;