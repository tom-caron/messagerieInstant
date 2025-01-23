const express = require('express');
const auth = require('../middleware/auth');
const conversationController = require('../controllers/conversationController');

const router = express.Router();

router.get('/start/:userId', auth, conversationController.startConversation);

router.get('/', auth, conversationController.showConversation);

router.get('/:conversationId', auth, conversationController.viewConversation)

router.post('/:conversationId/messages', auth, conversationController.sendMessage);

module.exports = router;
