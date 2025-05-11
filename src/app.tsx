import { Hono } from 'hono'
import Index from "./server/index.tsx";
import { db } from "./db/db.ts";
const app = new Hono()

app.get('/', async (c) => {
  const result = await db.$client.execute('select 1');
  c.html(<Index />);
})

export default app
