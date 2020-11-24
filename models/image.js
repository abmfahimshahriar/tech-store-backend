const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const imageSchema = new Schema({
    fileType: {
        type: String,
        required: false
    },
    data: {
        type: Buffer,
        required: false
    }
});

module.exports = mongoose.model('Image', imageSchema);