import { Router, Status } from "oak";
import { getQuery } from "oak/helpers.ts";
import { APP_ORIGIN } from "@/config.ts";
import { decodeFromShortPathname, decodeFromShortURL, encodeURL, validateURL } from "./service.ts";
import { LinkErrorCode } from "./errors.ts";

export type EncodeRequest = {
  originalURL: string;
};

export type EncodeResponse = {
  originalURL: string;
  shortURL: string;
};

export type DecodeResponse = {
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
    const { originalURL } = await ctx.request.body({ type: "json" }).value as EncodeRequest;
    if (!originalURL) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { code: LinkErrorCode.MissingOriginalURL };

      return;
    }

    if (!validateURL(originalURL)) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { code: LinkErrorCode.InvalidOriginalURL };

      return;
    }

    const link = encodeURL(originalURL);
    ctx.response.body = { originalURL: link.originalURL, shortURL: link.shortURL } as EncodeResponse;
  })
  .get("/decode/", (ctx) => {
    const { shortURL } = getQuery(ctx, { mergeParams: true });
    if (shortURL === null) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { code: LinkErrorCode.MissingShortURL };

      return;
    }

    if (!validateURL(shortURL)) {
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

    ctx.response.body = { originalURL: link.originalURL, shortURL: link.shortURL } as DecodeResponse;
  });
