
const mongoose = require('mongoose');


const connectDB = async () => {
  try {
   
  await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, 
    
    });
 
    console.log('MongoDB connected successfully');
  } catch (error) {
    
    console.error('MongoDB connection error:', err.message);
    // Exit the process with a failure code (1) to indicate an error occurred.
    process.exit(1);
  }
};


module.exports = connectDB;
