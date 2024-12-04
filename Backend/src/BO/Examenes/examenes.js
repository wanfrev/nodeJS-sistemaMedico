const ExamenesDB = require("./examenesDB");
const ExamenesValidation = require("./examenesValidation");

class Examenes {
    constructor(db) {
        this.model = new ExamenesDB(db); // Instancia del modelo con la base de datos
    }

    // Crear un nuevo examen
    async crearExamen(params) {
        try {
            ExamenesValidation.validateCreate(params); // Validar los datos
            const result = await this.model.crearExamen(params); // Usar el modelo
            return {
                code: 0,
                message: "Examen creado exitosamente",
                data: result.rows,
            };
        } catch (error) {
            console.error("Error al crear el examen:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    // Obtener todos los exámenes
    async obtenerExamenes() {
        try {
            const result = await this.model.obtenerExamenes(); // Usar el modelo
            return {
                code: 0,
                message: "Exámenes obtenidos exitosamente",
                data: result.rows,
            };
        } catch (error) {
            console.error("Error al obtener los exámenes:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    // Obtener un examen por su ID
    async obtenerExamenPorId(id) {
        try {
            const result = await this.model.obtenerExamenPorId(id); // Usar el modelo
            return result.rows.length > 0
                ? { code: 0, message: "Examen obtenido exitosamente", data: result.rows[0] }
                : { code: 1, message: "No se encontró el examen", data: null };
        } catch (error) {
            console.error("Error al obtener el examen:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    // Actualizar un examen
    async actualizarExamen(id, params) {
        try {
            ExamenesValidation.validateUpdate(params); // Validar los datos
            const result = await this.model.actualizarExamen(id, params); // Usar el modelo
            return result.rowCount > 0
                ? { code: 0, message: "Examen actualizado exitosamente" }
                : { code: 1, message: "No se encontró el examen para actualizar" };
        } catch (error) {
            console.error("Error al actualizar el examen:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    // Eliminar un examen
    async eliminarExamen(id) {
        try {
            const result = await this.model.eliminarExamen(id); // Usar el modelo
            return result.rowCount > 0
                ? { code: 0, message: "Examen eliminado exitosamente" }
                : { code: 1, message: "No se encontró el examen para eliminar" };
        } catch (error) {
            console.error("Error al eliminar el examen:", error);
            return { code: 1, message: error.message, data: null };
        }
    }
}

module.exports = Examenes;
