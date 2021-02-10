/*
 * @Author: your name
 * @Date: 2021-02-04 15:28:38
 * @LastEditTime: 2021-02-08 10:27:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blogServer\reactBlogServer\config\db.js
 */
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456",
  database: "react_blog",
  multipleStatements: true
});
connection.connect((err, data) => {
  if (err) throw err;
  console.log("database connect is success");
});
// connection.end();

module.exports = connection;