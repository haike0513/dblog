// server/main.js

import {Hono} from "hono"
import {serveStatic} from "hono/deno"
import { logger } from 'hono/logger'

import middlewareReactRouter from "./middleware/reactRouter.ts"

const app = new Hono()

app.use(logger())

app.use("/assets/*", serveStatic({root: "./build/client"}))
app.use("*", middlewareReactRouter)

// Deno.serve(app.fetch)
export default app;