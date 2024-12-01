const checkUserAuthentication = (req, res, next) => {
    console.log('Verificando autenticación:', req.session);
    if (req.session.userId && req.session.userProfile) {
        return next();
    } else {
        return res.status(401).send('Acceso denegado');
    }
};

module.exports = { checkUserAuthentication };
