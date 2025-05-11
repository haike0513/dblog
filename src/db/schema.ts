// schema.ts
import {
  boolean,
  foreignKey,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial().primaryKey().notNull(),
  name: text(),
  email: text().notNull(),
});

export const postsTable = pgTable("posts", {
  id: serial().primaryKey().notNull(),
  userId: integer("user_id"),
  description: text(),
  dateCreated: timestamp("date_created", { mode: "string" }).defaultNow(),
  isComplete: boolean("is_complete"),
}, (table) => {
  return {
    postsUserIdFkey: foreignKey({
      columns: [table.userId],
      foreignColumns: [usersTable.id],
      name: "posts_user_id_fkey",
    }),
  };
});
