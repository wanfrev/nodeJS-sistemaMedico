class Cita {
  constructor(db) {
    this.db = db;
  }

  async Crear(params) {
    console.log('Parámetros recibidos en Crear:', params);
    if (!params) throw new Error("Parámetros no proporcionados.");
    const { appointmentDate, appointmentTime, personId, EmployerId } = params;
    try {
      const result = await this.db.exe('agendarCita', [appointmentDate, appointmentTime, personId, EmployerId]);
      if (result && result.rows.length > 0) {
        console.log('Cita agendada:', result.rows[0]);
        return { msg: "Cita agendada con éxito.", cita: result.rows[0] };
      } else {
        return { msg: "No se pudo agendar la cita." };
      }
    } catch (error) {
      console.error('Error agendando cita:', error);
      return { msg: "Error agendando la cita." };
    }
  }
  
  async Borrar(params) {
    console.log("Borrando cita con los siguientes parámetros:", params);
    return { msg: "Cita borrada con éxito." };
  }

  async Actualizar(params) {
    console.log("Actualizando cita con los siguientes parámetros:", params);
    return { msg: "Cita actualizada con éxito." };
  }

  async Obtener(params) {
    console.log("Obteniendo cita con los siguientes parámetros:", params);
    return { msg: "Cita obtenida con éxito." };
  }

  async ObtenerCitasMedico(params) {
    console.log("Obteniendo citas para el médico con los siguientes parámetros:", params);
    return { msg: "Citas obtenidas con éxito." };
  }
}

module.exports = Cita;
