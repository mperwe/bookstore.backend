
const express = require('express'); 
const connectDB = require('./config/db')
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const multer = require('multer');
require('dotenv').config();


const authRoute =require('./routes/authRoutes')
const bookRoute = require('./routes/bookRoutes');
const cartRoute =require('./routes/cartRoutes')
const orderRoute =require('./routes/orderRoutes')
const searchRoute= require('./routes/searchRoutes')

const app = express();
const PORT = process.env.PORT || 4500;

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


//Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Upload files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Naming the uploaded file with a timestamp
  },
});
const upload = multer({ storage });

// middleware for endpoints
app.use('/api/auth',authRoute); 
app.use('/api/books', bookRoute); 
app.use('/api/carts', cartRoute); 
app.use('/api/orders', orderRoute); 
app.use('/api/books/search',searchRoute); 



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
});//



connectDB()

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
