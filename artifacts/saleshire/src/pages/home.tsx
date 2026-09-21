import { ArrowRight, CheckCircle2, ChevronRight, CircleDot, MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import { useListJobs } from '@workspace/api-client-react';
import { Link, useLocation } from 'wouter';
import { PageFrame, SectionKicker } from '@/components/layout';
import { JobCard } from '@/components/job-card';

export default function Home() {
  const [, setLocation] = useLocation();
  const [keyword, setKeyword] = useState('');
  const [location, setSearchLocation] = useState('');
  const jobsQuery = useListJobs({ status: 'Approved' });
  const jobs = Array.isArray(jobsQuery.data) ? jobsQuery.data : [];
  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('search', keyword.trim());
    if (location.trim()) params.set('location', location.trim());
    setLocation(`/prace${params.toString() ? `?${params.toString()}` : ''}`);
  };
  return (
    <PageFrame>
      <section className="hero">
        <div className="hero-copy">
          <SectionKicker>Český marketplace pro sales</SectionKicker>
          <h1>Najděte svou další<br /><em>sales pozici.</em></h1>
          <p className="hero-lede">SalesHire je jednoduchý pracovní portál zaměřený výhradně na obchod a business development v Česku.</p>
          <form className="hero-search" onSubmit={submitSearch}>
            <label className="hero-search-field"><Search size={17} /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Pozice nebo klíčové slovo" aria-label="Pozice nebo klíčové slovo" /></label>
            <label className="hero-search-field"><MapPin size={17} /><input value={location} onChange={(event) => setSearchLocation(event.target.value)} placeholder="Město nebo region" aria-label="Město nebo region" /></label>
            <button className="btn btn-primary" type="submit" data-testid="button-hero-search">Hledat <ArrowRight size={17} /></button>
          </form>
          <div className="hero-actions">
            <Link href="/prace" className="btn btn-primary" data-testid="link-hero-jobs">Prohlédnout pozice <ArrowRight size={17} /></Link>
            <Link href="/zadat-pozici" className="btn btn-secondary" data-testid="link-hero-submit">Zadat pozici zdarma</Link>
          </div>
          <div className="hero-proof"><span><CheckCircle2 size={16} />Bez registrace</span><span><CheckCircle2 size={16} />Ověřené nabídky</span></div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="hero-panel">
            <span className="mono-small">DNEŠNÍ VÝBĚR</span>
            <strong>Sales role<br />s jasným směrem.</strong>
            <span className="panel-line" />
            <span className="panel-caption">Praha · Brno · Remote</span>
          </div>
          <div className="float-note note-one"><CircleDot size={14} /> Ověřené nabídky</div>
          <div className="float-note note-two"><CircleDot size={14} /> Bez registrace</div>
        </div>
      </section>

      <section className="home-section featured-section">
        <div className="section-heading"><div><SectionKicker>Čerstvě schválené</SectionKicker><h2>Pozice, které stojí za pozornost.</h2></div><Link href="/prace" className="inline-link" data-testid="link-see-all-jobs">Všechny pozice <ArrowRight size={16} /></Link></div>
        {jobsQuery.isLoading ? <div className="job-grid"><div className="job-card skeleton-card" /><div className="job-card skeleton-card" /><div className="job-card skeleton-card" /></div> : jobsQuery.isError ? <p className="inline-error">Nabídky se nyní nepodařilo načíst.</p> : jobs.length ? <div className="job-grid">{jobs.slice(0, 3).map((job) => <JobCard key={job.id} job={job} />)}</div> : <p className="muted-copy">První nabídky právě připravujeme. Vraťte se brzy.</p>}
      </section>

      <section className="split-section">
        <div className="split-intro"><SectionKicker>Proč SalesHire</SectionKicker><h2>Méně šumu.<br /><span>Více dobrých rozhovorů.</span></h2></div>
        <div className="reason-list">
          <div className="reason"><span className="reason-index">01</span><div><h3>Role s kontextem</h3><p>Nejen název pozice. U každé nabídky víte, co budete prodávat, komu a s jakou podporou.</p></div></div>
          <div className="reason"><span className="reason-index">02</span><div><h3>České firmy, skutečné týmy</h3><p>Žádné anonymní inzeráty. Každá nabídka má konkrétní firmu a kontakt.</p></div></div>
          <div className="reason"><span className="reason-index">03</span><div><h3>Bez účtu a bez bariér</h3><p>Na zajímavou pozici reagujete rovnou. Váš první kontakt nemusí čekat na registraci.</p></div></div>
        </div>
      </section>

      <section className="employer-banner">
        <div><SectionKicker>Pro firmy</SectionKicker><h2>Potřebujete do týmu<br /><em>někoho, kdo umí prodávat?</em></h2><p>Popište nám pozici. My ji zkontrolujeme a dostaneme před správné lidi.</p></div>
        <Link href="/zadat-pozici" className="btn btn-accent" data-testid="link-banner-submit">Zadat pozici <ChevronRight size={17} /></Link>
      </section>
    </PageFrame>
  );
}