// Import necessary modules
const express = require('express'); // Express framework for routing and middleware
const mongoose = require('mongoose'); // Mongoose for MongoDB interaction
const cors = require('cors'); // CORS middleware for handling cross-origin requests
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const multer = require('multer'); // Middleware for handling file uploads

// Importing routes
const bookRoutes = require('./routes/searchRoutes');

// Initialize the Express application
const app = express();

// CORS setup to allow frontend on port 4000 to communicate with backend on port 4500
app.use(cors({
  origin: 'http://localhost:4000', // Allow requests from the frontend on port 4000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers (if any)
}));

// Middleware to parse incoming JSON request bodies
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Setting up file upload handling using multer (if you need to upload book images or other files)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Upload files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Naming the uploaded file with a timestamp
  },
});
const upload = multer({ storage });

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/books', require('./routes/bookRoutes')); // Book management routes
app.use('/api/cart', require('./routes/cartRoutes')); // Cart management routes
app.use('/api/orders', require('./routes/orderRoutes')); // Order management routes
app.use('/api/books/search', require('./routes/searchRoutes')); // Search books route

// File upload route (Cloudinary integration)
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'uploads',
      use_filename: true,
    });

    res.status(200).json({
      message: 'Image uploaded successfully',
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Centralized error handling middleware for server errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ message: 'Internal server error' }); // Respond with a generic server error message
});

// Start the server
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
