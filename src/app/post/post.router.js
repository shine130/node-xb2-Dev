const express = require('express');
const postController = require('./post.controller');
const {requestUrl} = require('../app.middleware');
const {authGuard} = require('../auth/auth.middleware');

const router = express.Router();

/* 内容列表 */

router.get('/posts',requestUrl,postController.index);


/* 创建内容 */

router.post('/posts',authGuard,postController.store);

/* 更新内容 */

router.patch('/posts/:postId',postController.update);

/* 删除内容 */

router.delete('/posts/:postId',postController.destroy);

module.exports = {
  router,
}

