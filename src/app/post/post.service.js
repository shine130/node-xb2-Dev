const { connection } = require("../database/mysql");

/**
 * 获取内容列表
 */
const getPosts = async () => {
  const statement = `
  SELECT
  post.id,
  post.title,
  post.content,
  JSON_OBJECT(
    'id',user.id,
    'name',user.name
  ) as user,
(
 SELECT
  COUNT(comment.id)
 FROM
  comment
 WHERE
  comment.postId = post.id
) as totalComments,
 CAST(
   IF(
     COUNT(file.id),
     GROUP_CONCAT(
       DISTINCT JSON_OBJECT(
         'id',file.id,
         'width',file.width,
         'height',file.height
       )
     ),
     NULL
   ) AS JSON
 ) AS file,
CAST(
  IF(
    COUNT(tag.id),
    CONCAT(
      '[',
      GROUP_CONCAT(
        DISTINCT JSON_OBJECT(
          'id',tag.id,
          'name',tag.name
        )
      ),
      ']'
    ),
    NULL
  ) AS JSON
) AS tags
  FROM post
  LEFT JOIN user
    ON user.id = post.userId
 LEFT JOIN LATERAL (
   SELECT *
   FROM file
   WHERE file.postId = post.id
   ORDER BY file.id DESC
   LIMIT 1
 ) AS file ON post.id = file.postId
 LEFT JOIN
 post_tag ON post_tag.postId = post.id
LEFT JOIN
 tag ON post_tag.tagId = tag.id
 GROUP BY post.id
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

//保存内容标签

const createPostTag = async(postId,tagId) => {
  //准备查询
  const statement = `
    INSERT INTO post_tag (postId,tagId)
    VALUES(?,?)
  `;

  //执行查询
  const [data] = await connection.promise().query(statement,[postId,tagId]);

  //提供数据
  return data;

}

//检查内容标签

const postHasTag = async (postId,tagId) => {
  //准备查询
  const statement = `
    SELECT * FROM post_tag
    WHERE postId=? AND tagId=?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement,[postId,tagId]);

  //提供数据
  return data[0] ? true:false;

};

//移除内容标签

const deletePostTag = async (postId,tagId) => {
  //准备查询
  const statement = `
    DELETE FROM post_tag
    WHERE postId = ? AND tagId = ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement,[postId,tagId]);

  //提供数据
  return data;

}

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  createPostTag,
  postHasTag,
  deletePostTag,
};
