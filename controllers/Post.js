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

const getPostBySearchTerm = async (req, res, next) => {
  try {
    const { q: searchTerm } = req.query;
    let posts;    
    if (!searchTerm) {
      posts = await Post.getAllPosts();
    } else {
      posts = await Post.getPostsBySearchTerm(searchTerm);
    }

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userId } = req;

    const { id } = await Post.createPost({ title, content, categoryIds, userId });
    await Promise.all(categoryIds
      .map((categoryId) => Post.createPostCategory({ postId: id, categoryId })));

    res.status(201).json({ id, title, content, userId });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    await Post.updatePost({ title, content }, id);
    const { categories } = await Post.getPostByParam('id', id);

    res.status(200).json({ title, content, userId: parseInt(id, 10), categories });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Post.deletePost(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  updatePost,
  getPostBySearchTerm,
  getPostById,
  deletePost,
  getAllPosts,
};
