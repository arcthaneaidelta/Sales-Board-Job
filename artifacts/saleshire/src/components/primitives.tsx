import { AlertCircle, ArrowRight, Check, Loader2, Search, SlidersHorizontal } from 'lucide-react';
import type { ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

export function Button({ children, variant = 'primary', loading = false, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; loading?: boolean }) {
  return (
    <button className={`btn btn-${variant} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 size={16} className="spin" /> : null}{children}
    </button>
  );
}

export function TextInput({ label, hint, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }) {
  return <label className="field">{label ? <span className="field-label">{label}</span> : null}<input className="input" {...props} />{hint ? <span className="field-hint">{hint}</span> : null}</label>;
}

export function SelectInput({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return <label className="field">{label ? <span className="field-label">{label}</span> : null}<select className="input select" {...props}>{children}</select></label>;
}

export function TextArea({ label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return <label className="field">{label ? <span className="field-label">{label}</span> : null}<textarea className="input textarea" {...props} /></label>;
}

export function SearchBox({ value, onChange, placeholder = 'Hledat podle pozice nebo firmy' }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <div className="search-box"><Search size={18} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label={placeholder} data-testid="input-search-jobs" />{value ? <button onClick={() => onChange('')} aria-label="Vymazat hledání" data-testid="button-clear-search">×</button> : null}</div>;
}

export function FilterButton({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button className={`filter-pill ${active ? 'active' : ''}`} onClick={onClick} data-testid={`button-filter-${String(children).toLowerCase().replaceAll(' ', '-')}`}><SlidersHorizontal size={15} />{children}</button>;
}

export function StatusBadge({ status }: { status: string }) {
  const label: Record<string, string> = { Approved: 'Schváleno', Pending: 'Čeká na kontrolu', Rejected: 'Zamítnuto' };
  return <span className={`status-badge status-${status.toLowerCase()}`} data-testid={`status-${status.toLowerCase()}`}>{label[status] ?? status}</span>;
}

export function LoadingRows({ count = 3 }: { count?: number }) {
  return <div className="loading-stack" aria-label="Načítání"><span /><span /><span />{count > 3 ? <span /> : null}</div>;
}

export function ErrorState({ onRetry, message = 'Data se nepodařilo načíst.' }: { onRetry?: () => void; message?: string }) {
  return <div className="state-card error-state"><AlertCircle size={24} /><strong>{message}</strong><p>Zkuste to prosím za chvíli znovu.</p>{onRetry ? <Button variant="secondary" onClick={onRetry} data-testid="button-retry">Zkusit znovu</Button> : null}</div>;
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return <div className="state-card empty-state"><span className="empty-dot"><Check size={18} /></span><strong>{title}</strong><p>{body}</p>{action}</div>;
}

export function SubmitArrow() {
  return <ArrowRight size={17} />;
}