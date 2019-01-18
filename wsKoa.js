const koa = require("koa");
const Router = require("koa-router");
const websocket = require("koa-websocket");

const app = websocket(new koa());

const router = new Router();

router.all("/mei/:memberId", ctx => {
  console.log("websocket链接建立");
  let memberId = ctx.params.memberId; // 获取动态路由参数
  ctx.websocket.on("message", function(message) {
    if (memberId == 123) {
      ctx.websocket.send(message);
    }
  });
});

app.ws.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("websocket服务器启动于ws://127.0.0.1:3000");
});
