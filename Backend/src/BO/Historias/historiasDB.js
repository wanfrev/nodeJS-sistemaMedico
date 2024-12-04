
class HistoriaDB {
    constructor(db) {
        this.db = db; // Dependencia para la base de datos
    }

    async obtenerHistorias() {
        const query = "SELECT * FROM history";
        return this.db.query(query);
    }

    async obtenerHistoriaPorId(id) {
        const query = "SELECT * FROM history WHERE history_id = $1";
        return this.db.query(query, [id]);
    }

    async crearHistoria(params) {
        const query = `
            INSERT INTO history (history_dt, history_de, employer_id, person_id) 
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        const { fecha, descripcion, doctorId, pacienteId } = params;
        return this.db.query(query, [fecha, descripcion, doctorId, pacienteId]);
    }

    async actualizarHistoria(id, params) {
        const query = `
            UPDATE history 
            SET history_dt = $1, history_de = $2, employer_id = $3, person_id = $4 
            WHERE history_id = $5 RETURNING *;
        `;
        const { fecha, descripcion, doctorId, pacienteId } = params;
        return this.db.query(query, [fecha, descripcion, doctorId, pacienteId, id]);
    }

    async eliminarHistoria(id) {
        const query = "DELETE FROM history WHERE history_id = $1 RETURNING *;";
        return this.db.query(query, [id]);
    }
}

module.exports = HistoriaDB;
