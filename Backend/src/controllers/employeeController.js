
const db = require('../../DB/connection');
const queries = require('../json/queries.json');

// Obtener todos los empleados
exports.getAllEmployees = (req, res) => {
  db.query(queries.employee.getAll, (err, result) => {
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
  db.query(queries.employee.create, [personId, positionId], (err, result) => {
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
  db.query(queries.employee.delete, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar empleado');
    } else {
      res.status(200).send('Empleado eliminado correctamente');
    }
  });
};
