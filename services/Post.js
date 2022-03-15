const { Op } = require('sequelize');
const { BlogPost } = require('../models');
const { PostCategory } = require('../models');

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: ['user', { association: 'categories', through: { attributes: [] } }] });

  return posts;
};

const getPostByParam = async (column, value, transaction) => {
  const post = await BlogPost.findOne({
    where: { [column]: value },
    include: ['user', { association: 'categories', through: { attributes: [] } }] },
    { transaction });

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

const createPostCategory = async (newPostCategory, transaction) => {
  const postCategory = await PostCategory.create(newPostCategory, { transaction });

  return postCategory;
};

const createPost = async (newPost, transaction) => {
  const post = await BlogPost.create(newPost, { transaction });

  return post;
};

const updatePost = async (infoToUpdate, id, transaction) => {
  await BlogPost.update(infoToUpdate, {
    where: { id },
  }, { transaction });
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  deletePost,
  updatePost,
  createPostCategory,
  getPostsBySearchTerm,
  createPost,
  getAllPosts,
  getPostByParam,
};
