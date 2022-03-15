module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: { type: 'TIMESTAMPS', defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updated: {
      type: 'TIMESTAMPS',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, { tableName: 'BlogPosts', timestamps: false });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    });
  };

  return BlogPost;
};
