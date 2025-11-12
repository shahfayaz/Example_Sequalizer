module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {paranoid: true});

  // Define relationships
  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
  };

  return Comment;
};