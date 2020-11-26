/**
 * 排序方式
 */

 const sort = async (req,res,next) => {
   //获取客户端的排序方式
   const {sort} = req.query;
   //排序用的sql
   let sqlSort;

   //设置排序用的SQL
   switch (sort) {
     case "earliest":
       sqlSort = "post.id ASC";
       break;
     case "latest":
       sqlSort = "post.id DESC";
       break;
     case "most_comments":
       sqlSort = "totalComments DESC,post.id DESC";
       break;
     default:
       sqlSort = 'post.id DESC';
       break;
   }

   //在请求中添加排序
   req.sort = sqlSort;
   //下一步
   next();

 }

 module.exports = {
   sort,
 };