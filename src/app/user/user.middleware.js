const userService = require("./user.service");
const bcrypt = require("bcrypt");

// 验证用户数据

const validateUserData = async (req, res, next) => {
  console.log("验证用户数据");

  //准备数据
  const { name, password } = req.body;
  //验证必填数据
  if (!name) return next(new Error("NAME_IS_REQUIRED"));
  if (!password) return next(new Error("PASSWORD_IS_REQUIRED"));

  // 验证用户名
  const user = await userService.getUserByName(name);
  if (user) return next(new Error("USER_ALREADY_EXIST"));

  //下一步
  next();
};

// HASH密码

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  // HASH密码
  req.body.password = await bcrypt.hash(password, 10);
  //下一步
  next();
};

module.exports = {
  validateUserData,
  hashPassword,
};
