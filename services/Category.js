const { Category } = require('../models');

const createCategory = async (newCategoryInfo) => {
  const newCategory = await Category.create(newCategoryInfo);

  return newCategory;
};

const getCategoryByParam = async (column, value) => {
  const category = await Category.findOne({ where: { [column]: value } });
  
  if (category) return category.dataValues;
  return {};
};

module.exports = {
  createCategory,
  getCategoryByParam,
};
