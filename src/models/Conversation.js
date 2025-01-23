const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user1_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user2_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Conversation',
  tableName: 'conversations',
  timestamps: true,
});

// Associations (définies après l'importation des modèles)
const Message = require('./Message');
const User = require('./User');

Conversation.hasMany(Message, { foreignKey: 'conversation_id' });
Conversation.belongsTo(User, { as: 'User1', foreignKey: 'user1_id' });
Conversation.belongsTo(User, { as: 'User2', foreignKey: 'user2_id' });

module.exports = Conversation;
