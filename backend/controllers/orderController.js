import Order from '../models/orderModel.js';
import generateToken from '../utils/generateToken.js';

export default class OrderController {
  // @desc    Create new order
  // @route   POST /api/orders
  // @access  Private
  static async addOrderItems(req, res, next) {
    try {
      const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

      if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
      } else {
        const order = new Order({
          user: req.user._id,
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
      }
    } catch (err) {
      return next(err);
    }
  }

  // @desc    Get order by ID
  // @route   GET /api/orders/:id
  // @access  Private
  static async getOrderById(req, res, next) {
    try {
      const order = await Order.findById(req.params.id).populate('user', 'name email');

      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404);
        throw new Error('Order not found');
      }
    } catch (err) {
      return next(err);
    }
  }
}
