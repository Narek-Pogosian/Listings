import { sql } from "drizzle-orm";
import { index, pgEnum, pgTableCreator, primaryKey } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => name);

export const experienceLevelEnum = pgEnum("experience_level", [
  "JUNIOR",
  "MID",
  "SENIOR",
]).enumValues;

export const listingStatusEnum = pgEnum("listing_status", [
  "DRAFT",
  "PUBLISHED",
  "CLOSED",
]).enumValues;

export const remoteTypeEnum = pgEnum("remote_type", [
  "ONSITE",
  "HYBRID",
  "REMOTE",
]).enumValues;

export const listings = createTable(
  "listing",
  (d) => ({
    id: d.uuid().defaultRandom().primaryKey(),
    title: d.varchar({ length: 256 }).notNull(),
    description: d.text().notNull(),
    city: d.varchar({ length: 256 }).notNull(),
    remote: d.text({ enum: remoteTypeEnum }).notNull(),
    salaryMin: d.integer(),
    salaryMax: d.integer(),
    currency: d.varchar({ length: 3 }), // ISO code like USD, EUR
    experienceLevel: d.text({ enum: experienceLevelEnum }),
    status: d.text({ enum: listingStatusEnum }).default("DRAFT").notNull(),
    // expiresAt: d.timestamp({ withTimezone: true }),
    employerId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("listing_employer_created_idx").on(t.employerId, t.createdAt),
    index("listing_status_created_idx").on(t.status, t.createdAt),
    index("listing_search_created_idx").on(
      t.status,
      t.remote,
      t.city,
      t.experienceLevel,
      t.createdAt,
    ),
    index("listing_search_salary_idx").on(
      t.status,
      t.remote,
      t.city,
      t.experienceLevel,
      t.salaryMin,
    ),
  ],
);

export const skills = createTable(
  "skills",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }).notNull().unique(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name").on(t.name)],
);

export const jobSkills = createTable(
  "job_skills",
  (d) => ({
    jobId: d
      .integer()
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    skillId: d
      .integer()
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
  }),
  (t) => [
    primaryKey({ columns: [t.jobId, t.skillId] }),
    index("job_id_idx").on(t.jobId),
    index("skill_id_idx").on(t.skillId),
  ],
);

export const userSkills = createTable(
  "user_skills",
  (d) => ({
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    skillId: d
      .integer()
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
  }),
  (t) => [
    primaryKey({ columns: [t.userId, t.skillId] }),
    index("user_id_idx").on(t.userId),
  ],
);

export const applicationStatusEnum = pgEnum("application_status", [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "WITHDRAWN",
]).enumValues;

export const applications = createTable(
  "applications",
  (d) => ({
    jobId: d
      .integer()
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: d
      .text({ enum: applicationStatusEnum })
      .default("PENDING")
      .notNull(),
    letter: d.text(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    primaryKey({ columns: [t.userId, t.jobId] }),
    index("job_id_idx").on(t.jobId),
    index("user_id_idx").on(t.userId),
    index("status_idx").on(t.status),
  ],
);

export const savedJobs = createTable(
  "saved_jobs",
  (d) => ({
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    jobId: d
      .integer()
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    primaryKey({ columns: [t.userId, t.jobId] }),
    index("user_id_idx").on(t.userId),
  ],
);

export const notificationTypeEnum = pgEnum("notification_type", [
  "APPLICATION_STATUS",
  "NEW_MATCH",
  "NEW_APPLICATION",
  "JOB_EXPIRING",
]).enumValues;

export const notifications = createTable(
  "notifications",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    message: d.text().notNull(),
    read: d.boolean().notNull().default(false),
    link: d.varchar({ length: 256 }),
    type: d.text({ enum: notificationTypeEnum }).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    index("user_id_idx").on(t.userId),
    index("user_read_created_idx").on(t.userId, t.read, t.createdAt),
  ],
);

export const roleEnum = pgEnum("role", [
  "USER",
  "EMPLOYER",
  "ADMIN",
]).enumValues;

export const users = createTable(
  "user",
  (d) => ({
    id: d
      .varchar({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: d.varchar({ length: 255 }).notNull(),
    email: d.varchar({ length: 255 }).notNull().unique(),
    hashedPassword: d.varchar({ length: 255 }).notNull(),
    image: d.varchar({ length: 255 }),
    role: d.text({ enum: roleEnum }).default("USER"),
    emailVerified: d
      .timestamp({
        mode: "date",
        withTimezone: true,
      })
      .default(sql`CURRENT_TIMESTAMP`),
  }),
  (t) => [index("email_idx").on(t.email)],
);

export const userInfo = createTable("userInfo", (d) => ({
  userId: d
    .varchar({ length: 255 })
    .notNull()
    .unique()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  bio: d.text(),
  resumeUrl: d.varchar({ length: 255 }),
}));
