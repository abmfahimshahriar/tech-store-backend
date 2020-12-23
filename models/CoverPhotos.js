const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoverPhotoSchema = new Schema({
  imageArray: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("CoverPhotos", CoverPhotoSchema);
