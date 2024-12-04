class HistoriaValidation {
    static validateCreate(params) {
        if (!params) throw new Error("Parámetros no proporcionados.");
        const { pacienteId, doctorId, descripcion, fecha } = params;
        if (!pacienteId || !doctorId || !descripcion || !fecha) {
            throw new Error("Todos los campos son obligatorios: pacienteId, doctorId, descripcion, fecha.");
        }
    }

    static validateUpdate(params) {
        if (!params) throw new Error("Parámetros no proporcionados.");
        const { descripcion, fecha } = params;
        if (!descripcion || !fecha) {
            throw new Error("Los campos obligatorios para actualizar son: descripcion y fecha.");
        }
    }
}

module.exports = HistoriaValidation;
