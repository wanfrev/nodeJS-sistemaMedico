
const HistoriasDB = require("./historiasDB");
const HistoriasValidation = require("./historiasValidation");

class HistoryService {
    constructor(db) {
        this.model = new HistoriasDB(db); // Instancia del modelo con la base de datos
    }

    async obtenerHistorias() {
        try {
            const result = await this.model.obtenerHistorias();
            return {
                code: 0,
                message: "Historias médicas obtenidas exitosamente",
                data: result.rows,
            };
        } catch (error) {
            console.error("Error al obtener las historias médicas:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    async obtenerHistoriaPorId(id) {
        try {
            HistoriasValidation.validateId(id); // Validar el ID
            const result = await this.model.obtenerHistoriaPorId(id);
            return {
                code: 0,
                message: "Historia médica obtenida exitosamente",
                data: result.rows[0],
            };
        } catch (error) {
            console.error("Error al obtener la historia médica:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    async crearHistoria(params) {
        try {
            HistoriasValidation.validateCreate(params); // Validar los datos
            const result = await this.model.crearHistoria(params);
            return {
                code: 0,
                message: "Historia médica creada exitosamente",
                data: result.rows[0],
            };
        } catch (error) {
            console.error("Error al crear la historia médica:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    async actualizarHistoria(id, params) {
        try {
            HistoriasValidation.validateUpdate(id, params); // Validar datos
            const result = await this.model.actualizarHistoria(id, params);
            return {
                code: 0,
                message: "Historia médica actualizada exitosamente",
                data: result.rows[0],
            };
        } catch (error) {
            console.error("Error al actualizar la historia médica:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    async eliminarHistoria(id) {
        try {
            HistoriasValidation.validateId(id); // Validar el ID
            const result = await this.model.eliminarHistoria(id);
            return {
                code: 0,
                message: "Historia médica eliminada exitosamente",
                data: result.rows[0],
            };
        } catch (error) {
            console.error("Error al eliminar la historia médica:", error);
            return { code: 1, message: error.message, data: null };
        }
    }
}

module.exports = HistoryService;
