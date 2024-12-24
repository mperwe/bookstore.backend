const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const multer = require('multer'); // For handling file uploads
const path = require('path');
const cloudinary = require('./config/cloudinary'); // Cloudinary configuration
const cors = require('cors'); // Import CORS

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS Middleware
const corsOptions = {
  origin: 'http://localhost:4000', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions)); // Enable CORS with the specified options

// Middleware for serving static files (optional, if needed for images/uploads)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/books', require('./routes/bookRoutes')); // Book management routes
app.use('/api/cart', require('./routes/cartRoutes')); // Cart management routes
app.use('/api/orders', require('./routes/orderRoutes')); // Order management routes
app.use('/api/books', require('./routes/searchRoutes')); // Search books

// Middleware for file uploads (if needed in routes)
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

// Error handling middleware (optional, for better debugging)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start server
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
