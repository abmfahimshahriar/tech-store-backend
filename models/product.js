const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    required: true
  },
  freeShipping: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Product', productSchema);