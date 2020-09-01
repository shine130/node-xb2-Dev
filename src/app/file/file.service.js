const {connection} = require('../database/mysql')

// 存储文件信息

const createFile = async (file) => {
  // 准备查询
  const statement = `
    INSERT INTO file
    SET ?
  `;
  // 执行查询
  const [data] = await connection.promise().query(statement,file);

  //提供数据

  return data;

}



// 按ID查找文件

const findFileById = async (fileId) => {
  //准备查询
  const statement = `
    SELECT * FROM file
    WHERE id = ?
  `;

  //执行查询
  const [data] = await connection.promise().query(statement,fileId);

  //提供数据
  return data[0];

}



module.exports = {
  createFile,
  findFileById
}
