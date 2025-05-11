import { Hono } from 'hono'
import Index from "./server/index.tsx";
import { db } from "./db/db.ts";
import { usersTable } from "./db/schema.ts";
const app = new Hono()

// app.get('/', async (c) => {
//   // const result = await db.select().from(usersTable);
//   c.html(<Index />)
// })

export default app
