const { connection } = require("../database/mysql");

// 查询数据
const getPosts = async () => {
  const statement = `
  SELECT
  post.id,
  post.title,
  post.content,
  JSON_OBJECT(
    'id',user.id,
    'name',user.name
  ) as user
  FROM post
  LEFT JOIN user
    ON user.id = post.userId
  `;
  const [data] = await connection.promise().query(statement);
  return data;
};

// 创建内容

const createPost = async (post) => {
  //准备查询
  const statement = `
    INSERT INTO post
    SET ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, post);

  //提供数据
  return data;
};

module.exports = {
  getPosts,
  createPost,
};
