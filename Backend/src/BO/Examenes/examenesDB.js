class ExamenesDB {
    constructor(db) {
        this.db = db; // Dependencia para la base de datos
    }

    async crearExamen(params) {
        const { nombre, descripcion, fecha, pacienteId, doctorId } = params;
        return this.db.exe("crearExamen", [nombre, descripcion, fecha, pacienteId, doctorId]);
    }

    async obtenerExamenes() {
        return this.db.exe("obtenerExamenes");
    }

    async obtenerExamenPorId(id) {
        return this.db.exe("obtenerExamenPorId", [id]);
    }

    async actualizarExamen(id, params) {
        const { nombre, descripcion, fecha } = params;
        return this.db.exe("actualizarExamen", [id, nombre, descripcion, fecha]);
    }

    async eliminarExamen(id) {
        return this.db.exe("eliminarExamen", [id]);
    }
}

module.exports = ExamenesDB;
