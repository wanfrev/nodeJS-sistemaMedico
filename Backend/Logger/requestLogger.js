
const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
    res.on('finish', () => {
        logger.info(`Response status: ${res.statusCode} for ${req.method} ${req.url}`);
    });
    next();
};

module.exports = requestLogger;
