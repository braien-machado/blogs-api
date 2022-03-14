const PostCategory = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {},
  { tableName: 'PostsCategories', timestamps: false });

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postCategory;
};

module.exports = PostCategory;