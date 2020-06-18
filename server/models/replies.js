'use strict';
module.exports = (sequelize, DataTypes) => {
  const replies = sequelize.define('replies', {
    commentId: DataTypes.INTEGER,
    reply: DataTypes.STRING
  }, {});
  replies.associate = function (models) {
    replies.belongsTo(models.comments, { foreignKey: 'commentId', allowNull: false })
  };
  return replies;
};
