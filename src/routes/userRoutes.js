const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Route pour la page d'inscription
router.get('/register', (req, res) => {
    res.clearCookie('token'); // Supprime le cookie du token
    res.render('register'); // Affiche la page d'inscription
  });

// Route pour l'enregistrement de l'utilisateur
router.post('/register', userController.register);

// Route pour la page de connexion
router.get('/login', (req, res) => {
    res.clearCookie('token'); // Supprime le cookie du token
    res.render('login'); // Affiche la page de connexion
  });

// Route pour connecter l'utilisateur
router.post('/login', userController.login);

router.get('/dashboard', auth, userController.dashboard);


router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Supprime le cookie contenant le token
    res.redirect('/users/login'); // Redirige vers la page de connexion
});
  

module.exports = router;
