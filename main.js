const express = require('express');
const {APP_PORT} = require('./src/app/app.config');
// const {connection} = require ('./src/app/database/mysql');
const postRouter = require('./src/app/post/post.router');
const {defauleErrorHandler} = require('./src/app/app.middleware');

// 创建应用
const app = express();

// 处理json
app.use(express.json());

// 路由

app.use(postRouter.router);

//默认异常处理

app.use(defauleErrorHandler);


app.listen(APP_PORT,() => {
  console.log('服务已经启动');
})


// connection.connect(err => {
//   if(err){
//     console.log('数据服务失败',err.message);
//     return;
//   }
//   console.log('数据链接成功')
// })