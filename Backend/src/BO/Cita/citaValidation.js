
class CitaValidation {
    static validateId(id) {
        if (!id || typeof id !== "number") {
            throw new Error("El ID es obligatorio y debe ser un número.");
        }
    }

    static validateCreate(params) {
        if (!params) throw new Error("Parámetros no proporcionados.");
        const { fecha, hora, personaId, doctorId, departamentoId } = params;

        if (!fecha || isNaN(Date.parse(fecha))) {
            throw new Error("La fecha es obligatoria y debe tener un formato válido (YYYY-MM-DD).");
        }

        if (!hora || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hora)) {
            throw new Error("La hora es obligatoria y debe estar en formato HH:MM.");
        }

        if (!personaId || typeof personaId !== "number") {
            throw new Error("personaId es obligatorio y debe ser un número.");
        }

        if (!doctorId || typeof doctorId !== "number") {
            throw new Error("doctorId es obligatorio y debe ser un número.");
        }

        if (!departamentoId || typeof departamentoId !== "number") {
            throw new Error("departamentoId es obligatorio y debe ser un número.");
        }
    }

    static validateUpdate(id, params) {
        this.validateId(id);
        this.validateCreate(params);
    }

    static validateUpdateEstado(id, estadoId) {
        if (!id || typeof id !== "number") {
            throw new Error("El ID es obligatorio y debe ser un número.");
        }

        if (!estadoId || typeof estadoId !== "number") {
            throw new Error("El estadoId es obligatorio y debe ser un número.");
        }
    }

}

module.exports = CitaValidation;
