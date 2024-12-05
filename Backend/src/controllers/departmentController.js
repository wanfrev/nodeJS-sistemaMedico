
const db = require('../../DB/connection');
const queries = require('../json/queries.json');

// Obtener todos los departamentos
exports.getAllDepartments = (req, res) => {
  db.query(queries.department.getAll, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener departamentos');
    } else {
      res.json(result.rows);
    }
  });
};

// Crear un nuevo departamento
exports.createDepartment = (req, res) => {
  const { name, organizationId } = req.body;
  db.query(queries.department.create, [name, organizationId], (err, result) => {
    if (err) {
      res.status(500).send('Error al crear departamento');
    } else {
      res.status(201).send('Departamento creado correctamente');
    }
  });
};

// Eliminar un departamento
exports.deleteDepartment = (req, res) => {
  const { id } = req.params;
  db.query(queries.department.delete, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar departamento');
    } else {
      res.status(200).send('Departamento eliminado correctamente');
    }
  });
};
