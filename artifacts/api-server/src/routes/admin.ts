import { count, eq } from "drizzle-orm";
import { Router, type IRouter } from "express";
import { db, applicationsTable, jobsTable } from "@workspace/db";
import { GetAdminSummaryResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/admin/summary", async (_req, res): Promise<void> => {
  const [jobs] = await db.select({ total: count(jobsTable.id) }).from(jobsTable);
  const [pending] = await db
    .select({ total: count(jobsTable.id) })
    .from(jobsTable)
    .where(eq(jobsTable.status, "Pending"));
  const [approved] = await db
    .select({ total: count(jobsTable.id) })
    .from(jobsTable)
    .where(eq(jobsTable.status, "Approved"));
  const [rejected] = await db
    .select({ total: count(jobsTable.id) })
    .from(jobsTable)
    .where(eq(jobsTable.status, "Rejected"));
  const [applications] = await db
    .select({ total: count(applicationsTable.id) })
    .from(applicationsTable);

  res.json(
    GetAdminSummaryResponse.parse({
      totalJobs: Number(jobs.total),
      pendingJobs: Number(pending.total),
      approvedJobs: Number(approved.total),
      rejectedJobs: Number(rejected.total),
      totalApplications: Number(applications.total),
    }),
  );
});

export default router;