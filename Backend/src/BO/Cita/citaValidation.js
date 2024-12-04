class CitaValidation {
    static validateCreate(params) {
        if (!params) throw new Error("Parámetros no proporcionados.");
        const { fecha, hora, personaId, doctorId } = params;
        if (!fecha || !hora || !personaId || !doctorId) {
            throw new Error("Todos los campos son obligatorios: fecha, hora, personaId, doctorId.");
        }
    }
}

module.exports = CitaValidation;
