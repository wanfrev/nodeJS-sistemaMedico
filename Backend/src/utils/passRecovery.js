require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dbHandler = require('../../DB/dbHandler');
const logger = require('../utils/logger');

async function sendRecoveryEmail(username) {
  try {
    // Obtener el correo electrónico del usuario desde la tabla person
    const userResult = await dbHandler.runQuery(
        `
          SELECT p.person_eml
          FROM users u
                 JOIN person p ON u.person_id = p.person_id
          WHERE u.username = $1
        `,
        [username]
    );

    if (userResult.length === 0) {
      throw new Error('Usuario no encontrado.');
    }
    const userEmail = userResult[0].person_eml;

    // Generar un código de recuperación
    const recoveryCode = crypto.randomBytes(3).toString('hex'); // Código de 6 caracteres

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      to: userEmail,
      from: process.env.GMAIL_USER,
      subject: 'Código de recuperación de contraseña',
      text: `Has recibido este correo porque tú (o alguien más) ha solicitado restablecer la contraseña de tu cuenta.\n\n
      Tu código de recuperación es: ${recoveryCode}\n\n
      Si no solicitaste esto, ignora este correo y tu contraseña permanecerá sin cambios.\n`,
    };

    await transporter.sendMail(mailOptions);
    return 'Correo de recuperación enviado.';
  } catch (error) {
    logger.error('Error al enviar el correo de recuperación:', error);
    throw error;
  }
}

module.exports = sendRecoveryEmail;
