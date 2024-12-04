
class HistoriaValidation {
    static validateId(id) {
        if (!id || typeof id !== "number") {
            throw new Error("El ID es obligatorio y debe ser un número.");
        }
    }

    static validateCreate(params) {
        if (!params) throw new Error("Parámetros no proporcionados.");
        const { fecha, descripcion, doctorId, pacienteId } = params;
        if (!fecha || isNaN(Date.parse(fecha))) {
            throw new Error("La fecha es obligatoria y debe tener un formato válido (YYYY-MM-DD).");
        }
        if (!descripcion || typeof descripcion !== "string") {
            throw new Error("La descripción es obligatoria y debe ser un texto.");
        }
        if (!doctorId || typeof doctorId !== "number") {
            throw new Error("doctorId es obligatorio y debe ser un número.");
        }
        if (!pacienteId || typeof pacienteId !== "number") {
            throw new Error("pacienteId es obligatorio y debe ser un número.");
        }
    }

    static validateUpdate(id, params) {
        this.validateId(id);
        this.validateCreate(params);
    }
}

module.exports = HistoriaValidation;
