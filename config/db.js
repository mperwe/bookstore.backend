// Importing the mongoose library, which is used to interact with MongoDB databases.
const mongoose = require('mongoose');

// Asynchronous function to connect to the MongoDB database.
const connectDB = async () => {
  try {
    // Attempting to connect to the MongoDB database using the connection string stored in environment variable `MONGO_URI`.
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,     // Ensures MongoDB connection string is parsed correctly.
      useUnifiedTopology: true, // Enables the new MongoDB connection management engine.
    });
    // If the connection is successful, log a success message.
    console.log('MongoDB connected successfully');
  } catch (err) {
    // If there is an error during the connection process, log the error message.
    console.error('MongoDB connection error:', err.message);
    // Exit the process with a failure code (1) to indicate an error occurred.
    process.exit(1);
  }
};

// Exporting the `connectDB` function so it can be used in other files.
module.exports = connectDB;
