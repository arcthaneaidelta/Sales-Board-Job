import { useState } from 'react';
import { CheckCircle2, ExternalLink, Mail, MapPin, Monitor, Send } from 'lucide-react';
import { useCreateApplication, useGetJob } from '@workspace/api-client-react';
import { Link, useLocation, useParams } from 'wouter';
import { BackLink, BrandIcon, PageFrame, SectionKicker } from '@/components/layout';
import { Button, ErrorState, TextArea, TextInput } from '@/components/primitives';

export default function JobDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const id = Number(params.id);
  const query = useGetJob(id);
  const createApplication = useCreateApplication();
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedinUrl: '', cvFileName: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    createApplication.mutate({ data: { jobId: id, name: form.name, email: form.email, phone: form.phone || null, linkedinUrl: form.linkedinUrl || null, cvFileName: form.cvFileName || null, message: form.message || null } }, { onSuccess: () => setSubmitted(true) });
  };
  if (query.isLoading) return <PageFrame><div className="detail-loading"><div /><div /><div /></div></PageFrame>;
  if (query.isError || !query.data) return <PageFrame><ErrorState onRetry={() => query.refetch()} message="Tahle pozice se nepodařila načíst." /></PageFrame>;
  const job = query.data;
  return (
    <PageFrame>
      <BackLink href="/prace">Zpět na nabídky</BackLink>
      <div className="detail-layout">
        <article className="job-detail">
          <div className="detail-identity"><BrandIcon /><div><SectionKicker>{job.company.name}</SectionKicker><h1>{job.title}</h1><div className="detail-facts"><span><MapPin size={15} />{job.location}</span><span><Monitor size={15} />{job.workType}</span>{job.salary ? <span className="salary">{job.salary}</span> : null}</div></div></div>
          <div className="detail-rule" />
          <section className="detail-copy"><h2>O roli</h2><p>{job.description}</p><h2>Co budete potřebovat</h2><p className="pre-line">{job.requirements}</p>{job.benefits ? <><h2>Co nabízíme</h2><p className="pre-line">{job.benefits}</p></> : null}</section>
          <div className="company-contact"><span><Mail size={17} />Máte otázku?</span><a href={`mailto:${job.contactEmail}`} data-testid="link-job-email">{job.contactEmail}</a>{job.company.website ? <a href={job.company.website} target="_blank" rel="noreferrer" data-testid="link-company-website">Web firmy <ExternalLink size={14} /></a> : null}</div>
        </article>
        <aside className="apply-card" id="apply">
          {submitted ? <div className="success-state"><span className="success-icon"><CheckCircle2 size={28} /></span><h2>Reakce odeslána.</h2><p>Vaše údaje jsme předali firmě {job.company.name}. Držíme palce — teď už je míč na jejich straně.</p><Link href="/prace" className="btn btn-secondary" data-testid="link-after-application">Prohlédnout další pozice</Link></div> : <><div className="apply-card-head"><span className="eyebrow">Rychlá reakce</span><h2>Zaujala vás tahle role?</h2><p>Pošlete své údaje přímo firmě. Bez účtu, bez zbytečných kroků.</p></div><form onSubmit={submit} className="application-form"><TextInput label="Jméno a příjmení" required value={form.name} onChange={(e) => update('name', e.target.value)} data-testid="input-application-name" /><TextInput label="E-mail" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} data-testid="input-application-email" /><TextInput label="Telefon" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} data-testid="input-application-phone" /><TextInput label="LinkedIn" placeholder="linkedin.com/in/..." value={form.linkedinUrl} onChange={(e) => update('linkedinUrl', e.target.value)} data-testid="input-application-linkedin" /><TextInput label="Název CV" hint="PDF nebo DOCX nahrajte do dalšího kroku komunikace." placeholder="např. Jan_Novak_CV.pdf" value={form.cvFileName} onChange={(e) => update('cvFileName', e.target.value)} data-testid="input-application-cv" /><TextArea label="Krátká zpráva" rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} data-testid="input-application-message" /><Button type="submit" loading={createApplication.isPending} className="full-width" data-testid="button-submit-application">Odeslat reakci <Send size={16} /></Button>{createApplication.isError ? <p className="form-error">Reakci se nepodařilo odeslat. Zkontrolujte údaje a zkuste to znovu.</p> : null}</form></>}
        </aside>
      </div>
    </PageFrame>
  );
}