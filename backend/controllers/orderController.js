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

  // @desc    Update order to paid
  // @route   PUT /api/orders/:id/pay
  // @access  Private
  static async updateOrderToPaid(req, res, next) {
    try {
      const order = await Order.findById(req.params.id);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
      } else {
        res.status(404);
        throw new Error('Order not found');
      }
    } catch (err) {
      return next(err);
    }
  }

  // @desc    Get logged in user orders
  // @route   GET /api/orders/myorders
  // @access  Private
  static async getUserOrders(req, res, next) {
    try {
      const orders = await Order.find({ user: req.user._id });

      res.json(orders);
    } catch (err) {
      return next(err);
    }
  }
}
