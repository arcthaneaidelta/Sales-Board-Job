import { ArrowRight, CheckCircle2, ClipboardCheck, MessageSquareText, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { PageFrame, SectionKicker } from '@/components/layout';

export default function Employers() {
  return (
    <PageFrame>
      <section className="employer-hero"><div><SectionKicker>Pro zaměstnavatele</SectionKicker><h1>Obchodní tým,<br /><em>který táhne spolu.</em></h1><p>SalesHire spojuje české firmy s lidmi, kteří umí rozhýbat obchod. Jednoduše, konkrétně, bez náborového divadla.</p><Link href="/zadat-pozici" className="btn btn-accent" data-testid="link-employer-hero-submit">Zadat otevřenou pozici <ArrowRight size={17} /></Link></div><div className="employer-mark"><span>SH</span><small>sales<br />hire</small></div></section>
      <section className="process-section"><SectionKicker>Jak to funguje</SectionKicker><h2>Od zadání k prvnímu<br /><em>dobrému rozhovoru.</em></h2><div className="process-grid"><div className="process-step"><span className="process-number">01</span><ClipboardCheck size={21} /><h3>Popíšete roli</h3><p>Vyplníte několik praktických detailů o pozici, týmu a očekáváních.</p></div><div className="process-step"><span className="process-number">02</span><ShieldCheck size={21} /><h3>My ji zkontrolujeme</h3><p>Každou nabídku před zveřejněním projdeme. Kandidáti vidí jen relevantní role.</p></div><div className="process-step"><span className="process-number">03</span><MessageSquareText size={21} /><h3>Ozvou se ti správní</h3><p>Reakce chodí přímo vám. Žádný další systém, žádná prostřední vrstva.</p></div></div></section>
      <section className="employer-proof"><div><SectionKicker>Bez zbytečností</SectionKicker><h2>Jednoduchý proces,<br /><em>jasná očekávání.</em></h2></div><div className="proof-aside"><p><CheckCircle2 size={18} />Zadání pozice bez registrace</p><p><CheckCircle2 size={18} />Kontrola před zveřejněním</p><p><CheckCircle2 size={18} />Reakce kandidátů přímo na váš e-mail</p></div></section>
      <section className="employer-cta"><span className="eyebrow">Máte otevřenou roli?</span><h2>Řekněte nám o ní.</h2><Link href="/zadat-pozici" className="btn btn-primary" data-testid="link-employer-bottom-submit">Zadat pozici <ArrowRight size={17} /></Link></section>
    </PageFrame>
  );
}