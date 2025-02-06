const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
      quantity: { type: Number, required: true, min: 1 }, // Quantity must be at least 1
    },
  ],
  total: { type: Number, required: true, min: 0 }, 
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Completed'], 
  },
},
{ timestamps: true } // Adds createdAt and updatedAt fields
);

// Check if model already exists before creating it
const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

module.exports = Order;
