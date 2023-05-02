const express = require('express');
const router = express.Router();
const product = require('../controllers/product.js');
const user = require('../controllers/user.js');

// Get
router.get('/api/products', user.verifyTokenAndFindUser, product.getProducts);
router.get(
  '/api/products/:type',
  user.verifyTokenAndFindUser,
  product.getProductsByType
);

// Post
router.post(
  '/api/products',
  user.verifyTokenAndFindUser,
  user.verifyAdmin,
  product.newProduct
);

// Put
router.put(
  '/api/products/:id',
  user.verifyTokenAndFindUser,
  user.verifyAdmin,
  product.updateProduct
);

// Delete
router.delete(
  '/api/products/:id',
  user.verifyTokenAndFindUser,
  user.verifyAdmin,
  product.deleteProduct
);

module.exports = router;
