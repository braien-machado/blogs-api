const { User } = require('../models');

const findByEmail = async (email) => {
  try {
    const user = await User.findAll({ where: { email } });

    if (user.length > 0) return true;
    return false;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findByEmail,
};
