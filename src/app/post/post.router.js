const express = require('express');
const postController = require('./post.controller');
const {authGuard,accessControl} = require('../auth/auth.middleware');
const { sort, filter } = require("./post.middleware");

const router = express.Router();

/* 内容列表 */

router.get("/posts", sort,filter, postController.index);


/* 创建内容 */

router.post('/posts',authGuard,postController.store);

/* 更新内容 */

router.patch('/posts/:postId',authGuard,accessControl({possession:true}),postController.update);

/* 删除内容 */

router.delete('/posts/:postId',authGuard,accessControl({possession:true}),postController.destroy);

/* 添加内容标签 */

router.post(
  '/posts/:postId/tag',
  authGuard,
  accessControl({possession:true}),
  postController.storePostTag
)


/**
 * 移除内容标签
 */

router.delete(
  "/posts/:postId/tag",
  authGuard,
  accessControl({ possession: true }),
  postController.destroyPostTag
);

module.exports = {
  router,
}

