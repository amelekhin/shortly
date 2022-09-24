import { Application } from "oak";
import { Router } from "oak";
import { PORT } from "./config.ts";
import { linkRouter } from "./link/router.ts";

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

const mainRouter = new Router();
mainRouter.get("/", (ctx) => {
  ctx.response.body = "";
});

app.use(mainRouter.routes());
app.use(mainRouter.allowedMethods());

app.use(linkRouter.routes());
app.use(linkRouter.allowedMethods());

await app.listen({ port: PORT });
