// 用户登录

const login = async (req, res, next) => {
  //准备数据
  const { name, password } = req.body;
  //做出响应
  res.send({ message: `欢迎回来,${name}` });
};

module.exports = {
  login,
};
