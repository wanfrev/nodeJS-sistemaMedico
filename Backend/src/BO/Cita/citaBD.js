class CitaBD {
    constructor(db) {
        this.db = db; // Dependencia para la base de datos
    }

    async crearCita(params) {
        const { fecha, hora, personaId, doctorId } = params;
        return this.db.exe("crearCita", [fecha, hora, personaId, doctorId]);
    }

    async obtenerCitas() {
        return this.db.exe("obtenerCitas");
    }

    async actualizarCita(id, params) {
        const { fecha, hora, personaId, doctorId } = params;
        return this.db.exe("actualizarCita", [id, fecha, hora, personaId, doctorId]);
    }

    async eliminarCita(id) {
        return this.db.exe("eliminarCita", [id]);
    }
}

module.exports = CitaBD;
