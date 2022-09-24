import { Link } from "./domain.ts";

const originalToShort = new Map<string, string>();
const shortToOriginal = new Map<string, string>();

export function createLink(originalURL: string): Link {
  const domain = Deno.env.get("SHORT_ORIGIN")!;

  const link = new Link(domain, originalURL);

  originalToShort.set(link.originalURL, link.shortURL);
  shortToOriginal.set(link.shortURL, link.originalURL);

  return link;
}

export function getOriginalURL(shortURL: string): string | null {
  return shortToOriginal.get(shortURL) ?? null;
}
