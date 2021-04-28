/*
 * @Author: your name
 * @Date: 2021-02-13 13:59:46
 * @LastEditTime: 2021-04-28 22:20:25
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
  console.log(values);
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

// 查询标签信息
blogRouter.get("/getTagsInfo", async (ctx) => {
  // 查询标签信息
  let sql = `SELECT * FROM tags_info;`;
  let tagsInfoData;
  // 插入 mysql
  try {
    tagsInfoData = await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库查询标签信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "获取标签信息成功",
      data: {
        tagsInfo: tagsInfoData,
      },
    },
  });
});

// 根据标签获取相应博客
blogRouter.get("/getBlogsInfoByTag", async (ctx) => {
  let { tag } = ctx.request.query;
  // 查询标签信息
  let sql = `SELECT * FROM blog_info WHERE tag LIKE '%${tag}%';`;
  let blogsInfoData;
  // 插入 mysql
  try {
    blogsInfoData = await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库根据标签获取博客信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "根据标签获取博客信息成功",
      blogsInfo: blogsInfoData,
    },
  });
});

// 增加访问量
blogRouter.get("/updateBlogVisits", async (ctx) => {
  let { id } = ctx.request.query;
  // 查询标签信息
  let sql = `UPDATE blog_info SET visits = visits + 1 WHERE id = ${id};`;
  // 插入 mysql
  try {
    await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库增加访问量信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "博客访问量增加成功",
    },
  });
});

// 获取 about 信息
blogRouter.get("/getAboutInfo", async (ctx) => {
  let aboutInfo;
  let sql = `SELECT * FROM about_info WHERE id = 1;`;
  try {
    aboutInfo = await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库查询关于信息失败",
      },
    });
  }
  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "获取关于信息成功",
      aboutInfo: aboutInfo[0],
    },
  });
});

/**
 * 友链
 */
blogRouter.post("/postLinksInfo", async (ctx) => {
  let { body } = ctx.request;
  let { name, website, logoUrl, description } = body.linksInfo;
  let sql = `INSERT INTO links_info (name, website, logoUrl, description, is_pass) VALUES (?, ?, ?, ?, false);`;
  let values = [name, website, logoUrl, description];
  try {
    await query(sql, values);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库插入友链信息失败",
      },
    });
  }
  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "提交友链信息成功",
    },
  });
});

// 获取通过的友链信息
blogRouter.get("/getLinksInfoByPass", async (ctx) => {
  let sql = "SELECT * FROM links_info WHERE is_pass = true;";
  let linksInfo;
  try {
    linksInfo = await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库获取通过的友链信息失败",
      },
    });
  }
  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "获取通过的友链信息成功",
      linksInfo,
    },
  });
});

/**
 * 生活区
 */
// 分页获取生活区信息
blogRouter.get("/getLifeInfo", async (ctx) => {
  // let sql = "SELECT * FROM life ORDER BY id DESC LIMIT 10 OFFSET ?;";
  let sql = "SELECT * FROM life ORDER BY isTop = TRUE DESC, id DESC LIMIT 10 OFFSET ?;"
  let sqlCount = "SELECT COUNT(id) FROM life;";
  let { offset } = ctx.request.query;
  let values = [Number(offset)];
  console.log(values);
  let lifeInfoResult;
  let lifeCount;
  try {
    lifeInfoResult = await query(sql, values);
    lifeCount = await query(sqlCount);
    console.log(lifeCount[0]["COUNT(id)"]);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 500,
      data: {
        msg: "数据库查询生活区信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      lifeList: lifeInfoResult,
    },
    msg: "获取生活区数据成功！",
    total: lifeCount[0]["COUNT(id)"],
  });
});

// 根据 id 获取生活区详情
blogRouter.get("/getLifeDetail", async (ctx) => {
  let { id } = ctx.request.query;
  let sql = "SELECT * FROM life WHERE id = ?;";
  let values = [id];
  let lifeDetail;
  try {
    lifeDetail = await query(sql, values);
  } catch (err) {
    console.log(err);
    ctx.response.body = {
      code: 500,
      data: {
        msg: "服务端获取生活区详情失败",
      },
    };
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      lifeDetail,
    },
    msg: "成功获取到生活区详情信息",
  });
});

// 增加访问量
blogRouter.get("/updateLifeVisits", async (ctx) => {
  let { id } = ctx.request.query;
  // 查询标签信息
  let sql = `UPDATE life SET visits = visits + 1 WHERE id = ${id};`;
  // 插入 mysql
  try {
    await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库增加生活区详情访问量信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    msg: "生活区访问量增加成功",
  });
});

module.exports = blogRouter;
