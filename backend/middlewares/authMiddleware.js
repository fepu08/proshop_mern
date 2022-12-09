import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  try {
    let token = req.get('Authorization').split(' ');

    if (token[0] !== 'Bearer') {
      throw new Error('Not authorized, no token');
    }

    const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401);
    return next(err);
  }
};

const admin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized as an admin');
    }
  } catch (err) {
    return next(err);
  }
};

export { protect, admin };
