const multer = require('multer');

// 创建一个Muter

const fileUpload = multer({
  dest:'uploads/',
})

// 文件拦截器

const fileInterceptor = fileUpload.single('file');

module.exports = {
  fileInterceptor
}