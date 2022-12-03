import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export default class UserController {
  // @desc    Auth user & get token
  // @route   POST /api/users/login
  // @access  Public
  static async authUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        return res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(401);
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      return next(err);
    }
  }

  // @desc    Get user profile
  // @route   GET /api/users/profile
  // @access  Private
  static async getUserProfile(req, res, next) {
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(404);
        throw new Error('User not found');
      }
    } catch (err) {
      return next(err);
    }
  }
}
