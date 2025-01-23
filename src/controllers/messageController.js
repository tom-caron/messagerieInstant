const messageService = require('../services/messageService');

const editMessage = async(req, res) => {
    const { idMessage } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const result = await messageService.editMessage(idMessage, userId, content);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.redirect(`/conversations/${result.message.conversation_id}`);
};

const deleteMessage = async(req, res) => {
    const { idMessage } = req.params;
    const userId = req.user.id;

    const result = await messageService.deleteMessage(idMessage, userId);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.redirect(`/conversations/${result.message.conversation_id}`);
};

module.exports = {
    editMessage,
    deleteMessage
  };