const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const product = new Product({ name, price, description, category });
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).send({ error: 'Product not found' });
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send({ error: 'Product not found' });
    res.send({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Filter products
exports.filterProducts = async (req, res) => {
  const { categories } = req.query;

  try {
    if (!categories) return res.status(400).json({ error: 'Categories query parameter is required' });

    const categoryArray = Array.isArray(categories) ? categories : [categories];
    const products = await Product.find({ category: { $in: categoryArray } });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const skip = (page - 1) * pageSize;

    const products = await Product.find().skip(skip).limit(pageSize);
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send({ error: 'Product not found' });
    res.send(product);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
