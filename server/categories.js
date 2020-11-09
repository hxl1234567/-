let mongoose = require('mongoose');
let categories = new mongoose.Schema({
    className: {
        type: String,
        required: true,
        default: 'fg-glass'
    },
    tittle: {
        type: String,
        required: true,
        maxLength: 2,
        minLength: 6
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
})
let Categories = mongoose.model('categories', categories);

module.exports = Categories;