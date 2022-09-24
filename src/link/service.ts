import { Link } from "./domain.ts";

const originalToShort = new Map<string, string>();
const shortToOriginal = new Map<string, string>();

export function createLink(originalUrl: string): Link {
  const domain = Deno.env.get("SHORT_ORIGIN")!;

  const link = new Link(domain, originalUrl);

  originalToShort.set(link.originalUrl, link.shortUrl);
  shortToOriginal.set(link.shortUrl, link.originalUrl);

  return link;
}
