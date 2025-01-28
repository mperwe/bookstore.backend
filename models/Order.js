const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Cart', 'Order'], // 'Cart' indicates it's still a cart, 'Order' means it's finalized.
    default: 'Cart',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` automatically
OrderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
