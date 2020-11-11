const express = require("express");
const tagController = require("./tag.controller");
const {authGuard} = require('../auth/auth.middleware');

const router = express.Router();

/* 创建标签 */

router.post("/tags", authGuard, tagController.store);

/* 导出路由 */

module.exports = {
  router,
}