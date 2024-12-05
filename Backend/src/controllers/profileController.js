const db = require('../../DB/connection');

// Obtener todos los perfiles
exports.getAllProfiles = (req, res) => {
  db.query('SELECT * FROM "public".profile', (err, result) => {
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
  db.query('INSERT INTO "public".profile (profile_na, profile_de) VALUES ($1, $2)', [name, description], (err, result) => {
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
  db.query('DELETE FROM "public".profile WHERE profile_id = $1', [id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar perfil de usuario');
    } else {
      res.status(200).send('Perfil de usuario eliminado correctamente');
    }
  });
};
