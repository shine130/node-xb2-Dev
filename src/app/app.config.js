const dotenv = require('dotenv');

dotenv.config();

const {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env;


/* 密钥配置 */

let {PRIVATE_KEY,PUBLIC_KEY} = process.env;

PRIVATE_KEY = Buffer.from(PRIVATE_KEY,'base64').toString();
PUBLIC_KEY = Buffer.from(PUBLIC_KEY,'base64').toString();



module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  PRIVATE_KEY,
  PUBLIC_KEY
}
