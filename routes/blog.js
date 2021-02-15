/*
 * @Author: your name
 * @Date: 2021-02-13 13:59:46
 * @LastEditTime: 2021-02-15 14:03:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactBlogServer\routes\blog.js
 */
const blogRouter = require("koa-router")();
const { secret } = require("../const/secret");
const user = require("../const/user");
// const tokenUtil = require("../utils/token");
const connection = require("../config/db");
// query
const query = require("../utils/query");
// const
const { publishTime } = require("../const/time");

// 获取用户信息
blogRouter.get("/getUserinfo", async (ctx) => {
  let userinfoResult;
  // 发送请求数据
  let sql = "SELECT * FROM admin_info WHERE id = 1";
  // 请求数据
  try {
    userinfoResult = await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库查询失败",
      },
    });
  }
  return (ctx.response.body = {
    code: 200,
    data: {
      userinfoData: userinfoResult[0] || [],
      txt: "查询 userinfo 成功",
      msg: "OK",
    },
  });
});

// 获取标签栏中信息内容
blogRouter.get("/getTabsInfo", async (ctx) => {
  // 获取博客信息条数
  let sql = `SELECT COUNT(*) FROM blog_info;`;
  let blogCount;
  try {
    blogCount = await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库更新博客信息失败",
      },
    });
  }

  let publishDay = Math.ceil((Date.now() - publishTime) / (3600 * 1000 * 24));

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "获取博客前端标签信息成功",
      blogTabInfo: {
        blogCount: blogCount[0]["COUNT(*)"],
        publishDay: publishDay,
      },
    },
  });
});

// 分页获取博客信息
blogRouter.get("/getBlogInfoByPage", async (ctx) => {
  // 查询博客信息
  let sql = "SELECT * FROM blog_info ORDER BY id DESC LIMIT 10 OFFSET ?;";
  let { offset } = ctx.request.query;
  let values = [Number(offset)];
  console.log(values)
  let blogInfoResult;
  try {
    blogInfoResult = await query(sql, values);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库查询博客信息失败",
      },
    });
  }
  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "获取博客信息成功",
      blogInfo: blogInfoResult,
    },
  });
});

// 获取热门文章
blogRouter.get("/getHotBlogInfo", async (ctx) => {
  // 查询博客信息
  let sql = "SELECT * FROM blog_info ORDER BY visits DESC LIMIT 10 OFFSET 0;";
  let blogHotInfoResult;
  try {
    blogHotInfoResult = await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库查询博客信息失败",
      },
    });
  }
  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "获取热门文章信息成功",
      blogHotInfo: blogHotInfoResult,
    },
  });
});


// 根据 id 获取博客信息
blogRouter.get("/getBlogInfoById", async (ctx) => {
  let { id } = ctx.request.query;
  // 查询博客信息
  let sql = "SELECT * FROM blog_info WHERE id = ?;";
  let values = [id];
  let blogDetailInfo;
  try {
    blogDetailInfo = await query(sql, values);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库通过 id 查询博客信息失败",
      },
    });
  }
  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "通过id获取博客信息文章信息成功",
      blogDetailInfo: blogDetailInfo,
    },
  });
});


module.exports = blogRouter;
