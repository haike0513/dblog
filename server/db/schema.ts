import { pgTable, serial, text, foreignKey, integer, timestamp, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: text(),
	email: text().notNull(),
});

export const posts = pgTable("posts", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id"),
	description: text(),
	dateCreated: timestamp("date_created", { mode: 'string' }).defaultNow(),
	isComplete: boolean("is_complete"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "posts_user_id_fkey"
		}),
]);
