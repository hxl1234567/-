let mongoose = require('mongoose');
// let categories = require('./categories');
let setting = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    logo: {
        type: String,
        default: null,
    },
    comment: {
        type: Boolean,
        required: true,
        default: false
    },
    review: {
        type: Boolean,
        required: true,
        default: false
    }

})
let Setting = mongoose.model('setting', setting);

module.exports = Setting;