// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the CartItem model
const CartItemSchema = new mongoose.Schema({
  // Reference to the 'User' model, indicating the user who owns the cart item
  // 'required: true' ensures the user field is mandatory
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Referencing the 'User' model
    required: true // This field is mandatory
  },
  
  // Reference to the 'Book' model, indicating the book that is in the cart
  // 'required: true' ensures the book field is mandatory
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book',  // Referencing the 'Book' model
    required: true // This field is mandatory
  },
  
  // The quantity of the book in the cart, with a default value of 1 if not provided
  quantity: { 
    type: Number, 
    default: 1 // Default quantity is 1 if not specified
  },
});

// Create and export the CartItem model based on the schema
// If the model 'CartItem' is already defined, it will not be overwritten
module.exports = mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);
