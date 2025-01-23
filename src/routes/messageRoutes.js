const express = require('express');
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/:idMessage/edit', auth, messageController.editMessage);

router.post('/:idMessage/delete', auth, messageController.deleteMessage);

module.exports = router;