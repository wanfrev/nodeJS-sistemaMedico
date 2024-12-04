class HistoriaDB {
    constructor(db) {
        this.db = db; // Dependencia para la base de datos
    }

    async crearHistoria(params) {
        const { pacienteId, doctorId, descripcion, fecha } = params;
        return this.db.exe("crearHistoria", [pacienteId, doctorId, descripcion, fecha]);
    }

    async obtenerHistorias() {
        return this.db.exe("obtenerHistorias");
    }

    async obtenerHistoriaPorId(id) {
        return this.db.exe("obtenerHistoriaPorId", [id]);
    }

    async actualizarHistoria(id, params) {
        const { descripcion, fecha } = params;
        return this.db.exe("actualizarHistoria", [id, descripcion, fecha]);
    }

    async eliminarHistoria(id) {
        return this.db.exe("eliminarHistoria", [id]);
    }
}

module.exports = HistoriaDB;
