let express = require('express');
let admin = express.Router();
let path = require('path');
let bcrypt = require('bcrypt');

//用于导入二进制文件
let formidable = require('formidable');
let Users = require(path.join(__dirname, '../', '../', 'server', 'user'));

//登录接口,得到一个邮箱密码,返回这个找到的用户对象,否则,返回就返回登录失败
admin.post('/login', async (req, res) => {
    let user = await Users.findOne({email: req.body.email});
    if (user) {
        let login = await bcrypt.compare(req.body.password, user.password);
        if (login) {
            req.session.email = user.email;
            res.send({
                user: user
            });
        } else {
            //登陆失败
            res.send('400', '12321')
        }
    } else {
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
//这个用来创建用户
admin.post('/users', async (req, res, next) => {
    let salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    try {
        let user = await Users.create(req.body);
    } catch (e) {
        //用来创建失败的处理
        next(e)
    }

    //我们得到了传递过来的数据
    res.send('ok');
})
//获取用户
admin.get('/users', async (req, res) => {
    let users = await Users.find();
    res.send(users);
})

//传递二进制(图片)文件到服务器
admin.post('/upload', (req, res) => {
    let form = new formidable.IncomingForm();
    //设置导入文件的文件夹
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    //设置是否保留后缀
    form.keepExtensions = true;
    form.parse(req, (err, field, files) => {
        let path = files.file.path.split('public')[1];
        res.send(path);
    })
})
admin.get('/users/:id', async (req, res) => {
    let id = req.params.id;
    let user = await Users.findOne({_id: id});
    res.send(user);
})
module.exports = admin;