const {connection} = require('../database/mysql');

// 创建用户

const createUser = async (user) => {
  //准备查询
  const statement = `
    INSERT INTO user
    SET ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement,user);

  //提供数据

  return data;

}

module.exports = {
  createUser,
}