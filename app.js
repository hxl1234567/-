let express = require('express');
let app = express();
let path = require('path');
app.use(express.static(path.join(__dirname,'public')));
app.listen(3000);
console.log('服务器创建成功!');