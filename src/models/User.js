const sequelizeBcrypt = require("sequelize-bcrypt");
const Temporal = require('sequelize-temporal');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {paranoid: true});

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts",
    });
  };
  // Integrate sequelize-bcrypt
  sequelizeBcrypt(User, {
    field: "password", // secret field to hash, default: 'password'
    rounds: 12, // used to generate bcrypt salt, default: 12
    compare: "authenticate", // method used to compare secrets, default: 'authenticate'
  });

  Temporal(User, sequelize);

  return User;
};
