import type {
  Job,
  Application,
  AdminSummary,
  JobInput,
  JobUpdate,
  ApplicationInput,
} from "./generated/api.schemas";

const STORAGE_KEY_JOBS = "saleshire_mock_jobs";
const STORAGE_KEY_APPLICATIONS = "saleshire_mock_applications";

const INITIAL_JOBS: Job[] = [
  {
    id: 1,
    title: "Account Executive – SaaS",
    company: {
      id: 1,
      name: "Productboard",
      website: "https://www.productboard.com",
      contactEmail: "careers@productboard.com",
    },
    location: "Praha",
    workType: "Hybrid",
    salary: "55 000–75 000 Kč",
    description: "Pomozte českým i zahraničním firmám lépe řídit jejich produktovou strategii. Budete mít na starosti celý obchodní cyklus od prvního kontaktu po uzavření smlouvy.",
    requirements: "Zkušenost s B2B SaaS prodejem\nVýborná čeština a angličtina\nSchopnost vést konzultativní obchod",
    benefits: "25 dní dovolené\nRozpočet na vzdělávání\nFlexibilní hybridní režim",
    contactEmail: "careers@productboard.com",
    status: "Approved",
    datePosted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    applicationCount: 2,
  },
  {
    id: 2,
    title: "Obchodní zástupce B2B",
    company: {
      id: 2,
      name: "Alza.cz",
      website: "https://www.alza.cz",
      contactEmail: "jobs@alza.cz",
    },
    location: "Praha",
    workType: "On-site",
    salary: "45 000 Kč + provize",
    description: "Rozšiřujte portfolio firemních zákazníků největšího českého online prodejce elektroniky a spotřebního zboží.",
    requirements: "Praxe v B2B obchodu\nTah na branku a samostatnost\nŘidičský průkaz sk. B",
    benefits: "Motivační provize\nZaměstnanecké slevy\nMultisport karta",
    contactEmail: "jobs@alza.cz",
    status: "Approved",
    datePosted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    applicationCount: 0,
  },
  {
    id: 3,
    title: "Sales Development Representative",
    company: {
      id: 3,
      name: "Kiwi.com",
      website: "https://www.kiwi.com",
      contactEmail: "talent@kiwi.com",
    },
    location: "Remote",
    workType: "Remote",
    salary: "40 000–50 000 Kč",
    description: "Buďte prvním kontaktem pro nové B2B partnery a pomozte Kiwi.com růst na dalších trzích.",
    requirements: "Komunikativní angličtina\nZájem o obchod a technologie\nEnergie pro práci s CRM",
    benefits: "Plně remote tým\nPříspěvek na vybavení\nCestovní benefity",
    contactEmail: "talent@kiwi.com",
    status: "Approved",
    datePosted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    applicationCount: 0,
  },
  {
    id: 4,
    title: "Key Account Manager",
    company: {
      id: 4,
      name: "Rohlik.cz",
      website: "https://www.rohlik.cz",
      contactEmail: "people@rohlik.cz",
    },
    location: "Praha",
    workType: "Hybrid",
    salary: "60 000 Kč",
    description: "Pečujte o klíčové B2B partnery a hledejte nové příležitosti pro rychle rostoucí e-commerce tým.",
    requirements: "3+ roky zkušeností s key account managementem\nAnalytické myšlení\nSilné prezentační dovednosti",
    benefits: "Stravenkový paušál\nSlužební telefon\nSleva na nákup",
    contactEmail: "people@rohlik.cz",
    status: "Approved",
    datePosted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    applicationCount: 0,
  },
  {
    id: 5,
    title: "Obchodník – kosmetika B2B",
    company: {
      id: 5,
      name: "Notino",
      website: "https://www.notino.cz",
      contactEmail: "hr@notino.cz",
    },
    location: "Brno",
    workType: "On-site",
    salary: "42 000 Kč",
    description: "Rozvíjejte síť B2B odběratelů v segmentu krásy a pečujte o dlouhodobé obchodní vztahy.",
    requirements: "Obchodní zkušenost\nZájem o kosmetiku\nPříjemné vystupování",
    benefits: "Příspěvek na stravování\nZaměstnanecké slevy\nModerní kanceláře",
    contactEmail: "hr@notino.cz",
    status: "Approved",
    datePosted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    applicationCount: 0,
  },
  {
    id: 6,
    title: "Sales Manager – DACH",
    company: {
      id: 1,
      name: "Productboard",
      website: "https://www.productboard.com",
      contactEmail: "careers@productboard.com",
    },
    location: "Praha",
    workType: "Hybrid",
    salary: "70 000–90 000 Kč",
    description: "Pomozte nám otevřít nové vztahy s produktovými týmy v regionu DACH.",
    requirements: "Němčina na profesionální úrovni\nZkušenost s enterprise obchodem\nStrategické uvažování",
    benefits: "Rozpočet na jazyky\nAkciový program\nFlexibilní pracovní doba",
    contactEmail: "careers@productboard.com",
    status: "Pending",
    datePosted: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    applicationCount: 0,
  },
];

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Account Executive – SaaS",
    companyName: "Productboard",
    name: "Tereza Nováková",
    email: "tereza.novakova@example.com",
    phone: "+420 777 123 456",
    linkedinUrl: "https://www.linkedin.com/in/tereza-novakova",
    cvFileName: "Tereza_Novakova_CV.pdf",
    message: "Pozice mě zaujala díky kombinaci B2B obchodu a produktové strategie.",
    dateApplied: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 2,
    jobId: 1,
    jobTitle: "Account Executive – SaaS",
    companyName: "Productboard",
    name: "Martin Dvořák",
    email: "martin.dvorak@example.com",
    phone: "+420 608 456 789",
    linkedinUrl: "https://www.linkedin.com/in/martin-dvorak",
    cvFileName: "Martin_Dvorak_CV.pdf",
    message: "Rád bych se dozvěděl více o vašem sales týmu a cílových trzích.",
    dateApplied: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
];

function getStoredJobs(): Job[] {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = localStorage.getItem(STORAGE_KEY_JOBS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    }
  } catch {}
  return [...INITIAL_JOBS];
}

function saveStoredJobs(jobs: Job[]): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(STORAGE_KEY_JOBS, JSON.stringify(jobs));
    }
  } catch {}
}

function getStoredApplications(): Application[] {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    }
  } catch {}
  return [...INITIAL_APPLICATIONS];
}

function saveStoredApplications(apps: Application[]): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(apps));
    }
  } catch {}
}

export async function handleMockApi(method: string, urlStr: string, bodyText?: unknown): Promise<any> {
  const parsedUrl = new URL(urlStr, "http://localhost");
  const pathname = parsedUrl.pathname;
  const searchParams = parsedUrl.searchParams;

  let body: any = null;
  if (typeof bodyText === "string") {
    try {
      body = JSON.parse(bodyText);
    } catch {
      body = bodyText;
    }
  } else if (bodyText) {
    body = bodyText;
  }

  // 1. /api/health
  if (pathname === "/api/health") {
    return { status: "ok" };
  }

  // 2. /api/admin/summary
  if (pathname === "/api/admin/summary" && method === "GET") {
    const jobs = getStoredJobs();
    const apps = getStoredApplications();
    return {
      totalJobs: jobs.length,
      pendingJobs: jobs.filter((j) => j.status === "Pending").length,
      approvedJobs: jobs.filter((j) => j.status === "Approved").length,
      rejectedJobs: jobs.filter((j) => j.status === "Rejected").length,
      totalApplications: apps.length,
    } as AdminSummary;
  }

  // 3. /api/jobs (GET)
  if (pathname === "/api/jobs" && method === "GET") {
    let jobs = getStoredJobs();
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase();
    const location = searchParams.get("location")?.toLowerCase();
    const workType = searchParams.get("workType");

    if (status) {
      jobs = jobs.filter((j) => j.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(search) ||
          j.description.toLowerCase().includes(search) ||
          j.company.name.toLowerCase().includes(search),
      );
    }
    if (location) {
      jobs = jobs.filter((j) => j.location.toLowerCase().includes(location));
    }
    if (workType) {
      jobs = jobs.filter((j) => j.workType.toLowerCase() === workType.toLowerCase());
    }
    return jobs;
  }

  // 4. /api/jobs (POST)
  if (pathname === "/api/jobs" && method === "POST") {
    const jobs = getStoredJobs();
    const input = (body ?? {}) as JobInput;
    const newId = Math.max(0, ...jobs.map((j) => j.id)) + 1;
    const newJob: Job = {
      id: newId,
      title: input.title || "Obchodní pozice",
      company: {
        id: newId,
        name: input.companyName || "Firma",
        website: input.companyWebsite || null,
        contactEmail: input.companyContactEmail || input.contactEmail,
      },
      location: input.location || "Praha",
      workType: input.workType || "Hybrid",
      salary: input.salary || null,
      description: input.description || "",
      requirements: input.requirements || "",
      benefits: input.benefits || null,
      contactEmail: input.contactEmail || "",
      status: "Pending",
      datePosted: new Date().toISOString(),
      applicationCount: 0,
    };
    jobs.unshift(newJob);
    saveStoredJobs(jobs);
    return newJob;
  }

  // 5. /api/jobs/:id (GET, PATCH, DELETE)
  const jobDetailMatch = pathname.match(/^\/api\/jobs\/(\d+)$/);
  if (jobDetailMatch) {
    const id = Number(jobDetailMatch[1]);
    const jobs = getStoredJobs();
    const jobIndex = jobs.findIndex((j) => j.id === id);

    if (method === "GET") {
      if (jobIndex === -1) throw new Error("Job not found");
      return jobs[jobIndex];
    }
    if (method === "PATCH") {
      if (jobIndex === -1) throw new Error("Job not found");
      const update = (body ?? {}) as JobUpdate;
      jobs[jobIndex] = { ...jobs[jobIndex], ...update };
      saveStoredJobs(jobs);
      return jobs[jobIndex];
    }
    if (method === "DELETE") {
      if (jobIndex !== -1) {
        jobs.splice(jobIndex, 1);
        saveStoredJobs(jobs);
      }
      return null;
    }
  }

  // 6. /api/applications (GET, POST)
  if (pathname === "/api/applications") {
    if (method === "GET") {
      return getStoredApplications();
    }
    if (method === "POST") {
      const apps = getStoredApplications();
      const input = (body ?? {}) as ApplicationInput;
      const jobs = getStoredJobs();
      const targetJob = jobs.find((j) => j.id === input.jobId);
      const newId = Math.max(0, ...apps.map((a) => a.id)) + 1;
      const newApp: Application = {
        id: newId,
        jobId: input.jobId,
        jobTitle: targetJob ? targetJob.title : "Neznámá pozice",
        companyName: targetJob ? targetJob.company.name : "Neznámá firma",
        name: input.name || "",
        email: input.email || "",
        phone: input.phone || null,
        linkedinUrl: input.linkedinUrl || null,
        cvFileName: input.cvFileName || null,
        message: input.message || null,
        dateApplied: new Date().toISOString(),
      };
      apps.unshift(newApp);
      saveStoredApplications(apps);

      if (targetJob) {
        targetJob.applicationCount = (targetJob.applicationCount || 0) + 1;
        saveStoredJobs(jobs);
      }
      return newApp;
    }
  }

  return null;
}
