import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isPro: boolean(),
});

export type userTableType = typeof userTable.$inferInsert;
