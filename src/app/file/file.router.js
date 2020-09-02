const express = require('express');
const fileController = require('./file.controller');
const { authGuard } = require('../auth/auth.middleware');
const { fileInterceptor,fileProcessor } = require('./file.middleware');

const router = express.Router();

// 上传文件
router.post('/files',authGuard,fileInterceptor,fileProcessor,fileController.store);

// 文件服务
router.get('/files/:fileId/serve',fileController.serve);

//文件信息
router.get('/files/:fileId/metadata',fileController.metadata);

// 导出路由

module.exports = {
  router,
}