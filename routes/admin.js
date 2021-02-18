/*
 * @Author: your name
 * @Date: 2021-02-04 15:04:37
 * @LastEditTime: 2021-02-18 21:02:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blogServer\reactBlogServer\routes\admin.js
 */
const adminRouter = require("koa-router")();
const { secret } = require("../const/secret");
const user = require("../const/user");
const tokenUtil = require("../utils/token");
const connection = require("../config/db");
// query
const query = require("../utils/query");

// 登录
adminRouter.post("/login", async (ctx) => {
  const { body } = ctx.request;
  let token;
  // 非空判断
  if (!body.username.trim() || !body.password.trim())
    return (ctx.response.body = {
      code: 401,
      data: {
        msg: "用户名或密码错误",
      },
    });
  // 判断登录信息
  const { username, password } = user.USERINFO;
  const isloginInfo = username === body.username && password === body.password;
  if (!isloginInfo)
    return (ctx.response.body = {
      code: 401,
      data: {
        msg: "用户名或密码错误",
      },
    });
  // 通过验证，生成 token
  try {
    token = await tokenUtil.setToken(
      { username: body.username, id: 1 },
      secret,
      user.expiresIn
    );
  } catch (err) {
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "生成 token 错误",
      },
    });
  }
  // 返回正确
  return (ctx.response.body = {
    code: 200,
    data: {
      token,
      msg: "登录成功",
    },
  });
});

// 获取用户信息
adminRouter.get("/userinfo", async (ctx) => {
  let userinfoResult;
  // 验证token
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

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
      userinfoData: userinfoResult || [],
      txt: "查询 userinfo 成功",
      msg: "OK",
    },
  });
});

// 提交用户信息
adminRouter.post("/postUserInfo", async (ctx) => {
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }
  // 修改用户表信息
  const { body } = ctx.request;
  const { name, personal_profile, avatarUrl, bgUrl } = body.userinfo;
  let sql = `UPDATE admin_info SET 
    name = ?,
    personal_profile = ?, 
    avatarUrl = ?, 
    bgUrl = ? WHERE id = 1`;
  let values = [name, personal_profile, avatarUrl, bgUrl];
  // 修改 mysql
  try {
    // userinfoResult = await query(sql, values);
    await query(sql, values);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库修改用户信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "修改用户表成功",
    },
  });
});

// 提交标签信息
adminRouter.post("/postTagsInfo", async (ctx) => {
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

  // 提交标签信息
  let { body } = ctx.request;
  let { name, color } = body.tagsInfo;
  let sql = `INSERT INTO tags_info (name, color) VALUES (?, ?);`;
  let values = [name, color];
  // 插入 mysql
  try {
    await query(sql, values);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库插入标签信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "提交标签信息成功",
    },
  });
});

// 查询标签信息
adminRouter.get("/getTagsInfo", async (ctx) => {
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

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

// 删除 tag 标签
adminRouter.post("/deleteTagsInfo", async (ctx) => {
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

  // 删除标签信息
  let { body } = ctx.request;
  let { name } = body;
  let sql = `DELETE FROM tags_info WHERE name = ?;`;
  let values = [name];
  let tagsInfoData;
  // 插入 mysql
  try {
    tagsInfoData = await query(sql, values);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库删除标签信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "删除标签信息成功",
    },
  });
});

// 插入博客表信息
adminRouter.post("/postBlogInfo", async (ctx) => {
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

  // 插入博客信息
  let { body } = ctx.request;
  let {
    title,
    name,
    time,
    description_info,
    picture,
    tag,
    content,
    htmlContent,
  } = body.blogInfo;
  let sql =
    "INSERT INTO blog_info (visits, title, name, time, description_info, picture, tag, content, htmlContent) VALUES (?, ?, ?, ?, ? , ?, ?, ?, ?); ";
  let values = [
    0,
    title,
    name,
    time,
    description_info,
    picture,
    tag,
    content,
    htmlContent,
  ];
  // 插入 mysql
  try {
    await query(sql, values);
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
      msg: "提交博客信息成功",
    },
  });
});

// 分页查询获取博客信息
adminRouter.get("/getBlogInfo", async (ctx) => {
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

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

// 更新博客信息
adminRouter.post("/updateBlogInfo", async (ctx) => {
  // 验证 token
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

  // 更新博客信息
  let { body } = ctx.request;
  let {
    id,
    title,
    name,
    time,
    description_info,
    picture,
    tag,
    content,
    htmlContent,
  } = body.blogInfo;
  let sql = `UPDATE blog_info SET title = ?, name = ?, time = ?, description_info = ?, picture = ?, tag = ?, content = ?, htmlContent = ? WHERE id = ?;`;
  let values = [
    title,
    name,
    time,
    description_info,
    picture,
    tag,
    content,
    htmlContent,
    id,
  ];
  try {
    await query(sql, values);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库更新博客信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "更新博客信息成功",
    },
  });
});

// 博客表数据数量
adminRouter.get("/getBlogInfoCount", async (ctx) => {
  // 验证 token
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

  let sql = `SELECT COUNT(*) FROM blog_info;`;
  let count;
  try {
    count = await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库获取博客内容条数信息失败",
      },
    });
  }
  console.log("getBlogInfoCount", count[0]["COUNT(*)"]);

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "获取博客数量成功",
      count: count[0]["COUNT(*)"],
    },
  });
});

// 删除博客信息
adminRouter.post("/deleteBlogInfo", async (ctx) => {
  // 验证 token
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

  // 删除博客信息
  let { body } = ctx.request;
  let { id } = body;
  let sql = `DELETE FROM blog_info WHERE id = ?;`;
  let values = [id];
  try {
    await query(sql, values);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库删除博客信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "删除博客信息成功",
    },
  });
});

/**
 * About
 */
// 查询 about 信息
adminRouter.get("/getAboutInfo", async (ctx) => {
  // 验证 token
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

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

// 提交  About 信息
adminRouter.post("/postAboutInfo", async (ctx) => {
  // 验证 token
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

  // 提交 about 信息
  let { body } = ctx.request;
  let { content, htmlContent } = body.aboutInfo;
  let sql = `UPDATE about_info SET content = ?, htmlContent = ? WHERE id = 1;`;
  let values = [content, htmlContent];
  try {
    await query(sql, values);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库更新关于信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "提交关于信息成功",
    },
  });
});

/**
 * Links 友链
 */

//  获取友链信息
adminRouter.get("/getLinksInfo", async (ctx) => {
  // 验证 token
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }

  // 请求友链
  let linksInfo;
  let sql = `SELECT * FROM links_info ;`;
  try {
    linksInfo = await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库查询友链信息失败",
      },
    });
  }

  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "获取友链信息成功",
      linksInfo: linksInfo,
    },
  });
});

// 修改友链信息
adminRouter.post("/updateLinksInfo", async (ctx) => {
  // 验证 token
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }
  let { body } = ctx.request;
  let { name, website, logoUrl, description, is_pass, id } = body.linksInfo;
  let sql = `UPDATE links_info SET name = ?, website = ?, logoUrl  = ?, description = ?, is_pass = ? WHERE id = ?;`;
  let values = [name, website, logoUrl, description, is_pass, id];
  try {
    await query(sql, values);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库插更新友链信息失败",
      },
    });
  }
  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "更新友链信息成功",
    },
  });
});

// 删除友链信息
adminRouter.post("/deleteLinksInfo", async (ctx) => {
  // 验证 token
  if (!ctx.header && !ctx.header.authorization)
    return (ctx.response.body = {
      code: 404,
      data: {
        msg: "请求头没有token",
      },
    });
  let token = ctx.header.authorization;
  // 验证 token
  try {
    await tokenUtil.verifyToken(token, secret);
  } catch (err) {
    // 验证失败
    return (ctx.response.body = {
      code: 10011,
      data: {
        msg: "token 过期或无效",
      },
    });
  }
  let { body } = ctx.request;
  let { id } = body;
  let sql = `DELETE FROM links_info WHERE id = ${id};`;
  try {
    await query(sql);
  } catch (err) {
    console.log(err);
    return (ctx.response.body = {
      code: 400,
      data: {
        msg: "数据库插删除友链信息失败",
      },
    });
  }
  return (ctx.response.body = {
    code: 200,
    data: {
      msg: "删除友链信息成功",
    },
  });
});

module.exports = adminRouter;
