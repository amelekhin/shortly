import { Router } from "oak";
import { getQuery } from "oak/helpers.ts";
import { APP_ORIGIN } from "../config.ts";
import { createLink, getAllLinks, getLinkFromShortPathname, getLinkFromShortURL } from "./service.ts";

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

linkRouter
  .get("/", (ctx) => {
    const links = getAllLinks();

    ctx.response.body = `Welcome to ${APP_ORIGIN}!<br/><br/>`;
    ctx.response.body += links.map((link) => `<a href=${link.originalURL}>${link.shortURL}</a>`).join("<br/>");
    ctx.response.type = "html";
  })
  .get("/:shortPathname", (ctx) => {
    const { shortPathname } = getQuery(ctx, { mergeParams: true });

    const link = getLinkFromShortPathname(shortPathname);
    if (link === null) {
      ctx.response.redirect(APP_ORIGIN);
      return;
    }

    ctx.response.redirect(link.originalURL);
  })
  .get("/api/link/", (ctx) => {
    const { shortURL } = getQuery(ctx, { mergeParams: true });
    if (shortURL === null) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Missing shortURL" };

      return;
    }

    const link = getLinkFromShortURL(shortURL);
    if (link === null) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Cannot find URL" };

      return;
    }

    ctx.response.body = { originalURL: link.originalURL, shortURL } as GetOriginalURLResponse;
  })
  .post("/api/link/", async (ctx) => {
    const { url } = await ctx.request.body({ type: "json" }).value as CreateLinkRequest;
    const link = createLink(url);

    ctx.response.body = { originalURL: link.originalURL, shortURL: link.shortURL } as CreateLinkResponse;
  });
