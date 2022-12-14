import { Context } from "oak";

export async function logger(ctx: Context, next: () => Promise<unknown>): Promise<void> {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
}

export async function responseTime(ctx: Context, next: () => Promise<unknown>): Promise<void> {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
}
