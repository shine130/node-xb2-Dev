const {connection} = require("../database/mysql");

/**
 * 创建评论
 */

 const createComment = async (comment) => {
   //准备查询
   const statement = `
    INSERT INTO comment
    SET ?
   `;
   //执行查询
   const [data] = await connection.promise().query(statement,comment);

   //提供数据
   return data;

 }

 module.exports = {
   createComment,
 };