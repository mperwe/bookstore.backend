const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true, // Remove leading/trailing spaces
    },
    author: { 
      type: String, 
      required: true, 
      trim: true,
    },
    description: { 
      type: String, 
      trim: true, // Ensure no leading/trailing spaces
      default: 'No description available', // Provide a default description
    },
    price: { 
      type: Number, 
      required: true,
      min: 0, // Ensure non-negative price
    },
    image: { 
      type: String, 
      validate: {
        validator: function(v) {
          // Simple URL validation for image URL
          return /^https?:\/\/[^\s]+$/.test(v);
        },
        message: 'Invalid URL format for image',
      },
      default: 'default-image-url.jpg', // Provide a default image URL
    },
  },
  {
    timestamps: true, 
  }
);

// Indexing for faster search queries on title and author
bookSchema.index({ title: 'text', author: 'text' });

// Check if model already exists before defining
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

module.exports = Book;
