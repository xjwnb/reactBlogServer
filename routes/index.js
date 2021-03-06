/*
 * @Author: your name
 * @Date: 2021-02-04 11:10:03
 * @LastEditTime: 2021-02-13 14:02:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blogServer\reactBlogServer\routes\index.js
 */
const router = require("koa-router")();
// 后台管理
const adminRouter = require("./admin");
// 前端博客
const blogRouter = require("./blog");


router.use("/admin", adminRouter.routes(), adminRouter.allowedMethods());
router.use("/blog", blogRouter.routes(), blogRouter.allowedMethods());

module.exports = router;

/* router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
}) */