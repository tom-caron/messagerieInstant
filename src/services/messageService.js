const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const { Sequelize } = require('sequelize');

// Fonction pour envoyer un message
const sendMessage = async (conversation_id, sender_id, content) => {
    const message = await Message.create({
      conversation_id,
      sender_id,
      content,
    });
  
    return message;
  };

module.exports = {
    sendMessage
  };