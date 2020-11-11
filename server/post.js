let mongoose = require('mongoose');
// let categories = require('./categories');
let Categories = require('./categories');
let Users = require('./user');
let post = new mongoose.Schema({
    tittle: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users
    },
    state: {
        type: String,
        required: true,
        enum: {
            values: ['0', '1']
        }
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    thumbnail: {
        type: String,
        default: null
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Categories
    },
    content: {
        type: String,
        required: true
    }
})
let Post = mongoose.model('post', post);

module.exports = Post;