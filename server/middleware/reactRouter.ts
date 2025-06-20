// server/middleware/reactRouter.js

// import * as build from "../../build/server/index.js"
import {createMiddleware} from "@hono/hono/factory"
import { Context } from "hono";
import {createRequestHandler, EntryContext, createStaticHandler} from "react-router"
// import * as build from "./entry.server.tsx";
// import handleRequest from "./entry.server.tsx"

// const handlerRaw = async (ctx: Context) => {

//   return await handleRequest(c, c.req.);

// }

export default createMiddleware(async (c, next) => {
  const handler = createRequestHandler(() => import("virtual:react-router/server-build"), "development");
// 
  // const handler = createRequestHandler(build as any, "production")
  const loaderContext = {
    HELLO_FROM_HONO: "hello from hono",
  }
  return await handler(c.req.raw, loaderContext);
  // const routerContext: EntryContext = {
  //   ssr: true,
  //   routeModules: {
  //     root: {},
  //   }
  //  } as EntryContext;
  // return await handleRequest(c.req.raw, c.res.status, c.res.headers, routerContext, loaderContext);
})

export const app = createMiddleware(async (c, next) => {
  const handler = createRequestHandler(() => import("virtual:react-router/server-build"), "development");
// 
  // const handler = createRequestHandler(build as any, "production")
  const loaderContext = {
    HELLO_FROM_HONO: "hello from hono",
  }
  return await handler(c.req.raw, loaderContext);
  // const routerContext: EntryContext = {
  //   ssr: true,
  //   routeModules: {
  //     root: {},
  //   }
  //  } as EntryContext;
  // return await handleRequest(c.req.raw, c.res.status, c.res.headers, routerContext, loaderContext);
})