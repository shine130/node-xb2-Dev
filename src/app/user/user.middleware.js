const userService = require("./user.service");

// 验证用户数据

const validateUserData = async (req, res, next) => {
  console.log("验证用户数据");

  //准备数据
  const { name, password } = req.body;
  //验证必填数据
  if (!name) return next(new Error("NAME_IS_REQUIRED"));
  if (!password) return next(new Error("PASSWORD_IS_REQUIRED"));
  //下一步
  next();
};

module.exports = {
  validateUserData,
};
