const express = require("express");
const authController = require("./auth.controller");
const { validateLoginData, authGuard } = require("./auth.middleware");

const router = express.Router();

//用户登录

router.post("/login",validateLoginData, authController.login);

//定义验证登录接口

router.post('/auth/validate', authGuard,authController.validate);

// 导出路由

module.exports = {
  router,
};
