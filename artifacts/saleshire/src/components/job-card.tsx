import { ArrowUpRight, MapPin, Monitor, UsersRound } from 'lucide-react';
import type { Job } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { BrandIcon } from '@/components/layout';
import { StatusBadge } from '@/components/primitives';

function workTypeLabel(type: string) {
  return type === 'On-site' ? 'On-site' : type === 'Hybrid' ? 'Hybrid' : 'Remote';
}

export function JobCard({ job, admin = false, onApprove, onReject, onDelete }: { job: Job; admin?: boolean; onApprove?: () => void; onReject?: () => void; onDelete?: () => void }) {
  return (
    <article className={`job-card ${admin ? 'job-card-admin' : ''}`} data-testid={`card-job-${job.id}`}>
      <div className="job-card-top">
        <BrandIcon />
        <div className="job-card-meta">
          <Link href={`/prace/${job.id}`} className="job-title" data-testid={`link-job-${job.id}`}>{job.title}</Link>
          <span className="company-name">{job.company.name}</span>
        </div>
        <span className="job-date">{new Date(job.datePosted).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short' })}</span>
      </div>
      <div className="job-tags">
        <span><MapPin size={14} />{job.location}</span>
        <span><Monitor size={14} />{workTypeLabel(job.workType)}</span>
        {job.salary ? <span className="salary">{job.salary}</span> : null}
      </div>
      <p className="job-excerpt">{job.description.length > 150 ? `${job.description.slice(0, 150)}…` : job.description}</p>
      {admin ? (
        <div className="admin-job-actions">
          <StatusBadge status={job.status} />
          <span className="application-count"><UsersRound size={14} />{job.applicationCount ?? 0}</span>
          <div className="action-row">
            <button onClick={onApprove} disabled={job.status === 'Approved'} className="text-action approve" data-testid={`button-approve-job-${job.id}`}>Schválit</button>
            <button onClick={onReject} disabled={job.status === 'Rejected'} className="text-action reject" data-testid={`button-reject-job-${job.id}`}>Zamítnout</button>
            <button onClick={onDelete} className="text-action delete" data-testid={`button-delete-job-${job.id}`}>Smazat</button>
          </div>
        </div>
      ) : (
        <Link href={`/prace/${job.id}`} className="card-arrow" aria-label={`Zobrazit pozici ${job.title}`} data-testid={`link-job-detail-${job.id}`}><ArrowUpRight size={18} /></Link>
      )}
    </article>
  );
}

export function JobCardSkeleton() {
  return <div className="job-card skeleton-card"><span /><span /><span /><span /></div>;
}