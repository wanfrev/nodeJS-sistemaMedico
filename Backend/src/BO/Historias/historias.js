const HistoriasDB = require("./historiasDB");
const HistoriasValidation = require("./historiasValidation");

class HistoryService {
    constructor(db) {
        this.model = new HistoriasDB(db); // Instancia del modelo con la base de datos
    }

    // Crear una nueva historia médica
    async crearHistoria(params) {
        try {
            HistoriasValidation.validateCreate(params); // Validar los datos
            const result = await this.model.crearHistoria(params); // Usar el modelo
            return {
                code: 0,
                message: "Historia médica creada exitosamente",
                data: result.rows,
            };
        } catch (error) {
            console.error("Error al crear la historia médica:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    // Obtener todas las historias médicas
    async obtenerHistorias() {
        try {
            const result = await this.model.obtenerHistorias(); // Usar el modelo
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

    // Obtener una historia médica por su ID
    async obtenerHistoriaPorId(id) {
        try {
            const result = await this.model.obtenerHistoriaPorId(id); // Usar el modelo
            return result.rows.length > 0
                ? { code: 0, message: "Historia médica obtenida exitosamente", data: result.rows[0] }
                : { code: 1, message: "No se encontró la historia médica", data: null };
        } catch (error) {
            console.error("Error al obtener la historia médica:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    // Actualizar una historia médica
    async actualizarHistoria(id, params) {
        try {
            HistoriasValidation.validateUpdate(params); // Validar los datos
            const result = await this.model.actualizarHistoria(id, params); // Usar el modelo
            return result.rowCount > 0
                ? { code: 0, message: "Historia médica actualizada exitosamente" }
                : { code: 1, message: "No se encontró la historia médica para actualizar" };
        } catch (error) {
            console.error("Error al actualizar la historia médica:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    // Eliminar una historia médica
    async eliminarHistoria(id) {
        try {
            const result = await this.model.eliminarHistoria(id); // Usar el modelo
            return result.rowCount > 0
                ? { code: 0, message: "Historia médica eliminada exitosamente" }
                : { code: 1, message: "No se encontró la historia médica para eliminar" };
        } catch (error) {
            console.error("Error al eliminar la historia médica:", error);
            return { code: 1, message: error.message, data: null };
        }
    }
}

module.exports = HistoryService;
