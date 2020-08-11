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
  
  switch(err.message){
    case 'NAME_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户名';
      break;
    case 'PASSWORD_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户密码';
      break;
    case 'USER_ALREADY_EXIST':
      statusCode = 409;
      message = '用户名已经被占用了';
      break;
    default:
      statusCode = 500;
      message = '服务暂时出了点问题~';
      break;
  }

  res.status(statusCode).send({message});

}




module.exports = {
  requestUrl,
  defauleErrorHandler
}