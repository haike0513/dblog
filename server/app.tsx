// server/main.js

import {Hono} from "@hono/hono"
import {serveStatic} from "@hono/hono/deno"
import { logger } from '@hono/hono/logger'
// import { createServer as createViteServer } from 'vite'


import middlewareReactRouter from "./middleware/reactRouter.ts"
//  const vite = await createViteServer({
//     server: { middlewareMode: true },
//     appType: 'custom'
//   })

const app = new Hono()

// app.use(vite.middlewares)

app.use(logger())
app.get('/api/v1/hono', (c) => c.text('Hono!'))

app.use("/assets/*", serveStatic({root: "./build/client/",
    precompressed: true,
    onNotFound: (path) => {
    console.log("hono not found", path);
}}))
// app.use("/assets/*", async(c, next) => {
//     console.log("next", c.req);
//     await next();
//     c.res = new Response();
// })

app.use("*", middlewareReactRouter)

export default app;