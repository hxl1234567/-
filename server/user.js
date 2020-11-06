/*
{
    "nickName": "coder",
    "email": "coder@itcast.cn",
    "role": "admin",
    "avatar": null,
    "_id": "5c8d0bd652ae3d26686b8601",
    "status": 1,
    "createTime": "2019-03-16T14:44:38.896Z"
}
* */
let mongoose = require('mongoose');
let user = new mongoose.Schema({
    nickName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'normal'],
        },
        default: "normal"
    },
    status: {
        type: Number,
        enum: [0, 1],
        default: 1
    },
    createTime: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 15
    }
})
let Users = mongoose.model('user', user);

module.exports = Users;
/*async function fun() {
    let user = await Users.create({
        "nickName": "coder",
        "email": "157913737",
        "avatar": null,
        password:'haoxinlong1234'
    })
    console.log(user);
}
fun();*/
