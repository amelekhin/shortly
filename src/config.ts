import { config } from "dotenv";

await config({ export: true });

export const APP_PORT = Deno.env.get("APP_PORT") ? Number(Deno.env.get("APP_PORT")) : 8080;
export const APP_ORIGIN = Deno.env.get("APP_ORIGIN") ?? "https://example.com/";
