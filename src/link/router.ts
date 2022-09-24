import { Router } from "oak";
import { createLink, getOriginalURL } from "./service.ts";

export type GetOriginalURLResponse = {
  originalURL: string;
  shortURL: string;
};

export type CreateLinkRequest = {
  url: string;
};

export type CreateLinkResponse = {
  originalURL: string;
  shortURL: string;
};

export const linkRouter = new Router();

linkRouter.prefix("/api/link")
  .get("/", (ctx) => {
    const shortURL = ctx.request.url.searchParams.get("shortURL");
    if (shortURL === null) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Missing shortURL" };

      return;
    }

    const originalURL = getOriginalURL(shortURL);
    if (originalURL === null) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Cannot find URL" };

      return;
    }

    ctx.response.body = { originalURL: getOriginalURL(shortURL), shortURL } as GetOriginalURLResponse;
  })
  .post("/", async (ctx) => {
    const { url } = await ctx.request.body({ type: "json" }).value as CreateLinkRequest;
    const link = createLink(url);

    ctx.response.body = { originalURL: link.originalURL, shortURL: link.shortURL } as CreateLinkResponse;
  });
