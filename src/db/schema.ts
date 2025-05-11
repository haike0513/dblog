// schema.ts
import {sqliteTable, text, numeric} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  email: text().notNull(),
  age: numeric().notNull(),
});