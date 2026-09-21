import { count, eq } from "drizzle-orm";
import { db, applicationsTable, companiesTable, jobsTable } from "@workspace/db";

export async function seedDemoData(): Promise<void> {
  const [{ total }] = await db.select({ total: count(jobsTable.id) }).from(jobsTable);
  if (Number(total) > 0) {
    return;
  }

  const companyData = [
    { name: "Productboard", website: "https://www.productboard.com", contactEmail: "careers@productboard.com" },
    { name: "Alza.cz", website: "https://www.alza.cz", contactEmail: "jobs@alza.cz" },
    { name: "Kiwi.com", website: "https://www.kiwi.com", contactEmail: "talent@kiwi.com" },
    { name: "Rohlik.cz", website: "https://www.rohlik.cz", contactEmail: "people@rohlik.cz" },
    { name: "Notino", website: "https://www.notino.cz", contactEmail: "hr@notino.cz" },
  ];

  const companies = await db.insert(companiesTable).values(companyData).returning();
  const byName = new Map(companies.map((company) => [company.name, company.id]));

  const jobs = await db
    .insert(jobsTable)
    .values([
      {
        companyId: byName.get("Productboard")!,
        title: "Account Executive – SaaS",
        location: "Praha",
        workType: "Hybrid",
        salary: "55 000–75 000 Kč",
        description: "Pomozte českým i zahraničním firmám lépe řídit jejich produktovou strategii. Budete mít na starosti celý obchodní cyklus od prvního kontaktu po uzavření smlouvy.",
        requirements: "Zkušenost s B2B SaaS prodejem\nVýborná čeština a angličtina\nSchopnost vést konzultativní obchod",
        benefits: "25 dní dovolené\nRozpočet na vzdělávání\nFlexibilní hybridní režim",
        contactEmail: "careers@productboard.com",
        status: "Approved",
      },
      {
        companyId: byName.get("Alza.cz")!,
        title: "Obchodní zástupce B2B",
        location: "Praha",
        workType: "On-site",
        salary: "45 000 Kč + provize",
        description: "Rozšiřujte portfolio firemních zákazníků největšího českého online prodejce elektroniky a spotřebního zboží.",
        requirements: "Praxe v B2B obchodu\nTah na branku a samostatnost\nŘidičský průkaz sk. B",
        benefits: "Motivační provize\nZaměstnanecké slevy\nMultisport karta",
        contactEmail: "jobs@alza.cz",
        status: "Approved",
      },
      {
        companyId: byName.get("Kiwi.com")!,
        title: "Sales Development Representative",
        location: "Remote",
        workType: "Remote",
        salary: "40 000–50 000 Kč",
        description: "Buďte prvním kontaktem pro nové B2B partnery a pomozte Kiwi.com růst na dalších trzích.",
        requirements: "Komunikativní angličtina\nZájem o obchod a technologie\nEnergie pro práci s CRM",
        benefits: "Plně remote tým\nPříspěvek na vybavení\nCestovní benefity",
        contactEmail: "talent@kiwi.com",
        status: "Approved",
      },
      {
        companyId: byName.get("Rohlik.cz")!,
        title: "Key Account Manager",
        location: "Praha",
        workType: "Hybrid",
        salary: "60 000 Kč",
        description: "Pečujte o klíčové B2B partnery a hledejte nové příležitosti pro rychle rostoucí e-commerce tým.",
        requirements: "3+ roky zkušeností s key account managementem\nAnalytické myšlení\nSilné prezentační dovednosti",
        benefits: "Stravenkový paušál\nSlužební telefon\nSleva na nákup",
        contactEmail: "people@rohlik.cz",
        status: "Approved",
      },
      {
        companyId: byName.get("Notino")!,
        title: "Obchodník – kosmetika B2B",
        location: "Brno",
        workType: "On-site",
        salary: "42 000 Kč",
        description: "Rozvíjejte síť B2B odběratelů v segmentu krásy a pečujte o dlouhodobé obchodní vztahy.",
        requirements: "Obchodní zkušenost\nZájem o kosmetiku\nPříjemné vystupování",
        benefits: "Příspěvek na stravování\nZaměstnanecké slevy\nModerní kanceláře",
        contactEmail: "hr@notino.cz",
        status: "Approved",
      },
      {
        companyId: byName.get("Productboard")!,
        title: "Sales Manager – DACH",
        location: "Praha",
        workType: "Hybrid",
        salary: "70 000–90 000 Kč",
        description: "Pomozte nám otevřít nové vztahy s produktovými týmy v regionu DACH.",
        requirements: "Němčina na profesionální úrovni\nZkušenost s enterprise obchodem\nStrategické uvažování",
        benefits: "Rozpočet na jazyky\nAkciový program\nFlexibilní pracovní doba",
        contactEmail: "careers@productboard.com",
        status: "Pending",
      },
    ])
    .returning();

  const sampleJob = jobs.find((job) => job.title === "Account Executive – SaaS");
  if (sampleJob) {
    await db.insert(applicationsTable).values([
      {
        jobId: sampleJob.id,
        name: "Tereza Nováková",
        email: "tereza.novakova@example.com",
        phone: "+420 777 123 456",
        linkedinUrl: "https://www.linkedin.com/in/tereza-novakova",
        cvFileName: "Tereza_Novakova_CV.pdf",
        message: "Pozice mě zaujala díky kombinaci B2B obchodu a produktové strategie.",
      },
      {
        jobId: sampleJob.id,
        name: "Martin Dvořák",
        email: "martin.dvorak@example.com",
        phone: "+420 608 456 789",
        linkedinUrl: "https://www.linkedin.com/in/martin-dvorak",
        cvFileName: "Martin_Dvorak_CV.pdf",
        message: "Rád bych se dozvěděl více o vašem sales týmu a cílových trzích.",
      },
    ]);
  }
}