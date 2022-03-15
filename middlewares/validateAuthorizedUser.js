const Post = require('../services/Post');

module.exports = async (req, _res, next) => {
  try {
    const { params: { id: postId }, userId } = req;
    const post = await Post.getPostByParam('id', postId);

    if (!post) return next({ code: 404, message: 'Post does not exist' });
    const { userId: creatorId } = post;

    if (userId !== creatorId) return next({ code: 401, message: 'Unauthorized user' });

    next();
  } catch (error) {
    next(error);
  }
};