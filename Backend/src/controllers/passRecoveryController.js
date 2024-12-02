const PassRecoveryService = require('../services/passRecoveryService');

const passRecoveryService = new PassRecoveryService();

exports.sendRecoveryEmail = async (req, res) => {
  const { email } = req.body;
  const host = req.get('host');
  try {
    const message = await passRecoveryService.sendRecoveryEmail(email, host);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const message = await passRecoveryService.resetPassword(token, newPassword);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
