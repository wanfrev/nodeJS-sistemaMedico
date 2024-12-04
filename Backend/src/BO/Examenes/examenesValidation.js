class ExamenesValidation {
    static validateCreate(params) {
        if (!params) throw new Error("Parámetros no proporcionados.");
        const { nombre, descripcion, fecha, pacienteId, doctorId } = params;
        if (!nombre || !descripcion || !fecha || !pacienteId || !doctorId) {
            throw new Error("Todos los campos son obligatorios: nombre, descripcion, fecha, pacienteId, doctorId.");
        }
    }

    static validateUpdate(params) {
        if (!params) throw new Error("Parámetros no proporcionados.");
        const { nombre, descripcion, fecha } = params;
        if (!nombre || !descripcion || !fecha) {
            throw new Error("Los campos obligatorios para actualizar son: nombre, descripcion, fecha.");
        }
    }
}

module.exports = ExamenesValidation;
