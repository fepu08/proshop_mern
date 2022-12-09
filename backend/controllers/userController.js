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

  // @desc    Update user profile
  // @route   PUT /api/users/profile
  // @access  Private
  static async updateUserProfile(req, res, next) {
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
          user.password = req.body.password;
        }

        const updatedUser = await user.save();
        return res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser._id),
        });
      } else {
        res.status(404);
        throw new Error('User not found');
      }
    } catch (err) {
      return next(err);
    }
  }

  // @desc    Register a new user
  // @route   POST /api/users
  // @access  Public
  static async registerUser(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const userExist = await User.findOne({ email });

      if (userExist) {
        res.status(400);
        throw new Error('User already exists');
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    } catch (err) {
      return next(err);
    }
  }

  // @desc    Get all users
  // @route   GET /api/users
  // @access  Private/Admin
  static async getUsers(req, res, next) {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
  }
}
