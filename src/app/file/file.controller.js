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
      postId
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

    //做出响应
    res.sendFile(file.filename,{
      root:'uploads',
      headers:{
        'Content-Type':file.mimetype,
      },
    });

  }catch(error){
    next(error);
  }
}

module.exports = {
  store,
  serve,
}