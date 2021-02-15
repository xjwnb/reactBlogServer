/*
 * @Author: your name
 * @Date: 2021-02-04 11:10:03
 * @LastEditTime: 2021-02-13 14:03:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blogServer\reactBlogServer\blogApp.js
 */
const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

var cors = require("koa2-cors");

// jwt
const koaJWT = require("koa-jwt");
const { secret } = require("./const/secret");

// userinfo
const user = require("./const/user");

// cors
app.use(
  cors({
    origin: function (ctx) {
      if (ctx.url === "/test") {
        return false;
      }
      return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

// routes
const routes = require("./routes");
// mysql
require("./config/db");

/* const index = require('./routes/index')
const users = require('./routes/users')
const adminRouter = require("./routes/admin"); */

// error handler
onerror(app);

// middlewares
/* app.use(async (ctx, next) => {
  if (ctx.path === "/disable") ctx.disableBodyParser = true;
  await next();
}); */
/* app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
    formLimit: "10000MB",
    jsonLimit: "10000MB",
    textLimit: "10000MB",
  })
); */
app.use(bodyparser());
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

/* app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      throw err;
    }
  });
}); */

// jwt 验证 token
app.use(
  koaJWT({ secret: secret }).unless({
    path: [/^\/admin\/login/, /^\/blog/],
  })
);

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(routes.routes(), routes.allowedMethods());
/* app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use("/admin", adminRouter.routes(), adminRouter.allowedMethods()); */

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
