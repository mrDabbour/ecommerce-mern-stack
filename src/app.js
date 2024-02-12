const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const session = require('express-session');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/userRoutes');
const { isLoggedIn } = require('./middleware/authMiddleware'); // Import the middleware

const User = require('./models/User');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Session Configuration
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

// Add this middleware to expose the user object to all templates
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";
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
  app.use('/auth', authRoutes);
  app.use('/', userRoutes);
  app.use('/profile', profileRoutes);


// Protected route using isLoggedIn middleware
app.get('/protected-route', isLoggedIn, (req, res) => {
        res.json({ message: 'This is a protected route!' });
 });

      

  // Start the server after ensuring database existence
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} ...`);
  });
});
