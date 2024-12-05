const queries = require('../../json/queries.json');

class HistoriaDB {
    constructor(db) {
        this.db = db; // Dependencia para la base de datos
    }

    async obtenerHistorias() {
        return this.db.query(queries.history.getAll);
    }

    async obtenerHistoriaPorId(id) {
        return this.db.query(queries.history.getById, [id]);
    }

    async crearHistoria(params) {
        const { fecha, descripcion, doctorId, pacienteId } = params;
        return this.db.query(queries.history.create, [fecha, descripcion, doctorId, pacienteId]);
    }

    async actualizarHistoria(id, params) {
        const { fecha, descripcion, doctorId, pacienteId } = params;
        return this.db.query(queries.history.update, [fecha, descripcion, doctorId, pacienteId, id]);
    }

    async eliminarHistoria(id) {
        return this.db.query(queries.history.delete, [id]);
    }
}

module.exports = HistoriaDB;
