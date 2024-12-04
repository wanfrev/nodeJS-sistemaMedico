// class Cita {
//   constructor(db) {
//     this.db = db; // Dependencia para interactuar con la base de datos
//   }
//
//   // Crear una nueva cita
//   async crearCita(params) {
//     if (!params) throw new Error("Parámetros no proporcionados.");
//     const { fecha, hora, personaId, doctorId } = params;
//     try {
//       const result = await this.db.exe("crearCita", [fecha, hora, personaId, doctorId]);
//       return result.rows.length > 0
//           ? { mensaje: "Cita creada exitosamente", data: result.rows }
//           : { mensaje: "No se pudo crear la cita" };
//     } catch (error) {
//       throw new Error("Error al crear la cita: " + error.message);
//     }
//   }
//
//   // Obtener todas las citas
//   async obtenerCitas() {
//     try {
//       const result = await this.db.exe("obtenerCitas");
//       return result.rows.length > 0 ? result.rows : [];
//     } catch (error) {
//       throw new Error("Error al obtener citas: " + error.message);
//     }
//   }
//
//   // Actualizar una cita
//   async actualizarCita(id, params) {
//     if (!id || !params) throw new Error("ID o parámetros no proporcionados.");
//     const { fecha, hora, personaId, doctorId } = params;
//     try {
//       const result = await this.db.exe("actualizarCita", [id, fecha, hora, personaId, doctorId]);
//       return result.rowCount > 0
//           ? { mensaje: "Cita actualizada exitosamente" }
//           : { mensaje: "No se encontró la cita para actualizar" };
//     } catch (error) {
//       throw new Error("Error al actualizar la cita: " + error.message);
//     }
//   }
//
//   // Eliminar una cita
//   async eliminarCita(id) {
//     if (!id) throw new Error("ID no proporcionado.");
//     try {
//       const result = await this.db.exe("eliminarCita", [id]);
//       return result.rowCount > 0
//           ? { mensaje: "Cita eliminada exitosamente" }
//           : { mensaje: "No se encontró la cita para eliminar" };
//     } catch (error) {
//       throw new Error("Error al eliminar la cita: " + error.message);
//     }
//   }
// }

module.exports = Cita;

const CitaDB = require("./citaBD");
const CitaValidation = require("./citaValidation");

class Cita {
  constructor(db) {
    this.model = new CitaDB(db); // Instancia del modelo con la base de datos
  }

  // Crear una nueva cita
  async crearCita(params) {
    try {
      CitaValidation.validateCreate(params); // Validar los datos
      const result = await this.model.crearCita(params); // Usar el modelo
      return {
        code: 0,
        message: "Cita creada exitosamente",
        data: result.rows,
      };
    } catch (error) {
      console.error("Error al crear la cita:", error);
      return { code: 1, message: error.message, data: null };
    }
  }

  // Obtener todas las citas
  async obtenerCitas() {
    try {
      const result = await this.model.obtenerCitas(); // Usar el modelo
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

  // Actualizar una cita
  async actualizarCita(id, params) {
    try {
      const result = await this.model.actualizarCita(id, params); // Usar el modelo
      return result.rowCount > 0
          ? { code: 0, message: "Cita actualizada exitosamente" }
          : { code: 1, message: "No se encontró la cita para actualizar" };
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
      return { code: 1, message: error.message, data: null };
    }
  }

  // Eliminar una cita
  async eliminarCita(id) {
    try {
      const result = await this.model.eliminarCita(id); // Usar el modelo
      return result.rowCount > 0
          ? { code: 0, message: "Cita eliminada exitosamente" }
          : { code: 1, message: "No se encontró la cita para eliminar" };
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
      return { code: 1, message: error.message, data: null };
    }
  }
}

module.exports = Cita;
