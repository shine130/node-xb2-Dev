const express = require('express');
const { authGuard } = require("../auth/auth.middleware");
const commentController = require('./comment.controller');

const router = express.Router();

/**
 * 发表评论
 */

 router.post("/comments", authGuard, commentController.store);

/**
 * 导出路由
 */

 module.exports = {
   router,
 }