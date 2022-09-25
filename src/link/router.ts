import { Router, Status } from "oak";
import { getQuery } from "oak/helpers.ts";
import { APP_ORIGIN } from "@/config.ts";
import { decodeFromShortPathname, decodeFromShortURL, encodeURL } from "./service.ts";
import { LinkErrorCode } from "./errors.ts";

export type GetOriginalURLResponse = {
  originalURL: string;
  shortURL: string;
};

export type CreateLinkRequest = {
  originalURL: string;
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
  .post("/encode/", async (ctx) => {
    const { originalURL } = await ctx.request.body({ type: "json" }).value as CreateLinkRequest;
    if (!originalURL) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { code: LinkErrorCode.MissingOriginalURL };

      return;
    }

    try {
      const link = encodeURL(originalURL);
      ctx.response.body = { originalURL: link.originalURL, shortURL: link.shortURL } as CreateLinkResponse;
    } catch {
      ctx.response.body = { code: LinkErrorCode.InvalidOriginalURL };
    }
  })
  .get("/decode/", (ctx) => {
    const { shortURL } = getQuery(ctx, { mergeParams: true });
    if (shortURL === null) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { code: LinkErrorCode.MissingOriginalURL };

      return;
    }

    try {
      new URL(shortURL);
    } catch {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { code: LinkErrorCode.InvalidShortURL };

      return;
    }

    const link = decodeFromShortURL(shortURL);
    if (link === null) {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { code: LinkErrorCode.NoSuchShortURL };

      return;
    }

    ctx.response.body = { originalURL: link.originalURL, shortURL } as GetOriginalURLResponse;
  });
