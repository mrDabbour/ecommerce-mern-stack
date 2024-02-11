const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// New route for search functionality
// http://localhost:3001/api/products/search?query=product1
router.get('/search', productController.searchProducts);


// Routes for product CRUD operations

// Get all products
router.get('/', productController.getAllProducts);

// Get a specific product by ID
router.get('/:id', productController.getProductById);

// Create a new product
router.post('/', productController.createProduct);

// Update a product by ID
router.put('/:id', productController.updateProduct);

// Delete a product by ID
router.delete('/:id', productController.deleteProduct);

// New route for filtered products
// Define a new route for testing the filter
// http://localhost:3001/api/products/filter/Electronics/10/25
// http://localhost:3001/api/products/filter/All/10/25
router.get('/filter/:category?/:minPrice?/:maxPrice?', productController.filterProducts);

module.exports = router;
