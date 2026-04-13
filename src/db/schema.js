import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {

  id: uuid('id').primaryKey().defaultRandom(),

  fullName: varchar('fullName',{ length: 45 }).notNull(),

  email: varchar('email',{ length: 322 }).notNull().unique(),
  password: varchar('password', { length: 66 }),
  refreshToken: text('refreshToken'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updateAt: timestamp('updated_at').$onUpdate(() => new Date())
});
