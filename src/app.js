const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce"; // Replace with your actual connection string
mongoose.connect(mongoURI);

const connection = mongoose.connection;
connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// After the connection is open
connection.once('open', async () => {
  console.log('Connected to MongoDB successfully');

  // Check if the database exists, and create it if not
  const adminDb = connection.db.admin();
  const dbName = mongoURI.substring(mongoURI.lastIndexOf('/') + 1);
  const databases = await adminDb.listDatabases();
  const databaseExists = databases.databases.some((db) => db.name === dbName);

  if (!databaseExists) {
    console.log(`Database "${dbName}" doesn't exist. Creating...`);
    await adminDb.command({ create: dbName });
    console.log(`Database "${dbName}" created successfully.`);
  }

  // Routes
app.use('/api/products', productRoutes);

  // Start the server after ensuring database existence
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} ...`);
  });
});
