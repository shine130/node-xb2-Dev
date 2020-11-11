const { connection } = require("../database/mysql");

// 创建标签

const createTag = async (tag) => {
  //准备查询
  const statement = `
    INSERT INTO tag
    SET ?
  `;
  //执行查询
  const [data] = await connection.promise().query(statement, tag);
  //提供数据
  return data;
};

// 按名字查找标签
const getTagByName = async (tagName) => {
  //准备查询
  const statement = `
    SELECT id,name FROM tag
    WHERE name = ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement,tagName);

  //提供数据
  return data[0];

}

module.exports = {
  createTag,
  getTagByName
};