const searchForError = (reqParams) => {
  const { title, content, categoryIds } = reqParams;

  switch (true) {
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

    const error = searchForError({ title, content, categoryIds });

    if (error) return next(error);

    next();
  } catch (error) {
    next(error);
  }
};