const checkRequiredFieldsForPost = (title, content, categoryIds) => {
  switch (true) {
    case !title:
      return { message: '"title" is required' };
    case !content:
      return { message: '"content" is required' };
    case !categoryIds.length:
      return { message: '"categoryId" is required' };
    default:
  }
};

module.exports = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    
    const error = checkRequiredFieldsForPost(title, content, categoryIds);
    console.log(error);

    if (error) return res.status(400).json(error);

    next();
  } catch (error) {
    next(error);
  }
};