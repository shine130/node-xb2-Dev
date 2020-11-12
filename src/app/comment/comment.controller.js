const {
  createComment,
  isReplyComment,
  updateComment,
  deleteComment,
} = require("./comment.service");

/**
 * 发表评论
 */

 const store = async (req,res,next) => {
   //准备数据
   const {id:userId} = req.user;
   const {content,postId} = req.body;

   const comment = {
     content,
     postId,
     userId
   }

   try{
     //保存评论
     const data = await createComment(comment);
     //做出响应
     res.status(201).send(data);
   }catch(error){
    next(error);
   }

 };

 /**
  * 回复评论
  */

const reply = async (req,res,next) => {
  //准备数据
  const {commentId} = req.params;
  const parentId = parseInt(commentId,10);
  const {id:userId} = req.user;
  const {content,postId} = req.body;

  const comment = {
    content,
    postId,
    userId,
    parentId,
  };

  try{
    //检查评论是否为回复评论
    const reply = await isReplyComment(parentId);
    if(reply) return next(new Error('UNABLE_TO_REPLY_TTHIS_COMMENT'));

  }catch(error){
    return next(error);
  }

   try {
     //回复评论
     const data = await createComment(comment);
     //做出响应
     res.status(201).send(data);
   } catch (error) {
     next(error);
   }

}

/**
 * 修改评论
 */
const update = async (req,res,next) => {
  //准备数据
  const {commentId} = req.params;
  const {content} = req.body;

  const comment = {
    id:parseInt(commentId,10),
    content,
  }

  try{
    //修改评论
    const data = await updateComment(comment);

    //做出响应
    res.send(data);

  }catch(error){
    next(error);
  }

}

/**
 * 删除评论
 */

const destroy = async (req,res,next) => {
  //准备数据
  const {commentId} = req.params;

  try {
    //删除评论
    const data = await deleteComment(parseInt(commentId,10));
    //做出响应
    res.send(data);
  }catch(error){
    next(error);
  }

}


 module.exports = {
   store,
   reply,
   update,
   destroy,
 };