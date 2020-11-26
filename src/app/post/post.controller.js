const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  createPostTag,
  postHasTag,
  deletePostTag,
} = require("./post.service");
const _ = require('lodash');
const {getTagByName,createTag} = require("../tag/tag.service");

/* 内容列表 */

const index = async (req, res, next) => {
  // if(req.headers.authorization !== 'secret'){
  //   return next(new Error());
  // }

  try {
    const posts = await getPosts({sort:req.sort});
    res.send(posts);
  } catch (error) {
    next(error);
  }
};

/* 创建内容 */

const store = async (req, res, next) => {
  //准备数据
  const { title, content } = req.body;
  const {id:userId} = req.user;
  //创建内容
  try {
    const data = await createPost({ title, content,userId });
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/* 更新内容 */

const update = async (req, res, next) => {
  // 获取内容ID
  const { postId } = req.params;
  //准备数据
  const post = _.pick(req.body,['title','content']);
  //更新
  try {
    const data = await updatePost(parseInt(postId, 10), post);
    res.send(data);
  } catch (error) {
    next(error);
  }
};

/* 删除数据 */

const destroy = async (req,res,next) => {
  //获取内容ID
  const {postId} = req.params;
  //删除内容
  try{
    const data = await deletePost(parseInt(postId,10));
    res.send(data);
  }catch(error){ 
    next(error);
  }
}

/* 添加内容标签 */
const storePostTag = async (req,res,next) => {
  //准备数据
  const {postId} = req.params;
  const {name} = req.body;

  //查找标签
  try{
    tag = await getTagByName(name);
  }catch(error){
    return next(error);
  }

  //找到标签，验证内容标签
  if(tag){
    try{
      const postTag = await postHasTag(parseInt(postId,10),tag.id);
      if(postTag) return next(new Error('POST_ALREADY_HAS_THIS_TAG'));
    }catch(error){
      return next(error);
    }
  }

  //没找到标签，创建这个标签
  if(!tag){
    try{
      const data = await createTag({name});
      tag = {id:data.inserId};
    }catch(error){
      return next(error);
    }
  }

  //给内容打上标签
  try{
    await createPostTag(parseInt(postId,10),tag.id);
    res.sendStatus(201);
  }catch(error){
    return next(error);
  }

  
}

/* 移除内容标签 */

const destroyPostTag = async (req,res,next) => {
  //准备数据
  const {postId} = req.params;
  const {tagId} = req.body;

  //移除内容标签
  try {
    await deletePostTag(parseInt(postId,10),tagId);
    res.sendStatus(200);
  }catch(error){
    next(error);
  }

}


module.exports = {
  index,
  store,
  update,
  destroy,
  storePostTag,
  destroyPostTag,
};
