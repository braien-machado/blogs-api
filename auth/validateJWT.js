const jwt = require('jsonwebtoken');

const { User } = require('../models');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const decoded = jwt.verify(token, secret);

    const user = await User.findOne({ where: {
      id: decoded.data.id,
    } });

    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });

    req.userId = user.id;
    next();
  } catch (error) {
    error.code = 401;
    error.message = 'Expired or invalid token';
    
    next(error);
  }
};
