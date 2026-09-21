import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { Router, type IRouter } from "express";
import { db, applicationsTable, companiesTable, jobsTable } from "@workspace/db";
import {
  CreateJobBody,
  CreateJobResponse,
  DeleteJobParams,
  GetJobParams,
  GetJobResponse,
  ListJobsQueryParams,
  ListJobsResponse,
  UpdateJobBody,
  UpdateJobParams,
  UpdateJobResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

async function serializeJob(id: number) {
  const [row] = await db
    .select({
      job: jobsTable,
      company: companiesTable,
      applicationCount: sql<number>`count(${applicationsTable.id})::int`,
    })
    .from(jobsTable)
    .innerJoin(companiesTable, eq(jobsTable.companyId, companiesTable.id))
    .leftJoin(applicationsTable, eq(applicationsTable.jobId, jobsTable.id))
    .where(eq(jobsTable.id, id))
    .groupBy(jobsTable.id, companiesTable.id);

  if (!row) return undefined;
  return {
    ...row.job,
    company: row.company,
    applicationCount: Number(row.applicationCount),
  };
}

router.get("/jobs", async (req, res): Promise<void> => {
  const parsed = ListJobsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { search, location, workType, status } = parsed.data;
  const filters = [];
  if (search) {
    filters.push(or(ilike(jobsTable.title, `%${search}%`), ilike(jobsTable.description, `%${search}%`)));
  }
  if (location) filters.push(ilike(jobsTable.location, `%${location}%`));
  if (workType) filters.push(eq(jobsTable.workType, workType));
  if (status) filters.push(eq(jobsTable.status, status));

  const rows = await db
    .select({
      job: jobsTable,
      company: companiesTable,
      applicationCount: sql<number>`count(${applicationsTable.id})::int`,
    })
    .from(jobsTable)
    .innerJoin(companiesTable, eq(jobsTable.companyId, companiesTable.id))
    .leftJoin(applicationsTable, eq(applicationsTable.jobId, jobsTable.id))
    .where(filters.length ? and(...filters) : undefined)
    .groupBy(jobsTable.id, companiesTable.id)
    .orderBy(desc(jobsTable.datePosted));

  res.json(
    ListJobsResponse.parse(
      rows.map((row) => ({
        ...row.job,
        company: row.company,
        applicationCount: Number(row.applicationCount),
      })),
    ),
  );
});

router.post("/jobs", async (req, res): Promise<void> => {
  const parsed = CreateJobBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const input = parsed.data;
  const [company] = await db
    .insert(companiesTable)
    .values({
      name: input.companyName,
      website: input.companyWebsite ?? null,
      contactEmail: input.companyContactEmail ?? input.contactEmail,
    })
    .onConflictDoUpdate({
      target: companiesTable.name,
      set: {
        website: input.companyWebsite ?? null,
        contactEmail: input.companyContactEmail ?? input.contactEmail,
      },
    })
    .returning();

  const [job] = await db
    .insert(jobsTable)
    .values({
      companyId: company.id,
      title: input.title,
      location: input.location,
      workType: input.workType,
      salary: input.salary ?? null,
      description: input.description,
      requirements: input.requirements,
      benefits: input.benefits ?? null,
      contactEmail: input.contactEmail,
      status: "Pending",
    })
    .returning();

  const result = await serializeJob(job.id);
  res.status(201).json(CreateJobResponse.parse(result));
});

router.get("/jobs/:id", async (req, res): Promise<void> => {
  const parsed = GetJobParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const result = await serializeJob(parsed.data.id);
  if (!result) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json(GetJobResponse.parse(result));
});

router.patch("/jobs/:id", async (req, res): Promise<void> => {
  const params = UpdateJobParams.safeParse(req.params);
  const body = UpdateJobBody.safeParse(req.body);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [updated] = await db
    .update(jobsTable)
    .set(body.data)
    .where(eq(jobsTable.id, params.data.id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  const result = await serializeJob(updated.id);
  res.json(UpdateJobResponse.parse(result));
});

router.delete("/jobs/:id", async (req, res): Promise<void> => {
  const parsed = DeleteJobParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [deleted] = await db
    .delete(jobsTable)
    .where(eq(jobsTable.id, parsed.data.id))
    .returning();
  if (!deleted) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;