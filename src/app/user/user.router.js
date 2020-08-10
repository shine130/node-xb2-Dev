const express = require('express');
const userController = require('./user.controller');
const {validateUserData} = require('./user.middleware');

const router = express.Router();

// 创建用户

router.post('/users',validateUserData,userController.store)

// 导出路由

module.exports = {
  router,
}