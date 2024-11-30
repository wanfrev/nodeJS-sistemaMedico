const authorize = (allowedProfileIds) => {
    return (req, res, next) => {
      const userProfileId = req.session.userProfile;
      if (allowedProfileIds.includes(userProfileId)) {
        next();
      } else {
        res.status(403).json({ error: 'Acceso denegado' });
      }
    };
  };
  
  module.exports = authorize;
  