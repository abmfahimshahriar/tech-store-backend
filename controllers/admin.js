const fs = require('fs');
const path = require('path');
const Image = require('../models/image');
const Product = require('../models/product');
const mongoose = require('mongoose');

// get a singe product

exports.getSingleProduct = async (req, res, next) => {
  const prodId = req.params.id;

  try {
    const product = await Product.findById(prodId);
    if (!product) {
      res.status(422).json({ message: 'product not found!' });
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

  // if (!req.file) {
  //   console.log("no image provided");
  // }
  // const imageData = fs.readFileSync(req.file.path);
  // const imageCloud = new Image({
  //   _id: new mongoose.Types.ObjectId(),
  //   fileType: 'image/jpg',
  //   data: imageData
  // });
  // try {
  //   await imageCloud.save();
  // }
  // catch (err) {
  //   console.log(err);
  // }
  const title = req.body.title;
  const company = req.body.company;
  const description = req.body.description;
  const featured = req.body.featured;
  const freeShipping = req.body.freeShipping;
  const price = req.body.price;
  const imageArray = req.body.imageArray;
  // const image = req.file.path;
  const product = new Product({
    title: title,
    company: company,
    description: description,
    featured: featured,
    freeShipping: freeShipping,
    price: price,
    // image: image,
    // imageId: imageCloud._id
    imageArray: imageArray
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
  const bodyImageArray = req.body.imageArray;
  //const image = req.file.path;
  // let image = null;
  // if (req.file) {
  //   image = req.file.path;
  // }
  let imageArray = null;
  if(bodyImageArray.length > 0) imageArray = bodyImageArray;
  try {
    const product = await Product.findById(prodId);
    if (!product) {
      res.status(422).json({ message: 'product not found!' });
    }

    if (imageArray) {
      // clearImage(product.image);
      console.log('new image');
      // product.image = image;
      product.imageArray = imageArray;
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
    // clearImage(product.image);
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
  const pageLimit = req.body.pageLimit;
  const pageNumber = req.body.pageNumber;
  const skipItems = pageNumber * pageLimit;
  const searchKey = req.body.searchKey;

  // const uploadedImageId = "5fbd96e99614d1034f328c02";
  // let cloudImage;
  // try {
  //   cloudImage = await Image.findById(uploadedImageId);
  // }
  // catch (err) {
  //   console.log(err);
  // }

  try {
    let products;
    let totalItems;
    if (searchKey) {
      products = await Product.find({
        title: {
          $regex: searchKey,
          '$options': 'i'
        }
      }).skip(skipItems).limit(pageLimit);
      totalItems = await Product.countDocuments({
        title: {
          $regex: searchKey,
          '$options': 'i'
        }
      });
    }
    else {
      products = await Product.find().skip(skipItems).limit(pageLimit);
      totalItems = await Product.countDocuments();
    }

    res.status(200).json({
      isSuccess: true,
      message: 'Fetched products successfully.',
      products: products,
      totalItems: totalItems,
    });
  } catch (err) {
    console.log(err);
  }
};


//get featured products
exports.getFeaturedProducts = async (req, res, next) => {
  const productLimit = req.body.productLimit;
  try {
    const featuredProducts = await Product.find({featured: true}).limit(productLimit);
    if (!featuredProducts) {
      res.status(422).json({ message: 'products not found!' });
    }
    else {
      res.status(200).json({
        message: 'Fetched products successfully.',
        products: featuredProducts,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
