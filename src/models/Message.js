const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  conversation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'conversations',
      key: 'id',
    },
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Message',
  tableName: 'messages',
  timestamps: true,
});

// Associations (définies après l'importation des modèles)
const Conversation = require('./Conversation');
const User = require('./User');

//Message.belongsTo(Conversation, { foreignKey: 'conversation_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });

module.exports = Message;
