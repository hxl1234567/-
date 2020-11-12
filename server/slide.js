let mongoose = require('mongoose');
// let categories = require('./categories');
let slide = new mongoose.Schema({
    tittle: {
        required: true,
        type: String,
    },
    image: {
        type: String,
        default: null,
    },
    link: {
        type: String,
    }
})
let Slide = mongoose.model('slide', slide);

module.exports = Slide;