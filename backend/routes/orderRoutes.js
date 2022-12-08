import express from 'express';
import OrderController from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, OrderController.addOrderItems);
router.route('/:id').get(protect, OrderController.getOrderById);
router.route('/:id/pay').put(protect, OrderController.updateOrderToPaid);

export default router;
