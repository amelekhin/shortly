import { APP_ORIGIN } from "@/config.ts";
import { Link } from "./domain.ts";

const shortToOriginal = new Map<string, Link>();

/**
 * Create a Link instance and keep in in the `shortToOriginal` map
 *
 * @param originalURL - a URL that needs to be shortened, expected to be valid
 * @returns a Link instance
 */
export function encodeURL(originalURL: string): Link {
  const link = new Link(APP_ORIGIN, originalURL);
  shortToOriginal.set(link.shortURL, link);

  return link;
}

/**
 * Find a Link instance that corresponds to a given short URL
 *
 * @param shortURL - a short URL that redirects to the original resource
 * @returns a Link instance or null if it's not found
 */
export function decodeFromShortURL(shortURL: string): Link | null {
  return shortToOriginal.get(shortURL) ?? null;
}

/**
 * Find a Link instance that corresponds to a given short URL using a generated pathname
 *
 * @param shortURL - a short URL's pathname
 * @returns a Link instance or null if it's not found
 */
export function decodeFromShortPathname(shortPathname: string): Link | null {
  return shortToOriginal.get(new URL(shortPathname, APP_ORIGIN).toString()) ?? null;
}

/**
 * Check if a string is a valid URL
 *
 * @param url - a URL to validate
 * @returns true if the URL is valid and false otherwise
 */
export function validateURL(url: string): boolean {
  return Link.validateURL(url);
}
