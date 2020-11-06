let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
//允许接收json参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
require('./server/connect');
let admin = express.Router();
app.use('/admin', admin);
let mongoose = require('./server/connect');
let Users = require('./server/user');
//登录接口,得到一个邮箱密码,返回这个找到的用户对象,否则,返回就返回登录失败
admin.post('/login', async (req, res) => {
    let user = await Users.findOne({email: req.body.email, password: req.body.password});
    if (user) {
        res.send({
            user: user
        });
    } else {
        //登陆失败
        res.send('400', '12321')
    }
})
app.listen(3000);
console.log('服务器创建成功!');