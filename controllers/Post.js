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
  try {
    const { id } = req.params;
    const post = await Post.getPostByParam('id', id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });
    
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPostById,
  getAllPosts,
};
