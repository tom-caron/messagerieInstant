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

const editMessage = async(messageId, userId, newContent) => {
    try {
      // Vérifier si le message existe et appartient à l'utilisateur
      const message = await Message.findOne({ where: { id: messageId, sender_id: userId } });

      if (!message) {
        return { success: false, message: 'Message non trouvé ou accès refusé.' };
      }

      // Mettre à jour le contenu du message
      message.content = newContent;
      await message.save();

      return { success: true, message: 'Message modifié avec succès.', message };
    } catch (error) {
      console.error('Erreur lors de la modification du message:', error);
      return { success: false, message: 'Erreur lors de la modification du message.' };
    }
};

const deleteMessage = async(messageId, userId) => {
    try {
        console.log(messageId);
      // Vérifier si le message existe et appartient à l'utilisateur
      const message = await Message.findOne({ where: { id: messageId, sender_id: userId } });

      if (!message) {
        return { success: false, message: 'Message non trouvé ou accès refusé.' };
      }

      // Supprimer le message
      await message.destroy();

      return { success: true, message: message };
    } catch (error) {
      console.error('Erreur lors de la suppression du message:', error);
      return { success: false, message: 'Erreur lors de la suppression du message.' };
    }
  }

module.exports = {
    sendMessage,
    editMessage,
    deleteMessage
  };