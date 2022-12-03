import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.route('/login').post(UserController.authUser);

export default router;
