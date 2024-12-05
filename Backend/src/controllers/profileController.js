
const db = require('../../DB/connection');
const queries = require('../json/queries.json');

// Obtener todos los perfiles
exports.getAllProfiles = (req, res) => {
  db.query(queries.profile.getAll, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener perfiles de usuario');
    } else {
      res.json(result.rows);
    }
  });
};

// Crear un nuevo perfil
exports.createProfile = (req, res) => {
  const { name, description } = req.body;
  db.query(queries.profile.create, [name, description], (err, result) => {
    if (err) {
      res.status(500).send('Error al crear perfil de usuario');
    } else {
      res.status(201).send('Perfil de usuario creado correctamente');
    }
  });
};

// Eliminar un perfil de usuario
exports.deleteProfile = (req, res) => {
  const { id } = req.params;
  db.query(queries.profile.delete, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar perfil de usuario');
    } else {
      res.status(200).send('Perfil de usuario eliminado correctamente');
    }
  });
};
