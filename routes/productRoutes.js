const express = require('express');
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
  getAllProducts,
  getProductById,
} = require('../controllers/productController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', adminMiddleware, createProduct);
router.patch('/:id', adminMiddleware, updateProduct);
router.delete('/:id', adminMiddleware, deleteProduct);
router.get('/filter', filterProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
