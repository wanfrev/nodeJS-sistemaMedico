const db = require('../../DB/connection');

// Obtener todos los departamentos
exports.getAllDepartments = (req, res) => {
  db.query('SELECT * FROM "public".department', (err, result) => {
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
  db.query('INSERT INTO "public".department (department_de, organization_id) VALUES ($1, $2)', [name, organizationId], (err, result) => {
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
  db.query('DELETE FROM "public".department WHERE department_id = $1', [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar departamento');
    } else {
      res.status(200).send('Departamento eliminado correctamente');
    }
  });
};
