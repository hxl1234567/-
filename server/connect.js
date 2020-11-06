let mongoose = require('mongoose');
let config = require('config');
let str = `mongodb://${config.get('dataBase.user')}:${config.get('dataBase.password')}@${config.get('dataBase.host')}:${config.get('dataBase.port')}/${config.get('dataBase.collection')}`
mongoose.connect(str, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => {
        console.log('数据库连接成功');
    })
    .catch(() => {
        console.log('数据库连接失败');
    })
module.exports = mongoose;