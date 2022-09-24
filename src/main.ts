import "dotenv/load.ts";
import { Application } from "oak";

const app = new Application();
const port = Number(Deno.env.get("PORT"));

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port });
