const {signToken} = require('./auth.service');

// 用户登录

const login = async (req, res, next) => {
  //准备数据
  const { user:{id,name} } = req.body;

  const payload = {id,name};
 
  try {
    //签发令牌
    const token = signToken({payload});

    //做出响应
    res.send({id,name,token});

  } catch(error){
    next(error);
  }

};

module.exports = {
  login,
};
