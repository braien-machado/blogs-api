const { BlogPost } = require('../models');

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: ['user', { association: 'categories', through: { attributes: [] } }] });

  return posts;
};

const getPostByParam = async (column, value) => {
  const post = await BlogPost.findOne({
    where: { [column]: value },
    include: ['user', { association: 'categories', through: { attributes: [] } }] });

  return post;
};

module.exports = {
  getAllPosts,
  getPostByParam,
};
