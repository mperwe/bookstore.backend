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
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', OrderSchema);
