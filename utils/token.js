/*
 * @Author: your name
 * @Date: 2021-02-06 19:23:56
 * @LastEditTime: 2021-02-07 00:06:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactBlogServer\utils\setToken.js
 */
const jwt = require("jsonwebtoken");

// 生成 token
function setToken(token, secret, expiresIn) {
  return new Promise((resolve, reject) => {
    jwt.sign(token, secret, {
      expiresIn,
    }, (err, token) => {
      err ? reject(err) : resolve(token);
    });
  })
}

// 解析 token
function verifyToken(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token.split(" ")[1], secret, (err, decoded)=> {
      err ? reject(err) : resolve(decoded)
    });
  })
}

module.exports = {
  setToken,
  verifyToken
}
