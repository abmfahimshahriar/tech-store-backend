const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  cusName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, 
  status: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },  
  products: [
    {
      title: { type: String, required: true },
      count: { type: Number, required: true },
      total: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema);