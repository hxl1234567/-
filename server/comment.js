let mongoose = require('mongoose');
// let mongoose = require('./connect');
let Post = require('./post');
let User = require('./user');
let comment = new mongoose.Schema({
    state: {
        type: String,
        required: true,
        enum: ['0', '1']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    content: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Post
    },
    createAt: {
        type: Date,
        default: new Date()
    }
})
let Comment = mongoose.model('comment', comment);

/*async function fun() {
    let commment =await Comment.create({
        state:'0',
        author:'5fa66a7c36a56325d8ad8c97',
        content:'123',
        post:'5faa96b51c899e06acca1b73',
    })
    console.log(comment)
}
fun();*/
module.exports = Comment;