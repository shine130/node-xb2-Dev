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

 /**
  * 过滤列表
  */

const filter = async (req,res,next) => {
  //解构查询符
  const {tag,user,action} = req.query;
  //设置默认的过滤
  req.filter = {
    name:'default',
    sql:'post.id IS NOT NULL',
  };

  //按标签名过滤
  if(tag && !user && !action){
    req.filter = {
      name:'tagName',
      sql:'tag.name = ?',
      param:tag,
    }
  }

  //过滤出用户发布的内容
  if(user && action == 'published' && !tag){
    req.filter = {
      name:'userPublished',
      sql:'user.id = ?',
      param:user,
    };
  }

  //下一步
  next();


}

 module.exports = {
   sort,
   filter,
 };