/*
 * @Author: your name
 * @Date: 2021-02-04 11:10:03
 * @LastEditTime: 2021-02-08 18:53:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactBlogServer\routes\users.js
 */
const router = require('koa-router')()

router.prefix('/users')

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
});

module.exports = router
