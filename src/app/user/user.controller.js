const userService = require("./user.service");

//创建用户

const store = async (req, res, next) => {
  //准备数据
  const { name, password } = req.body;

  //创建用户
  try {
    const data = await userService.createUser({ name, password });
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  store,
};
