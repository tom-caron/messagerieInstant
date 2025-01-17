const userService = require('../services/userService');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { user, token } = await userService.registerUser({ name, email, password });
    res.render('dashboard', { user, token, message: 'Inscription réussi!' });
  } catch (error) {
    res.render('register', { error: error.message });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    // Appel du service pour gérer la connexion
    const result = await userService.loginUser(email, password, res);
  
    if (result.success) {
      res.redirect('/users/dashboard');
    } else {
      res.render('login', { error: result.message });
    }
  };

  const dashboard = async (req, res) => {
    const currentUserId = req.user.id; // L'ID de l'utilisateur connecté
    const result = await userService.getAllUsersExceptCurrent(currentUserId);
  
    if (result.success) {
      res.render('dashboard', { 
        user: req.user, // Infos de l'utilisateur connecté
        users: result.data, // Liste des autres utilisateurs
      });
    } else {
      res.render('dashboard', { 
        user: req.user, 
        users: [], 
        error: result.message 
      });
    }
  };
  

module.exports = { register, login, dashboard };
