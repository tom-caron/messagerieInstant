const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token; // Lire le token depuis les cookies
  if (!token) {
    return res.status(401).redirect('/users/login'); // Rediriger si non connecté
  }

  try {
    const decoded = jwt.verify(token, 'mysecretkey');
    req.user = decoded; // Stocker les données utilisateur dans `req.user`
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    return res.status(401).redirect('/users/login');
  }
};
