'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      required: true,
      validate: {
        isEmail: true,
      },
    },
    password: DataTypes.STRING
  }, {});
  users.associate = function ({ comments }) {
    users.hasMany(comments, { foreignKey: 'creator', allowNull: false });
  };
  return users;
};
