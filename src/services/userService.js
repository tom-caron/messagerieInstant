const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { Sequelize } = require('sequelize');


const registerUser = async ({ name, email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user.id, email: user.email, name : user.name }, 'motDePasse', { expiresIn: '1h' });

    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password, res) => {
    try {
      // Vérification de l'utilisateur
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { success: false, message: 'Email or password is incorrect.' };
      }
  
      // Comparer le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { success: false, message: 'Email or password is incorrect.' };
      }
  
      // Créer le token
      const token = jwt.sign({ id: user.id, email: user.email, name : user.name }, 'mysecretkey', { expiresIn: '1d' });
  
      // Stocker le token dans un cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 jour
      });
  
      return { success: true, message: 'Login successful.', user };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'An error occurred during login.' };
    }
  };

  const getAllUsersExceptCurrent = async (currentUserId) => {
    try {

      const users = await User.findAll({
        where: {
          id: { [Sequelize.Op.ne]: currentUserId }, // Exclure l'utilisateur connecté
        },
        attributes: ['id', 'email'], // On ne récupère que les champs nécessaires
      });

      const count = await User.count({
        where: {
          id: { [Sequelize.Op.ne]: currentUserId }, // Exclure l'utilisateur connecté
        },
      });

      return { success: true, data: users, count };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { success: false, message: 'Failed to fetch users' };
    }
  };

module.exports = { registerUser, loginUser, getAllUsersExceptCurrent };
