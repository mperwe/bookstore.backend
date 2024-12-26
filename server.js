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

// Middleware to handle file uploads (ensure to use it where needed in routes)
app.use(upload.single('image')); // This will accept a single 'image' field for file uploads

// MongoDB connection setup
const dbURI = 'mongodb://localhost:27017/booksdb'; // MongoDB connection URI (replace with your actual URI)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

// Set up routes for the application
app.use('/api/search', bookRoutes); // All /api/search routes are handled by searchRoutes.js

// Default route to check if the server is working
app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

// Error handling middleware for unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized error handling middleware for server errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ message: 'Internal server error' }); // Respond with a generic server error message
});

// Start the server and listen on port 4500 as per your setup
const PORT = process.env.PORT || 4500; // Backend runs on port 4500
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
