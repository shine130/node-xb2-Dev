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

//更新内容

const updatePost = async (postId, post) => {
  //准备查询
  const statement = `
    UPDATE post
    SET ?
    WHERE id = ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement, [post, postId]);

  //提供数据
  return data;
};

//删除内容

const deletePost = async (postId) => {
  //准备查询
  const statement = `
    DELETE FROM post
    WHERE id = ?
  `;
  //执行查询
  const [data] = await connection.promise().query(statement, postId);
  //提供数据
  return data;
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
