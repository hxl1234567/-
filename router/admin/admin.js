let express = require('express');
let admin = express.Router();
let path = require('path');
let bcrypt = require('bcrypt');
let pagination = require('mongoose-sex-page');

//用于导入二进制文件
let formidable = require('formidable');
let Users = require(path.join(__dirname, '../', '../', 'server', 'user'));

let Categories = require(path.join(__dirname, '../', '../', 'server', 'categories'));

//文章管理
let Posts = require(path.join(__dirname, '../', '../', 'server', 'post'));
//评论
let Comments = require(path.join(__dirname, '../', '../', 'server', 'comment', ''));

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
//用户操作---------------------------------------
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
//根据id获取用户信息
admin.get('/users/:id', async (req, res) => {
    let id = req.params.id;
    let user = await Users.findOne({_id: id});
    res.send(user);
})
//根据用户id修改用户信息
admin.post('/users/:id', async function (req, res) {
    let id = req.params.id;
    let user = await Users.updateOne({_id: id}, req.body);
    res.send(user);
})
//根据id删除用户
admin.delete('/users/:id', async (req, res) => {
    let id = req.params.id;
    let ids = id.split('-');
    let user = null;
    ids.forEach(async function (val, index) {
        user = await Users.findOneAndDelete({_id: val});
    })
    res.send(user);

})
//修改密码--------------------------------------------
//修改密码,传递三个值 oldPassword,newPassword0,newPassword1
admin.post('/passwordReset', async (req, res) => {
    if (req.body.newPassword0 === req.body.newPassword1) {
        let password = req.body.oldPassword;
        let user = await Users.findOne({email: req.session.email});
        if (await bcrypt.compare(password, user.password)) {
            //密码比对成功
            let salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(req.body.newPassword0, salt);
            let res = await Users.updateOne({email: req.session.email}, {password: password});
            res.send('ok');
        } else {
            res.status(500).send();
        }
    } else {
        res.status(500).send({message: "Error"})
    }

})
//分类目录----------------------------------------------------
admin.get('/categories/count', async function (req, res) {
    let length = (await Categories.find()).length;
    res.send({category: length});
})
//创建分类目录
admin.post('/categories', async (req, res) => {
    let u = await Categories.create(req.body);
    res.send('ok')
})
//查询分类目录
admin.get('/categories', async (req, res) => {
    let categories = await Categories.find();
    res.send(categories);
})
//根据id查询用户
admin.get('/categories/:id', async (req, res) => {
    let id = req.params.id;
    let user = await Categories.findOne({_id: id});
    res.send(user);
})
//根据id修改用户信息
admin.post('/categories/:id', async (req, res) => {
    let id = req.params.id;
    await Categories.updateOne({_id: id}, {className: req.body.className, tittle: req.body.tittle});
    res.send('ok');
})
//根据id删除用户信息
admin.delete('/categories/:id', async (req, res) => {
    let id = req.params.id;
    let ids = id.split('-');
    let user = null;
    ids.forEach(async function (val, index) {
        user = await Categories.findOneAndDelete({_id: val});
    })
    res.send(user);
})
//文章管理页面 -----------------------------------------------------------------c
//创建文章
admin.post('/posts', async (req, res) => {
    let user = await Users.findOne({email: req.session.email});
    req.body.author = user._id;
    console.log(req.body)
    let post = await Posts.create(req.body);
    res.send(post);
})
//查询文章
admin.get('/posts', async (req, res) => {
    let page = 1;
    if (req.query.page) {
        page = req.query.page;
    }
    //接下来判断筛选数据
    if (req.query.category || req.query.state || req.query.id) {
        let json = {
            state: req.query.state,
            category: req.query.category,
            _id: req.query.id
        }
        if (req.query.state === '') delete json.state;
        if (req.query.category === '') delete json.category;
        if (req.query._id === '') delete json._id;
        let obj = JSON.parse(JSON.stringify(json));
        let post = await pagination(Posts).populate('author').populate('category').page(page).size(5).display(5).find(obj).exec();
        res.send(post);
    } else {
        let post = await pagination(Posts).populate('author').populate('category').page(page).size(5).display(5).exec();
        res.send(post);
    }
});

//修改文章,得到了id,我们查询出所有的信息,
//根据文章id值修改文章信息
admin.put('/posts/:id', async function (req, res) {
    let id = req.params.id;
    let post = await Posts.updateOne({_id: id}, req.body);
    res.send('ok');
})
//根据id删除文章
admin.delete('/posts/:id', async function (req, res) {
    let id = req.params.id;
    let post = await Posts.findOneAndDelete({_id: id});
    res.send('ok');
})
admin.get('/posts/count', async (req, res) => {
    let postNum = (await Posts.find()).length;
    let draftNum = (await Posts.find({state: '0'})).length;
    res.send({postNum: postNum, draftNum: draftNum});
})

//评论模块------------------------------------------------------
//查询评论
admin.get('/comments', async (req, res) => {
    let page = 1;
    if (req.query.page) {
        page = req.query.page;
    }
    let comment = await pagination(Comments).page(page).populate('author').populate('post').size(2).display(2).exec();
    res.send(comment);
})
//根据id修改评论状态
admin.put('/comments/:id', async (req, res) => {
    let id = req.params.id;
    let comment = await Comments.updateOne({_id: id}, {state: req.body.state});
    res.send('ok');
})
//根据id删除评论
admin.delete('/comments/:id', async (req, res) => {
    let id = req.params.id;
    let comment = await Comments.findOneAndDelete({_id: id});
    console.log(comment);
    res.send('ok');
})
//查询评论数量
admin.get('/comments/count', async (req, res) => {
    let commentNum = (await Comments.find()).length;
    let commentshenhe = (await Comments.find({state: '0'})).length;
    res.send({commentNum: commentNum, commentshenhe: commentshenhe});
})
module.exports = admin;