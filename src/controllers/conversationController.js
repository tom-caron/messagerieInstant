const conversationService = require('../services/conversationService');
const messageService = require ('../services/messageService');

// Route pour démarrer une conversation
const startConversation = async (req, res) => {
  const currentUserId = req.user.id;
  const otherUserId = req.params.userId;

  const conversation = await conversationService.startConversation(currentUserId, otherUserId);

  // Rediriger vers la conversation une fois qu'elle est démarrée
  res.redirect(`/conversations/${conversation.id}`);
};

// Route pour afficher une conversation
const showConversation = async (req, res) => {
    const currentUserId = req.user.id;
  
    const result = await conversationService.getAllConversations(currentUserId);
  
    // Rediriger vers la conversation une fois qu'elle est démarrée
    res.render(`conversations`, { conversations: result.conversations, userId : currentUserId });
};

const viewConversation = async (req, res) => {
    const { conversationId } = req.params;
    const userId = req.user.id; // L'utilisateur connecté
    
    try {

    const conversation = await conversationService.getConversationById(conversationId, userId);
  
      res.render('conversation', {
        conversation,
        userId
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur.');
    }
  };

// Route pour envoyer un message
const sendMessage = async (req, res) => {
    const { conversationId } = req.params;
    const { content } = req.body;
    const senderId = req.user.id; // L'utilisateur connecté
  
    try {
      // Vérifier si la conversation existe
      const conversation = await conversationService.getConversationById(conversationId, req.user.id);
      if (!conversation) {
        return res.status(404).send('Conversation introuvable.');
      }
  
      // Créer le message
      await messageService.sendMessage(conversationId, senderId, content);
  
      // Rediriger vers la conversation
      res.redirect(`/conversations/${conversationId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur serveur.');
    }
  };

module.exports = {
  startConversation,
  sendMessage,
  showConversation,
  viewConversation,
};
