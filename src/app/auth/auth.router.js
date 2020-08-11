const express = require("express");
const authController = require("./auth.controller");
const { validateLoginData } = require("./auth.middleware");

const router = express.Router();

//用户登录

router.post("/login",validateLoginData, authController.login);

// 导出路由

module.exports = {
  router,
};
