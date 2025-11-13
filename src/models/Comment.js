module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {paranoid: true, indexes: [{fields: ['postId']}]});

  // Define relationships
  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
  };

  return Comment;
};