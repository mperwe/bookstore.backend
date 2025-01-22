
const express = require('express'); 
const connectDB = require('./config/db')
const cors = require('cors'); 
const multer = require('multer');
const bodyParser = require('body-parser'); 
require('dotenv').config();
const upload = require('./config/cloudinary'); 
// const cloudinary = require('./config/cloudinary');




 


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



// middleware for endpoints
app.use('/api/v1/auth',authRoute); 
app.use('/api/v1/books', bookRoute); 
app.use('/api/v1/carts', cartRoute); 
app.use('/api/v1/orders', orderRoute); 
app.use('/api/v1/books/search',searchRoute); 

app.get('/', (req, res) => {
  res.send('<h1>Welcome to book store server</h1>');
});

//File upload route (Cloudinary integration)
app.post('/upload',upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // // Upload image to Cloudinary in 'books' folder
    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: 'books',  // Set the folder to 'books'
    //   use_filename: true,
    // });

 res.status(200).json({
      message: 'Image uploaded successfully',
      url: req.file.path,  // Image URL from Cloudinary
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

connectDB()

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
