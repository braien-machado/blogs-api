const { BlogPost, Category } = require('../models');

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: ['user', { model: Category, as: 'categories', through: { attributes: [] } }] });

  return posts;
};

module.exports = {
  getAllPosts,
};
