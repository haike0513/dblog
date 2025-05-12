// server/middleware/reactRouter.js

import * as build from "../../build/server/index.js"
import {createMiddleware} from "@hono/hono/factory"
import {createRequestHandler} from "react-router"
// import * as build from "./entry.server.tsx";

export default createMiddleware(async (c, next) => {
  const handler = createRequestHandler(build as any, "production")
  const loaderContext = {
    HELLO_FROM_HONO: "hello from hono",
  }
  return await handler(c.req.raw, loaderContext)
})