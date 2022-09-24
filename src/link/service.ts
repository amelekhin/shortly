import { APP_ORIGIN } from "../config.ts";
import { Link } from "./domain.ts";

const originalToShort = new Map<string, Link>();
const shortToOriginal = new Map<string, Link>();

export function createLink(originalURL: string): Link {
  const link = new Link(APP_ORIGIN, originalURL);

  originalToShort.set(link.originalURL, link);
  shortToOriginal.set(link.shortURL, link);

  return link;
}

export function getLinkFromShortURL(shortURL: string): Link | null {
  return shortToOriginal.get(shortURL) ?? null;
}

export function getLinkFromShortPathname(shortPathname: string): Link | null {
  return shortToOriginal.get(new URL(shortPathname, APP_ORIGIN).toString()) ?? null;
}

export function getAllLinks(): Link[] {
  return Array.from(shortToOriginal.values());
}
