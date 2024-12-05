const db = require('../../DB/dbHandler');

// Obtener todas las especialidades
exports.getAllSpecialties = (req, res) => {
  db.query('SELECT * FROM "public".speciality', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener especialidades');
    } else {
      res.json(result.rows);
    }
  });
};

// Crear una nueva especialidad
exports.createSpecialty = (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO "public".speciality (speciality_na) VALUES ($1)', [name], (err, result) => {
    if (err) {
      res.status(500).send('Error al crear especialidad');
    } else {
      res.status(201).send('Especialidad creada correctamente');
    }
  });
};

// Eliminar una especialidad
exports.deleteSpecialty = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM "public".speciality WHERE speciality_id = $1', [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar especialidad');
    } else {
      res.status(200).send('Especialidad eliminada correctamente');
    }
  });
};
