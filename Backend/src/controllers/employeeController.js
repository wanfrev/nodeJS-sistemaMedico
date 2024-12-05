const db = require('../../DB/connection');

// Obtener todos los empleados
exports.getAllEmployees = (req, res) => {
  db.query('SELECT * FROM "public".employer', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener empleados');
    } else {
      res.json(result.rows);
    }
  });
};

// Crear un nuevo empleado
exports.createEmployee = (req, res) => {
  const { personId, positionId } = req.body;
  db.query('INSERT INTO "public".employer (person_id, position_id) VALUES ($1, $2)', [personId, positionId], (err, result) => {
    if (err) {
      res.status(500).send('Error al crear empleado');
    } else {
      res.status(201).send('Empleado creado correctamente');
    }
  });
};

// Eliminar un empleado
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM "public".employer WHERE employer_id = $1', [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar empleado');
    } else {
      res.status(200).send('Empleado eliminado correctamente');
    }
  });
};
