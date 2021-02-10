/*
 * @Author: your name
 * @Date: 2021-02-08 12:19:45
 * @LastEditTime: 2021-02-08 12:45:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactBlogServer\utils\query.js
 */
const connection = require("../config/db");

// 执行 sql
const query = function (sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = query;
