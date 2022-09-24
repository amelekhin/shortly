import "dotenv/load.ts";

export const APP_PORT = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 8080;
export const APP_ORIGIN = Deno.env.get("APP_ORIGIN") ?? "https://example.com/";
