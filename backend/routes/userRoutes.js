import express from 'express';
import UserController from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(UserController.registerUser).get(protect, admin, UserController.getUsers);
router.route('/login').post(UserController.authUser);
router.route('/profile').get(protect, UserController.getUserProfile).put(protect, UserController.updateUserProfile);
router
  .route('/:id')
  .get(protect, admin, UserController.getUserById)
  .delete(protect, admin, UserController.deleteUser)
  .put(protect, admin, UserController.updateUser);

export default router;
