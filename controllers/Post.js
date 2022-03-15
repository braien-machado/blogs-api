const Post = require('../services/Post');

const getAllPosts = async (_req, res, next) => {
  try {
    const posts = await Post.getAllPosts();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {

};

module.exports = {
  getPostById,
  getAllPosts,
};
