import Product from '../models/productModel.js';

export default class ProductController {
  // @desc    Fetch all products
  // @route   GET /api/products
  // @access  Public
  static async getProducts(req, res, next) {
    try {
      const products = await Product.find({});
      return res.status(200).json(products);
    } catch (err) {
      return next(err);
    }
  }

  // @desc    Fetch single products
  // @route   GET /api/products/:id
  // @access  Public
  static async getProductById(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);

      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (err) {
      return next(err);
    }
  }
}
