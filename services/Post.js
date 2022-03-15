const { Op } = require('sequelize');
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

module.exports = {
  getPostsBySearchTerm,
  getAllPosts,
  getPostByParam,
};
