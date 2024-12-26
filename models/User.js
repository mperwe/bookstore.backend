
const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
    ref: 'User',                           // Ensures this field links to a User document
    required: true,                        // Makes the user field mandatory
  },
  items: [
    {
      book: { 
        type: mongoose.Schema.Types.ObjectId,  // Reference to the Book model
        ref: 'Book',                           // Ensures this field links to a Book document
        required: true,                        // Makes the book field mandatory
      },
      quantity: { 
        type: Number, 
        required: true,                        // Makes the quantity field mandatory
      },
    },
  ],
  total: { 
    type: Number, 
    required: true,                           // Makes the total field mandatory
  },
  status: { 
    type: String, 
    default: 'Pending',                      // Default status is 'Pending' if not provided
  },
});

// Creating and exporting the 'Order' model based on the schema
module.exports = mongoose.model('Order', OrderSchema);
