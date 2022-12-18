import express from 'express';
import UserController from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(UserController.registerUser).get(protect, admin, UserController.getUsers);
router.route('/:id').delete(protect, admin, UserController.deleteUser);
router.route('/login').post(UserController.authUser);
router.route('/profile').get(protect, UserController.getUserProfile).put(protect, UserController.updateUserProfile);

export default router;
