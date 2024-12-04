
class CitaBD {
    constructor(db) {
        this.db = db; // Dependencia para la base de datos
    }

    async obtenerCitas() {
        const query = `
            SELECT 
                a.appointment_id,
                a.appointment_hr,
                a.appointment_dt,
                p.person_name AS person_name,
                ep.person_name AS employer_name,
                pos.position_na AS position_name,
                s.speciality_na AS employer_speciality,
                d.department_de AS department_name,
                st.status_de AS status
            FROM 
                appointment a
            JOIN 
                person p ON a.person_id = p.person_id
            JOIN 
                position pos ON a.employer_id = pos.position_id
            JOIN 
                person ep ON pos.position_id = ep.person_id
            JOIN 
                department d ON a.department_id = d.department_id
            JOIN 
                employer_speciality es ON pos.position_id = es.employer_id
            JOIN 
                speciality s ON es.speciality_id = s.speciality_id
            JOIN 
                status st ON a.id_status = st.id_status
        `;
        return this.db.query(query);
    }

    async obtenerCitaPorId(id) {
        const query = `
            SELECT 
                a.appointment_id,
                a.appointment_hr,
                a.appointment_dt,
                p.person_name AS person_name,
                ep.person_name AS employer_name,
                pos.position_na AS position_name,
                s.speciality_na AS employer_speciality,
                d.department_de AS department_name,
                st.status_de AS status
            FROM 
                appointment a
            JOIN 
                person p ON a.person_id = p.person_id
            JOIN 
                position pos ON a.employer_id = pos.position_id
            JOIN 
                person ep ON pos.position_id = ep.person_id
            JOIN 
                department d ON a.department_id = d.department_id
            JOIN 
                employer_speciality es ON pos.position_id = es.employer_id
            JOIN 
                speciality s ON es.speciality_id = s.speciality_id
            JOIN 
                status st ON a.id_status = st.id_status
            WHERE 
                a.appointment_id = $1
        `;
        return this.db.query(query, [id]);
    }

    async crearCita(params) {
        const query = `
            INSERT INTO appointment (appointment_hr, appointment_dt, person_id, employer_id, department_id, id_status) 
            VALUES ($1, $2, $3, $4, $5, 1) RETURNING *;
        `;
        const { hora, fecha, personaId, doctorId, departamentoId } = params;
        return this.db.query(query, [hora, fecha, personaId, doctorId, departamentoId]);
    }

    async actualizarCita(id, params) {
        const query = `
            UPDATE appointment 
            SET appointment_hr = $1, appointment_dt = $2, person_id = $3, employer_id = $4, department_id = $5 
            WHERE appointment_id = $6 RETURNING *;
        `;
        const { hora, fecha, personaId, doctorId, departamentoId } = params;
        return this.db.query(query, [hora, fecha, personaId, doctorId, departamentoId, id]);
    }

    async eliminarCita(id) {
        const query = `DELETE FROM appointment WHERE appointment_id = $1 RETURNING *;`;
        return this.db.query(query, [id]);
    }

    async obtenerConteoDeCitasCompletadasYEliminadas() {
        const query = `
        SELECT 
            COUNT(*) FILTER (WHERE id_status = 2) AS completed_count,
            COUNT(*) FILTER (WHERE id_status = 3) AS deleted_count
        FROM appointment;
    `;
        return this.db.query(query);
    }

    async obtenerConteoDeCitasCompletadasYEliminadas() {
        const query = `
        SELECT 
            COUNT(*) FILTER (WHERE id_status = 2) AS completed_count,
            COUNT(*) FILTER (WHERE id_status = 3) AS deleted_count
        FROM appointment;
    `;
        return this.db.query(query);
    }

}

module.exports = CitaBD;
