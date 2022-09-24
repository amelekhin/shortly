import { Router } from "oak";
import { getQuery } from "oak/helpers.ts";
import { APP_ORIGIN } from "../config.ts";
import { decodeFromShortPathname, decodeFromShortURL, encodeURL } from "./service.ts";

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

export const linkRedirectRouter = new Router();

linkRedirectRouter
  .get("/:shortPathname", (ctx) => {
    const { shortPathname } = getQuery(ctx, { mergeParams: true });

    const link = decodeFromShortPathname(shortPathname);
    if (link === null) {
      ctx.response.redirect(APP_ORIGIN);
      return;
    }

    ctx.response.redirect(link.originalURL);
  });

export const linkAPIRouter = new Router();

linkAPIRouter
  .get("/decode/", (ctx) => {
    const { shortURL } = getQuery(ctx, { mergeParams: true });
    if (shortURL === null) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Missing shortURL" };

      return;
    }

    const link = decodeFromShortURL(shortURL);
    if (link === null) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Cannot find URL" };

      return;
    }

    ctx.response.body = { originalURL: link.originalURL, shortURL } as GetOriginalURLResponse;
  })
  .post("/encode", async (ctx) => {
    const { url } = await ctx.request.body({ type: "json" }).value as CreateLinkRequest;
    const link = encodeURL(url);

    ctx.response.body = { originalURL: link.originalURL, shortURL: link.shortURL } as CreateLinkResponse;
  });
