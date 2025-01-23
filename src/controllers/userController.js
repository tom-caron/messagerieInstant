const userService = require('../services/userService');
const conversationService = require('../services/conversationService');

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
    const resultUser = await userService.getAllUsersExceptCurrent(currentUserId);
    const resultConversation = await conversationService.getAllConversations(currentUserId);
  
    if (resultUser.success) {
      res.render('dashboard', { 
        user: req.user, // Infos de l'utilisateur connecté
        users: resultUser.data, // Liste des autres utilisateurs
        totalUser: resultUser.count,
        totalConversation: resultConversation.count
      });
    } else {
      res.render('dashboard', { 
        user: req.user, 
        users: [], 
        error: resultUser.message,
        totalUser: resultUser.count
      });
    }
  };
  

module.exports = { register, login, dashboard };
