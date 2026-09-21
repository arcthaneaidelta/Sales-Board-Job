import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const companiesTable = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  website: text("website"),
  contactEmail: text("contact_email"),
});

export const jobsTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .notNull()
    .references(() => companiesTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  location: text("location").notNull(),
  workType: text("work_type").notNull(),
  salary: text("salary"),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  benefits: text("benefits"),
  contactEmail: text("contact_email").notNull(),
  status: text("status").notNull().default("Pending"),
  datePosted: timestamp("date_posted", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const applicationsTable = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  linkedinUrl: text("linkedin_url"),
  cvFileName: text("cv_file_name"),
  message: text("message"),
  dateApplied: timestamp("date_applied", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const companiesRelations = relations(companiesTable, ({ many }) => ({
  jobs: many(jobsTable),
}));

export const jobsRelations = relations(jobsTable, ({ one, many }) => ({
  company: one(companiesTable, {
    fields: [jobsTable.companyId],
    references: [companiesTable.id],
  }),
  applications: many(applicationsTable),
}));

export const applicationsRelations = relations(
  applicationsTable,
  ({ one }) => ({
    job: one(jobsTable, {
      fields: [applicationsTable.jobId],
      references: [jobsTable.id],
    }),
  }),
);

export const insertCompanySchema = createInsertSchema(companiesTable);
export const insertJobSchema = createInsertSchema(jobsTable);
export const insertApplicationSchema = createInsertSchema(applicationsTable);

export type Company = typeof companiesTable.$inferSelect;
export type Job = typeof jobsTable.$inferSelect;
export type Application = typeof applicationsTable.$inferSelect;