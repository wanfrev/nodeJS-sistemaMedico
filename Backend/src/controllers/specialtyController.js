
const db = require('../../DB/dbHandler');
const queries = require('../json/queries.json');

// Obtener todas las especialidades
exports.getAllSpecialties = (req, res) => {
  db.query(queries.specialty.getAll, (err, result) => {
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
  db.query(queries.specialty.create, [name], (err, result) => {
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
  db.query(queries.specialty.delete, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar especialidad');
    } else {
      res.status(200).send('Especialidad eliminada correctamente');
    }
  });
};
