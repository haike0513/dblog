import { Hono } from 'hono'
import Index from "./server/index.tsx";
const app = new Hono()

app.get('/', (c) => c.html(<Index />))

export default app
