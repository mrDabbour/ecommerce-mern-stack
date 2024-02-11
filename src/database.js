const mongoose = require('mongoose');
const Product = require('./models/Product');

const createTextIndex = async () => {
  try {
    await Product.createIndex({ name: 'text', category: 'text', description: 'text' });
    console.log('Text index created successfully');
  } catch (error) {
    console.error('Error creating text index:', error.message);
  }
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });

    // Call the function to create the text index
    await createTextIndex();
    
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = { connectToDatabase };
