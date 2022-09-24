import { Application, Router } from "oak";
import { linkAPIRouter, linkRedirectRouter } from "/link/router.ts";
import { APP_PORT } from "/config.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

const appRouter = new Router();
appRouter.get("/", (ctx) => {
  ctx.response.body = "";
});

const linkRouterV1 = new Router().prefix("/api/v1/link");
linkRouterV1
  .use(linkAPIRouter.routes())
  .use(linkAPIRouter.allowedMethods());

app
  .use(linkRouterV1.routes())
  .use(linkRouterV1.allowedMethods());

app
  .use(linkRedirectRouter.routes())
  .use(linkRedirectRouter.allowedMethods());

app
  .use(appRouter.routes())
  .use(appRouter.allowedMethods());

await app.listen({ port: APP_PORT });
