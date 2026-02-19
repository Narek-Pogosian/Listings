import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => name);

export const listings = createTable(
  "listing",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    title: d.varchar({ length: 256 }).notNull(),
    description: d.text(),
    // createdById: d
    //   .varchar({ length: 255 })
    //   .notNull()
    //   .references(() => users.id),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  // (t) => [index("created_by_idx").on(t.createdById)],
);

// export const users = createTable(
//   "user",
//   (d) => ({
//     id: d
//       .varchar({ length: 255 })
//       .notNull()
//       .primaryKey()
//       .$defaultFn(() => crypto.randomUUID()),
//     name: d.varchar({ length: 255 }).notNull(),
//     email: d.varchar({ length: 255 }).notNull().unique(),
//     hashedPassword: d.varchar({ length: 255 }).notNull(),
//     image: d.varchar({ length: 255 }),
//     emailVerified: d
//       .timestamp({
//         mode: "date",
//         withTimezone: true,
//       })
//       .default(sql`CURRENT_TIMESTAMP`),
//   }),
//   (t) => [index("email_idx").on(t.email)],
// );
