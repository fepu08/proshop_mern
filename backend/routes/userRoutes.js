import express from 'express';
import UserController from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(UserController.registerUser);
router.route('/login').post(UserController.authUser);
router.route('/profile').get(protect, UserController.getUserProfile);

export default router;
