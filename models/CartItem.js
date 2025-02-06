const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  
    required: true 
  },
  
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book',  
    required: true 
  },
  
  quantity: { 
    type: Number, 
    default: 1 
  },
});

const Cart = mongoose.model('Cart Item', CartItemSchema);

module.exports = Cart;

