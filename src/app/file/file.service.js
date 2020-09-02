const path = require('path');
const Jimp = require('jimp');
const {connection} = require('../database/mysql');

// 存储文件信息

const createFile = async (file) => {
  // 准备查询
  const statement = `
    INSERT INTO file
    SET ?
  `;
  // 执行查询
  const [data] = await connection.promise().query(statement,file);

  //提供数据

  return data;

}



// 按ID查找文件

const findFileById = async (fileId) => {
  //准备查询
  const statement = `
    SELECT * FROM file
    WHERE id = ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement,fileId);

  //提供数据
  return data[0];

}

//调整图像尺寸

const imageResizer = async (image,file) => {

  //图像尺寸
  const {imageSize} = image['_exif'];

  //文件路径
  const filePath = path.join(file.destination,'resized',file.filename);

  //大尺寸
  if(imageSize.width > 2280){
    image.resize(1280,Jimp.AUTO).quality(85).write(`${filePath}-large`);
  }

    //中等尺寸
  if(imageSize.width > 640){
    image.resize(640,Jimp.AUTO).quality(85).write(`${filePath}-medium`);
  }

    //缩略图
  if(imageSize.width > 320){
    image.resize(320,Jimp.AUTO).quality(85).write(`${filePath}-thumbnail`);
  }
  
}



module.exports = {
  createFile,
  findFileById,
  imageResizer,
}
