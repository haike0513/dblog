// server/main.js

import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { logger } from "@hono/hono/logger";
import { createServer as createViteServer, ViteDevServer } from "vite";

import middlewareReactRouter from "./middleware/reactRouter.ts";
import { createMiddleware } from "@hono/hono/factory";
import { connectToWeb } from '@universal-middleware/express'

// import type { IncomingMessage, ServerResponse } from "node:http";
import handleRequest from "./middleware/entry.server.tsx";
import {} from "@swc/core";
var port = Number(Deno.env.get("PORT")) || 5173;
var base = Deno.env.get("BASE") || "/";
var root = Deno.env.get("ROOT") || Deno.cwd();

let server: ViteDevServer;

export async function getViteServer() {
  if (!server) {
    server = await createViteServer({
      server: {
        middlewareMode: true,
      },
      base,
      root,
      appType: "custom",
    });
  }
  return server;
}
await getViteServer();
export function viteMiddleware() {
  return createMiddleware(async (ctx, next) => {
    console.log("viteMiddleware", ctx.req.raw.url);
    const viteDevServer = server;
    const h = connectToWeb(viteDevServer.middlewares);
    const response = await h(ctx.req.raw);
    // await next();
    console.log("viteMiddleware", response);
    // console.log("viteMiddleware", viteDevServer.middlewares);
    if(response) {
      return response;
    }
    await next();
  });
}

const app = new Hono();

// app.use(vite.middlewares)

app.use(logger());
app.get("/api/v1/hono", (c) => c.text("Hono!"));

app.use(
  "/assets/*",
  serveStatic({
    root: "./build/client/",
    precompressed: true,
    onNotFound: (path) => {
      console.log("hono not found", path);
    },
  }),
);
// app.use("/assets/*", async(c, next) => {
//     console.log("next", c.req);
//     await next();
//     c.res = new Response();
// })

// app.use("*", middlewareReactRouter)
app.use("*", viteMiddleware());
app.use("*", async (c, next) => {
  return await handleRequest(c.req.raw, c.res.headers);
});

export default app;
