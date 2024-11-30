// controllers/userController.js
const UserService = require('../services/userService');

const userService = new UserService();

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await userService.login(username, password, req.session);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const result = await userService.register(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  console.log('Estado de la sesión antes de destruir:', req.session);
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión');
    }
    res.send({ success: true });
  });
};