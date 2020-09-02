const multer = require('multer');
const Jimp = require('jimp');
const { imageResizer } = require('./file.service');

// 创建一个Muter

const fileUpload = multer({
  dest:'uploads/',
})

// 文件拦截器

const fileInterceptor = fileUpload.single('file');

// 文件处理器

const fileProcessor = async (req,res,next) => {
  //文件路径
  const {path} = req.file;
  let image;

  try {
    //读取图像文件
    image = await Jimp.read(path);
  }catch(error){
    return next(error);
  }

  //准备文件数据
  const {imageSize,tags} = image['_exif'];

  //在请求中添加文件数据
  req.fileMetaData = {
    width:imageSize.width,
    height:imageSize.height,
    metadata:JSON.stringify(tags),
  }

  //调整图像尺寸

  imageResizer(image,req.file)

  // console.log(image['_exif']);

  //下一步
  next();

}

module.exports = {
  fileInterceptor,
  fileProcessor
}