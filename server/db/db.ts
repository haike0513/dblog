import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import {users, posts} from "./schema.ts";
import { usersRelations, postsRelations } from "./relations.ts";
import { NodePgDatabase, NodePgClient } from "drizzle-orm/node-postgres";
export const schema = { users, posts, usersRelations, postsRelations };
export type DrizzleDB = NodePgDatabase<typeof schema> & {
    $client: NodePgClient;
};

export const db = drizzle({
  client: new pg.Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema,
});
