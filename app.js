let express = require('express');
let app = express();
let path = require('path');

//设置可以cookie
let session = require('express-session');
app.use(session({secret: 'secret key'}));

//允许接收post参数
let bodyParser = require('body-parser');
//允许接收json参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//设置静态文件夹123123
app.use(express.static(path.join(__dirname, 'public')));
require('./server/connect');

app.use('/admin', require('./router/admin/admin'));


app.listen(3000);
console.log('服务器创建成功!');