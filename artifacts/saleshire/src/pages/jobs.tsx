import { useMemo, useState } from 'react';
import { useListJobs } from '@workspace/api-client-react';
import { PageFrame, SectionKicker } from '@/components/layout';
import { EmptyState, ErrorState, FilterButton, LoadingRows, SearchBox, SelectInput } from '@/components/primitives';
import { JobCard } from '@/components/job-card';

export default function Jobs() {
  const [search, setSearch] = useState('');
  const [workType, setWorkType] = useState('');
  const query = useListJobs({ status: 'Approved', search: search || undefined, workType: (workType || undefined) as 'Remote' | 'Hybrid' | 'On-site' | undefined });
  const jobs = useMemo(() => query.data ?? [], [query.data]);
  return (
    <PageFrame wide>
      <section className="list-page-head"><div><SectionKicker>Volná místa</SectionKicker><h1>Najděte si další<br /><em>dobrou roli.</em></h1><p>Vybrané sales pozice z českých firem. Bez balastu, s dostatkem informací.</p></div><div className="list-stat"><strong>{query.data?.length ?? '—'}</strong><span>schválených<br />pozic</span></div></section>
      <section className="jobs-toolbar">
        <SearchBox value={search} onChange={setSearch} />
        <div className="toolbar-filters"><FilterButton active={workType === 'Remote'} onClick={() => setWorkType(workType === 'Remote' ? '' : 'Remote')}>Remote</FilterButton><FilterButton active={workType === 'Hybrid'} onClick={() => setWorkType(workType === 'Hybrid' ? '' : 'Hybrid')}>Hybrid</FilterButton><SelectInput value={workType} onChange={(event) => setWorkType(event.target.value)} aria-label="Typ práce" data-testid="select-work-type"><option value="">Všechny typy práce</option><option value="On-site">On-site</option><option value="Hybrid">Hybrid</option><option value="Remote">Remote</option></SelectInput></div>
      </section>
      <div className="results-label"><span>{query.isLoading ? 'Načítám pozice…' : `${jobs.length} ${jobs.length === 1 ? 'pozice' : 'pozic'}`}</span><span className="sort-note">Řazeno od nejnovějších</span></div>
      {query.isLoading ? <LoadingRows count={4} /> : query.isError ? <ErrorState onRetry={() => query.refetch()} /> : jobs.length ? <div className="job-list">{jobs.map((job) => <JobCard key={job.id} job={job} />)}</div> : <EmptyState title="Žádná pozice neodpovídá hledání" body="Zkuste změnit klíčové slovo nebo vypnout některý z filtrů." action={<FilterButton onClick={() => { setSearch(''); setWorkType(''); }}>Zrušit filtry</FilterButton>} />}
    </PageFrame>
  );
}