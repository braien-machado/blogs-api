const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    createdAt: { type: DataTypes.DATE, field: 'published' },
    updatedAt: { type: DataTypes.DATE, field: 'updated' },
  }, { tableName: 'BlogPosts' });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, {
      foreignKey: 'userId', as: 'posts',
    });
  };

  return blogPost;
};

module.exports = BlogPost;