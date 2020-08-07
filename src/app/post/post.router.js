const express = require('express');
const postController = require('./post.controller');
const {requestUrl} = require('../app.middleware');

const router = express.Router();

/* 内容列表 */

router.get('/posts',requestUrl,postController.index);


/* 创建内容 */

router.post('/posts',postController.store);

module.exports = {
  router,
}