import { Router } from "oak";
import { createLink } from "./service.ts";

export type CreateLinkRequest = {
  url: string;
};

export type CreateLinkResponse = {
  originalUrl: string;
  shortUrl: string;
};

export const linkRouter = new Router();

linkRouter.prefix("/api")
  .post("/link/", async (ctx) => {
    const { url } = await ctx.request.body({ type: "json" }).value as CreateLinkRequest;
    const link = createLink(url);

    ctx.response.body = { originalUrl: link.originalUrl, shortUrl: link.shortUrl } as CreateLinkResponse;
  });
