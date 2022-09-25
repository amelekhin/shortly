import { APP_ORIGIN } from "@/config.ts";
import { Link } from "./domain.ts";

const shortToOriginal = new Map<string, Link>();

export function encodeURL(originalURL: string): Link {
  const link = new Link(APP_ORIGIN, originalURL);
  shortToOriginal.set(link.shortURL, link);

  return link;
}

export function decodeFromShortURL(shortURL: string): Link | null {
  return shortToOriginal.get(shortURL) ?? null;
}

export function decodeFromShortPathname(shortPathname: string): Link | null {
  return shortToOriginal.get(new URL(shortPathname, APP_ORIGIN).toString()) ?? null;
}
