import { desc, eq } from "drizzle-orm";
import { Router, type IRouter } from "express";
import { db, applicationsTable, companiesTable, jobsTable } from "@workspace/db";
import {
  CreateApplicationBody,
  CreateApplicationResponse,
  ListApplicationsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

async function listApplicationRows() {
  return db
    .select({
      application: applicationsTable,
      job: jobsTable,
      company: companiesTable,
    })
    .from(applicationsTable)
    .innerJoin(jobsTable, eq(applicationsTable.jobId, jobsTable.id))
    .innerJoin(companiesTable, eq(jobsTable.companyId, companiesTable.id))
    .orderBy(desc(applicationsTable.dateApplied));
}

function serializeApplication(row: Awaited<ReturnType<typeof listApplicationRows>>[number]) {
  return {
    ...row.application,
    jobId: row.job.id,
    jobTitle: row.job.title,
    companyName: row.company.name,
    phone: row.application.phone,
    linkedinUrl: row.application.linkedinUrl,
    message: row.application.message,
  };
}

router.get("/applications", async (_req, res): Promise<void> => {
  const rows = await listApplicationRows();
  res.json(ListApplicationsResponse.parse(rows.map(serializeApplication)));
});

router.post("/applications", async (req, res): Promise<void> => {
  const parsed = CreateApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, parsed.data.jobId));
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  const [application] = await db
    .insert(applicationsTable)
    .values({
      jobId: parsed.data.jobId,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      linkedinUrl: parsed.data.linkedinUrl ?? null,
      cvFileName: parsed.data.cvFileName ?? null,
      message: parsed.data.message ?? null,
    })
    .returning();

  const [row] = await listApplicationRows();
  if (!row || row.application.id !== application.id) {
    res.status(500).json({ error: "Application could not be created" });
    return;
  }
  res.status(201).json(CreateApplicationResponse.parse(serializeApplication(row)));
});

export default router;