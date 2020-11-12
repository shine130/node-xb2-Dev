// 输出请求地址

const requestUrl = (req,res,next) => {
  console.log(req.url);
  next();
}


// 处理异常

const defauleErrorHandler = (err,req,res,next) => {

  if(err.message){
    console.log(err.message);
  }

  let statusCode,
      message;
  
  switch (err.message) {
    case "NAME_IS_REQUIRED":
      statusCode = 400;
      message = "请提供用户名";
      break;
    case "PASSWORD_IS_REQUIRED":
      statusCode = 400;
      message = "请提供用户密码";
      break;
    case "USER_ALREADY_EXIST":
      statusCode = 409;
      message = "用户名已经被占用了";
      break;
    case "USER_DOES_NOT_EXIST":
      statusCode = 400;
      message = "用户不存在";
      break;
    case "PASSWORD_DOES_NOT_MATCH":
      statusCode = 400;
      message = "密码不对";
      break;
    case "UNAUTHORIZED":
      statusCode = 401;
      message = "请先登录";
      break;
    case "USER_DOES_NOT_OWN_RESOURCE":
      statusCode = 403;
      message = "您不能处理这个内容";
      break;
    case "FILE_NOT_FOUND":
      statusCode = 404;
      message = "文件不存在";
      break;
    case "TAG_ALREADY_EXISTS":
      statusCode = 400;
      message = "标签已存在";
      break;
    case "POST_ALREADY_HAS_THIS_TAG":
      statusCode = 400;
      message = "内容已经有这个标签了";
      break;
    case "UNABLE_TO_REPLY_TTHIS_COMMENT":
      statusCode = 400;
      message = "无法回复这条评论";
      break;
    default:
      statusCode = 500;
      message = "服务暂时出了点问题~";
      break;
  }

  res.status(statusCode).send({message});

}




module.exports = {
  requestUrl,
  defauleErrorHandler
}