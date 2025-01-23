const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const { Sequelize } = require('sequelize');

// Fonction pour créer une conversation ou récupérer une existante
const startConversation = async (user1_id, user2_id) => {
  let conversation = await Conversation.findOne({
    where: {
      [Sequelize.Op.or]: [
        { user1_id, user2_id },
        { user1_id: user2_id, user2_id: user1_id },
      ],
    },
  });

  // Si la conversation n'existe pas, on la crée
  if (!conversation) {
    conversation = await Conversation.create({
      user1_id,
      user2_id,
    });
  }

  return conversation;
};

const getAllConversations = async (currentUserId) => {

  // Récupérer toutes les conversations de l'utilisateur
  const conversations = await Conversation.findAll({
    where: {
      [Sequelize.Op.or]: [{ user1_id: currentUserId }, { user2_id: currentUserId }],
    },
    include: [
      {
        model: User,
        as: 'User1',
        attributes: ['id', 'name', 'email'],
      },
      {
        model: User,
        as: 'User2',
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  const count = await User.count({
    where: {
      id: { [Sequelize.Op.ne]: currentUserId }, // Exclure l'utilisateur connecté
    },
  });

  // Passer les conversations à la vue
  return {conversations, count}
};

const getConversationById = async (conversationId, currentUser) => {
  // Récupérer la conversation et ses messages
  const conversation = await Conversation.findByPk(conversationId, {
  include: [
    { model: User, as: 'User1' },
    { model: User, as: 'User2' },
    { model: Message, include: [User] }
  ]
  });
    
  // Vérifier si l'utilisateur fait partie de cette conversation
  if (conversation.User1.id !== currentUser && conversation.User2.id !== currentUser) {
    return res.status(403).send('Accès interdit à cette conversation.');
  }

  return conversation;
};

module.exports = {
  startConversation,
  getAllConversations,
  getConversationById
};
