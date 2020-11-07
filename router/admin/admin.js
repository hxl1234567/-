let express = require('express');
let admin = express.Router();
let path = require('path');
let Users = require(path.join(__dirname, '../', '../', 'server', 'user'));

//登录接口,得到一个邮箱密码,返回这个找到的用户对象,否则,返回就返回登录失败
admin.post('/login', async (req, res) => {
    let user = await Users.findOne({email: req.body.email, password: req.body.password});
    if (user) {
        req.session.email = user.email;
        res.send({
            user: user
        });
    } else {
        //登陆失败
        res.send('400', '12321')
    }
})
//判断是否登录
admin.get('/isLogin', (req, res) => {
    res.send('fun({islogin:' + (req.session.email === undefined ? false : true) + '})')
})
//退出登录
admin.get('/logout', (req, res) => {
    req.session.destroy(function () {
        res.clearCookie('connect.id');
        res.redirect('/admin/login.html');
    })
})
module.exports = admin;