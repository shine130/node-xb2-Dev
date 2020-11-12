const {createComment} = require('./comment.service');

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

 module.exports = {
   store,
 };