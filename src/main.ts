import { Application, Router } from "oak";
import { APP_PORT } from "@/config.ts";
import { logger, responseTime } from "@/middleware.ts";
import { linkAPIRouter, linkRedirectRouter } from "@/link/router.ts";

const app = new Application();

app.use(logger);
app.use(responseTime);

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
