const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const {createFile, findFileById} = require('./file.service');

// 上传文件

const store = async (req,res,next) => {
  //当前用户
  const {id:userId} = req.user;

  //所属内容
  const {post:postId} = req.query;

  //文件信息
  const fileInfo = _.pick(req.file,[
    'originalname',
    'mimetype',
    'filename',
    'size',
  ]);

  try{
    //保存文件信息
    const data = await createFile({
      ...fileInfo,
      userId,
      postId,
      ...req.fileMetaData,
    })

    //做出响应
    res.status(201).send(data);

  }catch(error){
    next(error)
  }


};

//文件服务

const serve = async (req,res,next) => {
  //从地址参数里得到文件ID
  const {fileId} = req.params;

  try{
    //查找文件信息
    const file = await findFileById(parseInt(fileId,10));

    //要提供的图像尺寸

    const {size} = req.query;

    //文件名与目录
    let filename = file.filename;
    let root = 'uploads';
    let resized = 'resized';

    if(size){
      //可用的图像尺寸
      const imageSizes = ['large','medium','thumbnail'];

      //检查文件尺寸是否可用

      if(!imageSizes.some(item => item == size)){
        throw new Error('FILE_NOT_FOUND');
      }

      //检查文件是否存在
      const fileExist = fs.existsSync(path.join(root,resized,`${filename}-${size}`));

      //设备文件名与目录
      if(fileExist){
        filename = `${filename}-${size}`;
        root = path.join(root,resized);
        console.log(filename)
      }


    }


    //做出响应
    res.sendFile(filename,{
      root,
      headers:{
        'Content-Type':file.mimetype,
      },
    });

  }catch(error){
    next(error);
  }
}

const metadata = async (req,res,next) => {
  //文件ID
  const {fileId} = req.params;

  try {
    //查询文件数据
    const file = await findFileById(parseInt(fileId,10));

    //准备响应数据
    const data = _.pick(file,['id','size','width','height','metadata']);

    //做出响应
    res.send(data);

  }catch(error){
    next(error);
  }

}

module.exports = {
  store,
  serve,
  metadata,
}