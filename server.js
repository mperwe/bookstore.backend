const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer'); // For handling file uploads
const path = require('path');
const connectDB = require('./config/db'); // MongoDB connection
const cloudinary = require('./config/cloudinary'); // Cloudinary configuration

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
  origin: 'http://localhost:4000', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};
app.use(cors(corsOptions)); // Enable CORS

// Middleware for serving static files (for local uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Local upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});
const upload = multer({ storage });

// Routes
app.use('/api/auth', require('./routes/authRoutes')); 
app.use('/api/books', require('./routes/bookRoutes')); 
app.use('/api/cart', require('./routes/cartRoutes')); 
app.use('/api/orders', require('./routes/orderRoutes')); 
app.use('/api/books/search', require('./routes/searchRoutes')); 

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 4500;
app.get('/',(req,res)=>{
  return res.send("<h1>Welcome to the Book store E-commerce</h1>")
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
