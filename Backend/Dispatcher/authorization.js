const logger = require('../src/utils/logger'); // Importación del logger

const authorize = (allowedProfileIds) => {
    return (req, res, next) => {
        const userProfileId = req.session.userProfile;
        if (allowedProfileIds.includes(userProfileId)) {
            logger.info(`Acceso permitido para userProfileId: ${userProfileId}`);
            next();
        } else {
            logger.warn(`Acceso denegado para userProfileId: ${userProfileId}`);
            res.status(403).json({ error: 'Acceso denegado' });
        }
    };
};

module.exports = authorize;