'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    body: DataTypes.STRING,
    creator: DataTypes.INTEGER
  }, {});
  comments.associate = function ({ replies, users }) {
    comments.hasMany(replies, { foreignKey: 'commentId', allowNull: false });
    comments.belongsTo(users, { foreignKey: 'creator', allowNull: false });
  };
  return comments;
};
