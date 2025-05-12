// server/main.js

import {Hono} from "@hono/hono"
import {serveStatic} from "@hono/hono/deno"
import { logger } from '@hono/hono/logger'

import middlewareReactRouter from "./middleware/reactRouter.ts"

const app = new Hono()

app.use(logger())
app.get('/api/v1/hono', (c) => c.text('Hono!'))
app.use("/assets/*", serveStatic({root: "./build/client/",
    precompressed: true,
    onNotFound: (path) => {
    console.log("hono not found", path);
}}))
app.use("*", middlewareReactRouter)

export default app;