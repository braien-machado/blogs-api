const Category = require('../services/Category');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });

    const categoryAlreadyRegistered = await Category.getCategoryByParam('name', name);
    
    if (categoryAlreadyRegistered.id) {
      const err = { message: 'Category already registered', code: 409 };

      return next(err);
    }

    const newCategory = await Category.createCategory({ name });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (_req, res, next) => {
  try {
    const categories = await Category.getAllCategories();

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
