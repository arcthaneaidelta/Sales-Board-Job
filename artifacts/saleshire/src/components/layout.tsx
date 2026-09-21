import { BriefcaseBusiness, Building2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';

export function Logo() {
  return (
    <Link href="/" className="brand-mark" data-testid="link-logo">
      <span className="brand-symbol">S</span>
      <span className="brand-word">sales<span>hire</span></span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const links = [
    { href: '/prace', label: 'Pro kandidáty' },
    { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele' },
  ];
  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Logo />
        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Hlavní navigace">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={location === link.href ? 'active' : ''} data-testid={`link-nav-${link.href.slice(1)}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/zadat-pozici" onClick={() => setOpen(false)} className="nav-cta" data-testid="link-submit-job">
            <Building2 size={16} /> Zadat pozici
          </Link>
        </nav>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Zavřít menu' : 'Otevřít menu'} data-testid="button-mobile-menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div>
          <Logo />
          <p className="footer-note">Místo, kde se potkávají<br />dobří obchodníci s dobrými firmami.</p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Prozkoumat</span>
          <Link href="/prace" data-testid="link-footer-jobs">Volná místa</Link>
          <Link href="/pro-zamestnavatele" data-testid="link-footer-employers">Pro zaměstnavatele</Link>
        </div>
        <div className="footer-links">
          <span className="eyebrow">SalesHire</span>
          <span>Český marketplace pro sales</span>
          <span className="mono-small">© {new Date().getFullYear()} SalesHire</span>
        </div>
      </div>
    </footer>
  );
}

export function PageFrame({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="app-frame">
      <Header />
      <main className={wide ? 'page-shell page-main page-main-wide' : 'page-shell page-main'}>{children}</main>
      <Footer />
    </div>
  );
}

export function SectionKicker({ children }: { children: React.ReactNode }) {
  return <p className="section-kicker"><span />{children}</p>;
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="back-link" data-testid="link-back"><span aria-hidden="true">←</span>{children}</Link>;
}

export function BrandIcon({ kind = 'briefcase' }: { kind?: 'briefcase' | 'building' }) {
  return <span className="brand-icon">{kind === 'building' ? <Building2 size={18} /> : <BriefcaseBusiness size={18} />}</span>;
}