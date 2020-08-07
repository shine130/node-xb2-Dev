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