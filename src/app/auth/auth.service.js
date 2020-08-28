const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app.config");

// 签发信息

const signToken = (options) => {
  //准备选项
  const { payload } = options;
  //签发JWT
  const token = jwt.sign(payload,PRIVATE_KEY,{algorithm:'RS256'});
  // 提供JWT
  return token;
};

module.exports = {
  signToken
}