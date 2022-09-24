import "dotenv/load.ts";

export const PORT = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 8080;
export const SHORT_ORIGIN = Deno.env.get("SHORT_ORIGIN") ?? "https://example.com/";
