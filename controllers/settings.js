const CoverPhotos = require('../models/CoverPhotos');

// add cover photos
exports.addCoverPhotos = async (req, res, next) => {

    const imageArray = req.body.imageArray;
    
    const order = new CoverPhotos({
        imageArray: imageArray
    });
    try {
        await order.save();
        res.status(201).json({
            message: 'Cover photos created successfully!',
            order: order
        });
    } catch (err) {
        console.log(err);
    }
};

// update cover photos

exports.updateCoverPhotos = async (req, res, next) => {
    const itemId = req.params.id;
    const bodyImageArray = req.body.imageArray;
    let imageArray = null;
    if(bodyImageArray.length > 0) imageArray = bodyImageArray;
    try {
      const coverPhotos = await CoverPhotos.findById(itemId);
      if (!coverPhotos) {
        res.status(422).json({ message: 'cover photos not found!' });
      }
  
      if (imageArray) {
        coverPhotos.imageArray = imageArray;
      }
      const result = await coverPhotos.save();
  
      res.status(201).json({ message: 'Cover photos updated!', coverPhotos: coverPhotos });
    } catch (err) {
      console.log(err);
    }
  };

//get cover photos
exports.getCoverPhotos = async (req, res, next) => {

    try {
        const coverPhotos = await CoverPhotos.find();
        res.status(200).json({
            isSuccess: true,
            message: 'Fetched cover photos successfully.',
            coverPhotos: coverPhotos,
        });
    } catch (err) {
        console.log(err);
    }
};