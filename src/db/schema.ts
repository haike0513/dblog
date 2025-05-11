// schema.ts
import {sqliteTable, text, numeric} from "drizzle-orm/sqlite-core";

export const dinosaurs = sqliteTable("dinosaurs", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  description: text().notNull(),
  weight: numeric().notNull(),
});