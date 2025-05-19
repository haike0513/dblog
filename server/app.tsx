// server/main.js

import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { logger } from "@hono/hono/logger";
import { createServer as createViteServer, ViteDevServer } from "vite";

import middlewareReactRouter from "./middleware/reactRouter.ts";
import { createMiddleware } from "@hono/hono/factory";
import type { IncomingMessage, ServerResponse } from "node:http";
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

export function viteMiddleware() {
  return createMiddleware(async (ctx, next) => {
    console.log("viteMiddleware", ctx.req.raw.url);
    const vite = await getViteServer();
    // await next();

    return ctx.text("")

    // return await new Promise((resolve) => {
    //   // Bun
    //   let sent = false;
    //   const headers = new Headers();
    //   vite.middlewares(
    //     {
    //       url: new URL(ctx.req.raw.url, "http://localhost").pathname,
    //       method: ctx.req.raw.method,
    //       headers: Object.fromEntries(
    //         Object.entries(ctx.req.raw.headers),
    //       ),
    //       // headers,
    //     } as IncomingMessage,
    //     {
    //       setHeader(name, value: any) {
    //         console.log("set body");

    //         headers.set(name, value);
    //         // return this;
    //       },
    //       end(body) {
    //         sent = true;
    //         console.log("set body");
    //         resolve(
    //           ctx.body(
    //             body,
    //             200,
    //             Object.fromEntries(
    //               Object.entries(headers),
    //             ),
    //           ),
    //         );
    //       },
    //     } as ServerResponse,
    //     () => sent || resolve(next()),
    //   );
    // });
    // return ctx.text("");
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

app.use("*", middlewareReactRouter);
// app.use("*", viteMiddleware());

export default app;
