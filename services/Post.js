const { BlogPost } = require('../models');

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: ['user', { association: 'categories', through: { attributes: [] } }] });

  return posts;
};

module.exports = {
  getAllPosts,
};
