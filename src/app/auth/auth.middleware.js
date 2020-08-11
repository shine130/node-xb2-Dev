const userService = require("../user/user.service");
const bcrypt = require("bcrypt");

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

  //下一步
  next();
};

module.exports = {
  validateLoginData,
};
