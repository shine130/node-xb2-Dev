const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app.config");
const {connection} = require('../database/mysql');

// 签发信息

const signToken = (options) => {
  //准备选项
  const { payload } = options;
  //签发JWT
  const token = jwt.sign(payload,PRIVATE_KEY,{algorithm:'RS256'});
  // 提供JWT
  return token;
};

const possess = async (options) => {
  //准备选项
  const {resourceId,resourceType,userId} = options;
  //准备查询
  const statement = `
  SELECT COUNT(${resourceType}.id) as count
  FROM ${resourceType}
  WHERE ${resourceType}.id = ? AND userId = ?
  `;
  //检查拥有权
  const [data] = await connection.promise().query(statement,[resourceId,userId]);

  //提供检查结果
  return data[0].count ? true:false;
}

module.exports = {
  signToken,
  possess
}