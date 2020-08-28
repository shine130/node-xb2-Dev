const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userService = require("../user/user.service");
const {PUBLIC_KEY} = require('../app.config');


// 验证用户数据

const validateLoginData = async (req, res, next) => {
  console.log("验证用户登录数据");

  //准备数据
  const { name, password } = req.body;
  //验证必填数据
  if (!name) return next(new Error("NAME_IS_REQUIRED"));
  if (!password) return next(new Error("PASSWORD_IS_REQUIRED"));

  // 验证用户名
  const user = await userService.getUserByName(name, { password: true });
  if (!user) return next(new Error("USER_DOES_NOT_EXIST"));

  //验证用户密码
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return next(new Error("PASSWORD_DOES_NOT_MATCH"));

  //在请求主体里添加用户
  req.body.user = user;

  //下一步
  next();
};

//验证用户身份

const authGuard = (req, res, next) => {
  console.log('验证用户身份');
  try {
    //提取Authorization
    const authorization = req.header('Authorization');
    if(!authorization) throw new Error();

    //提取JWT令牌
    const token = authorization.replace('Bearer ','');
    if(!token) throw new Error();

    //验证令牌
    const decoded = jwt.verify(token,PUBLIC_KEY,{
      algorithms:['RS256']
    })

    //在请求里添加当前用户
    req.user = decoded;

    // 下一步
    next();

  }catch(error){
    next(new Error('UNAUTHORIZED'));
  }

}

module.exports = {
  validateLoginData,
  authGuard
};
