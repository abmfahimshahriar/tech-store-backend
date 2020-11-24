const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
// get a singe product

exports.getSingleProduct = async (req, res, next) => {
  const prodId = req.params.id;

  try {
    const product = await Product.findById(prodId);
    if (!product) {
      res.status(422).json({ message: 'product not found!'});
    }
    else {
      res.status(200).json({
        message: 'Fetched the product successfully.',
        product: product,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

// add product
exports.addProduct = async (req, res, next) => {
    
    if (!req.file) {
      console.log("no image provided");
    }
    
    const title = req.body.title;
    const company = req.body.company;
    const description = req.body.description;
    const featured = req.body.featured;
    const freeShipping = req.body.freeShipping;
    const price = req.body.price;
    const image = req.file.path;
    const product = new Product({
      title: title,
      company: company,
      description: description,
      featured: featured,
      freeShipping: freeShipping,
      price: price,
      image: image
    });
    try {
      await product.save();
      res.status(201).json({
        message: 'product created successfully!',
        product: product
      });
    } catch (err) {
      console.log(err);
    }
  };

  // update product
  exports.updateProduct = async (req, res, next) => {
    const prodId = req.params.id;

    const title = req.body.title;
    const company = req.body.company;
    const description = req.body.description;
    const featured = req.body.featured;
    const freeShipping = req.body.freeShipping;
    const price = req.body.price;
    //const image = req.file.path;
    let image = null;
    if (req.file) {
      image = req.file.path;
    }
    
    try {
      const product = await Product.findById(prodId);
      if (!product) {
        res.status(422).json({ message: 'product not found!'});
      }
      
      if (image) {
        clearImage(product.image);
        console.log('new image');
        product.image = image;
      }

      product.title = title;
      product.company = company;
      product.description = description;
      product.featured = featured;
      product.freeShipping = freeShipping;
      product.price = price;
      const result = await product.save();

      res.status(201).json({ message: 'Product updated!', product: result });
    } catch (err) {
      console.log(err);
    }
  };

  // delete product
  exports.deleteProduct = async (req, res, next) => {
    const prodId = req.params.id;
    try {
      const product = await Product.findById(prodId);
  
      if (!product) {
        res.status(422).json({ message: 'product was not found' });
      }
      //console.log(product);
      clearImage(product.image);
      await Product.findByIdAndRemove(prodId);
      res.status(200).json({ message: 'Deleted product.' });
    } catch (err) {
      console.log(err);
    }
  };
  
  const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  };

  //get product
  exports.getProduct = async (req, res, next) => {
    try {
      const products = await Product.find();
  
      res.status(200).json({
        message: 'Fetched products successfully.',
        products: products,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // add order
  exports.addOrder = async (req, res, next) => {
    
    
    const cusName = req.body.cusName;
    const address = req.body.address;
    const contact = req.body.contact;
    const userId = req.body.userId;
    const total = req.body.total;
    const products = req.body.products.map(item => {
      return {
        title: item.title,
        count: item.count,
        total: item.total
      }
    });
    const user = await User.findById(userId);
    const order = new Order({
      cusName: cusName,
      address: address,
      contact: contact,
      creator: user,
      status: 'order placed',
      total: total,
      products: products

    });
    try {
      await order.save();
      res.status(201).json({
        message: 'order created successfully!',
        order: order
      });
    } catch (err) {
      console.log(err);
    }
  };


  //get orders
  exports.getOrder = async (req, res, next) => {
    try {
      const orders = await Order.find();
  
      res.status(200).json({
        message: 'Fetched orders successfully.',
        orders: orders,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // get my orders

  exports.getMyOrders = async (req, res, next) => {
    const userId = req.params.id;
    try {
      const orders = await Order.find({creator:userId});
  
      res.status(200).json({
        message: 'Fetched orders successfully.',
        orders: orders,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // delete order 
  exports.deleteOrder = async (req, res, next) => {
    const orderId = req.params.id;
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        res.status(422).json({ message: 'order was not found' });
      }
      //console.log(product);
      await Order.findByIdAndRemove(orderId);
      res.status(200).json({ message: 'Deleted order.' });
    } catch (err) {
      console.log(err);
    }
  };


  exports.updateOrderStatus = async (req, res, next) => {
    const orderId = req.params.id;
    let newStatus = null;
    
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        res.status(422).json({ message: 'order not found!'});
      }
      if(order.status === 'order placed') {
        newStatus = 'order processing';
      }
      else if(order.status === 'order processing') {
        newStatus = 'order picked';
      }
      else if(order.status === 'order picked') {
        newStatus = 'order delivered';
      }
      else {
        newStatus = 'order delivered';
      }

      order.status = newStatus;
      const result = await order.save();

      res.status(201).json({ message: 'order updated!', order: result });
    } catch (err) {
      console.log(err);
    }
  };