import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle({ connection: {
  url: Deno.env.get("DATABASE_URL")!, 
//   authToken: process.env.DATABASE_AUTH_TOKEN 
}});
