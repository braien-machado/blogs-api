const Post = require('../services/Post');

const searchForError = (reqParams) => {
  const { title, content, categoryIds, userId, creatorId } = reqParams;

  switch (true) {
    case (userId !== creatorId):
      return { code: 401, message: 'Unauthorized user' };
    case (!title):
      return { code: 400, message: '"title" is required' };
    case (!content):
      return { code: 400, message: '"content" is required' };
    case Boolean(categoryIds):
      return { code: 400, message: 'Categories cannot be edited' };
    default:
      break;
  }
};

module.exports = async (req, _res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { params: { id: postId }, userId } = req;
    const { userId: creatorId } = await Post.getPostByParam('id', postId);

    const error = searchForError({ title, content, categoryIds, userId, creatorId });

    if (error) return next(error);

    next();
  } catch (error) {
    next(error);
  }
};