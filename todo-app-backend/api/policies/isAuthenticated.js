const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  // Extraction de l'en-tête Authorization
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.forbidden({ error: 'Format Authorization invalide' });
  }

  // Vérification du token
  try {
    const payload = jwt.verify(token, sails.config.custom.jwtSecret);
    req.user = payload;
    return proceed();    
  } catch (err) {
    // Test avec forbidden comme message d'erreur
    return res.forbidden({ error: 'Token invalide ou expiré' });
  }
};
