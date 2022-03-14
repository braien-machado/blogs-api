const User = require('../services/User');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByParam('email', email);

    if (user.password === password) {
      const token = await User.generateToken(user);
  
      return res.status(200).json({ token });
    }

    const err = { code: 400, message: 'Invalid fields' };
    return next(err);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
