
const CitaBD = require("./citaBD");
const CitaValidation = require("./citaValidation");

class Cita {
    constructor(db) {
        this.model = new CitaBD(db); // Instancia del modelo con la base de datos
    }

    async obtenerCitas() {
        try {
            const result = await this.model.obtenerCitas();
            return {
                code: 0,
                message: "Citas obtenidas exitosamente",
                data: result.rows,
            };
        } catch (error) {
            console.error("Error al obtener las citas:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    async obtenerCitaPorId(id) {
        try {
            CitaValidation.validateId(id); // Validar el ID
            const result = await this.model.obtenerCitaPorId(id);
            return {
                code: 0,
                message: "Cita obtenida exitosamente",
                data: result.rows[0],
            };
        } catch (error) {
            console.error("Error al obtener la cita:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    async crearCita(params) {
        try {
            CitaValidation.validateCreate(params); // Validar los datos
            const result = await this.model.crearCita(params);
            return {
                code: 0,
                message: "Cita creada exitosamente",
                data: result.rows[0],
            };
        } catch (error) {
            console.error("Error al crear la cita:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    async actualizarCita(id, params) {
        try {
            CitaValidation.validateUpdate(id, params); // Validar datos
            const result = await this.model.actualizarCita(id, params);
            return {
                code: 0,
                message: "Cita actualizada exitosamente",
                data: result.rows[0],
            };
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    async actualizarEstadoCita(id, estadoId) {
        try {
            CitaValidation.validateUpdateEstado(id, estadoId); // Validar datos
            const result = await this.model.actualizarEstadoCita(id, estadoId);
            return {
                code: 0,
                message: "Estado de la cita actualizado exitosamente",
                data: result.rows[0],
            };
        } catch (error) {
            console.error("Error al actualizar el estado de la cita:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    async obtenerConteoDeCitasCompletadasYEliminadas() {
        try {
            const result = await this.model.obtenerConteoDeCitasCompletadasYEliminadas();
            return {
                code: 0,
                message: "Conteo obtenido exitosamente",
                data: result.rows[0],
            };
        } catch (error) {
            console.error("Error al obtener el conteo de citas:", error);
            return { code: 1, message: error.message, data: null };
        }
    }

    async eliminarCita(id) {
        try {
            CitaValidation.validateId(id); // Validar el ID
            const result = await this.model.eliminarCita(id);
            return {
                code: 0,
                message: "Cita eliminada exitosamente",
                data: result.rows[0],
            };
        } catch (error) {
            console.error("Error al eliminar la cita:", error);
            return { code: 1, message: error.message, data: null };
        }
    }
}

module.exports = Cita;
