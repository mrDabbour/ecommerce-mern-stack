const Product = require('../models/Product');

// Controller for handling product CRUD operations

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




  
  const searchProducts = async (req, res) => {
    try {
      const { query } = req.query;
  
      // Create a regular expression pattern with optional spaces and make it case-insensitive
      const searchPattern = query.split('').join('\\s*');  // Split characters and insert optional spaces
      const regex = new RegExp(searchPattern, 'i');
  
      // Use the regular expression to search across multiple fields (name, category, etc.)
      const filter = {
        $or: [
          { name: { $regex: regex } },
          { category: { $regex: regex } },
          // Add other fields as needed
        ],
      };
  
      const products = await Product.find(filter);
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found matching the search criteria.' });
      }
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


  const filterProducts = async (req, res, next) => {
    try {
      // Constructing the filter object dynamically based on provided parameters
      const filter = {};
      
      if (req.params.category && req.params.category.toLowerCase() !== 'all') {
        filter['category'] = req.params.category;
      }
  
      if (req.params.minPrice && !isNaN(parseFloat(req.params.minPrice))) {
        filter['price'] = { $gte: parseFloat(req.params.minPrice) };
      }
  
      if (req.params.maxPrice && !isNaN(parseFloat(req.params.maxPrice))) {
        filter['price'] = { ...filter['price'], $lte: parseFloat(req.params.maxPrice) };
      }
  
      // Using the constructed filter object in the query
      const products = await Product.find(filter);
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  filterProducts
};
