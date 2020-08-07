const { getPosts, createPost } = require("./post.service");

/* 内容列表 */

const index = async (req, res, next) => {
  // if(req.headers.authorization !== 'secret'){
  //   return next(new Error());
  // }

  try {
    const posts = await getPosts();
    res.send(posts);
  } catch (error) {
    next(error);
  }
};

/* 创建内容 */

const store = async (req, res, next) => {
  //准备数据
  const { title, content } = req.body;
  //创建内容
  try {
    const data = await createPost({ title, content });
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  store,
};
