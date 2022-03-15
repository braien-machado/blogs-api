const { Op } = require('sequelize');
const { BlogPost } = require('../models');
const { PostCategory } = require('../models');

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

const getPostsBySearchTerm = async (string) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: {
          [Op.substring]: string,
        } },
        { content: {
          [Op.substring]: string,
        } },
      ],
    },
    include: ['user', { association: 'categories', through: { attributes: [] } }] });

  return posts;
};

const createPostCategory = async (newPostCategory) => {
  const postCategory = await PostCategory.create(newPostCategory);

  return postCategory;
};

const createPost = async (newPost) => {
  const post = await BlogPost.create(newPost);

  return post;
};

module.exports = {
  createPostCategory,
  getPostsBySearchTerm,
  createPost,
  getAllPosts,
  getPostByParam,
};
