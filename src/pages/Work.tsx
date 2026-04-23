import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";

const caseStudies = [
  {
    sector: "Finance",
    pillar: "AXT Cyber",
    title: "National Bank — Threat Containment & SOC Deployment",
    problem: "A leading bank in the MENA region experienced a sophisticated phishing campaign targeting senior executives, with no centralised monitoring in place.",
    approach: "Deployed a 24/7 SOC with custom detection rules, implemented email gateway hardening, and ran red-team exercises to validate resilience.",
    outcome: "Zero successful phishing incidents in 12 months post-deployment. Mean time to detect reduced from 72 hours to under 15 minutes.",
    metrics: [
      { value: "0", label: "Breaches" },
      { value: "<15m", label: "MTTD" },
      { value: "24/7", label: "Coverage" },
    ],
  },
  {
    sector: "Healthcare",
    pillar: "AXT Governance",
    title: "Private Hospital Group — ISO 27001 Certification",
    problem: "A multi-site hospital group needed ISO 27001 certification to win government contracts but had no formal ISMS or risk register.",
    approach: "Conducted gap analysis across 4 sites, built the ISMS from scratch, trained 120+ staff, and guided the organisation through Stage 1 and Stage 2 audits.",
    outcome: "Achieved ISO 27001 certification on first attempt with zero non-conformities. Unlocked £2.4M in new government contracts.",
    metrics: [
      { value: "0", label: "Non-conformities" },
      { value: "£2.4M", label: "New Contracts" },
      { value: "4", label: "Sites Certified" },
    ],
  },
  {
    sector: "Government",
    pillar: "AXT Infrastructure",
    title: "Ministry of Communications — Network Modernisation",
    problem: "Ageing network infrastructure across 23 government buildings with frequent outages, no redundancy, and bandwidth bottlenecks.",
    approach: "Designed and deployed a full SD-WAN overlay with dual-ISP failover, centralised management, and QoS policies for critical services.",
    outcome: "99.97% uptime achieved. Network capacity increased 8x while reducing annual connectivity spend by 34%.",
    metrics: [
      { value: "99.97%", label: "Uptime" },
      { value: "8x", label: "Capacity" },
      { value: "-34%", label: "Cost Savings" },
    ],
  },
  {
    sector: "Education",
    pillar: "AXT Cyber",
    title: "University — Incident Response & Recovery",
    problem: "A ransomware attack encrypted 60% of administrative systems during exam season, with no incident response plan or tested backups.",
    approach: "Activated emergency IR team within 4 hours. Contained spread, recovered critical systems from isolated backups, and rebuilt compromised endpoints.",
    outcome: "Full operational recovery in 72 hours. Exam schedule maintained. Post-incident: designed and deployed comprehensive DR plan.",
    metrics: [
      { value: "72h", label: "Recovery" },
      { value: "0", label: "Data Lost" },
      { value: "100%", label: "Systems Restored" },
    ],
  },
  {
    sector: "Retail",
    pillar: "AXT Governance",
    title: "E-Commerce Platform — GDPR & Data Privacy Programme",
    problem: "A fast-growing e-commerce company processing EU customer data had no data mapping, consent management, or DPIA processes.",
    approach: "Mapped all personal data flows, implemented consent management platform, conducted DPIAs for high-risk processing, and trained 45 staff.",
    outcome: "Full GDPR compliance achieved. Customer trust score increased 28%. Zero data subject complaints post-implementation.",
    metrics: [
      { value: "0", label: "Complaints" },
      { value: "+28%", label: "Trust Score" },
      { value: "45", label: "Staff Trained" },
    ],
  },
  {
    sector: "Energy",
    pillar: "AXT Infrastructure",
    title: "Oil & Gas — Secure Cloud Migration",
    problem: "Legacy on-premise infrastructure approaching end-of-life with no cloud strategy. Critical SCADA systems needed secure migration path.",
    approach: "Designed hybrid cloud architecture with air-gapped SCADA network, migrated 200+ workloads to Azure with zero-downtime cutover windows.",
    outcome: "40% reduction in infrastructure costs. DR capability improved from 48h to 4h RTO. Full compliance with IEC 62443.",
    metrics: [
      { value: "-40%", label: "Cost Reduction" },
      { value: "4h", label: "RTO" },
      { value: "200+", label: "Workloads" },
    ],
  },
];

const sectorColors: Record<string, string> = {
  Finance: "var(--axt-gold)",
  Healthcare: "#6ECF97",
  Government: "#7BA4D9",
  Education: "#D4AA55",
  Retail: "#C97B7B",
  Energy: "#D9A867",
};

const Work = () => {
  const heroRef = useReveal();
  const gridRef = useReveal();
  const ctaRef = useReveal();

  return (
    <Layout>
      <Seo
        title="Work — Selected engagements"
        description="A discreet view of the IT infrastructure, cybersecurity, and governance work AXT delivers for enterprise and institutional clients."
        path="/work"
      />
      {/* Hero */}
      <section ref={heroRef} className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <span className="reveal-target font-mono text-[9px] uppercase tracking-[0.5em] block mb-6" style={{ color: 'var(--axt-gold)' }}>
            Case Studies
          </span>
          <h1 className="reveal-target font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            Proven<br />
            <span style={{ color: 'var(--axt-gold)' }}>Results.</span>
          </h1>
          <p className="reveal-target font-editorial text-xl md:text-2xl max-w-2xl" style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}>
            Anonymized engagements across sectors — each one a testament to senior delivery and measurable outcomes.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section ref={gridRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label="Engagements" />
          </div>
          <div className="space-y-[2px]" style={{ background: 'var(--axt-ghost-border)' }}>
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={i} study={study} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-carbon)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="reveal-target font-display text-4xl md:text-6xl mb-6">
            Your Challenge.<br /><span style={{ color: 'var(--axt-gold)' }}>Our Expertise.</span>
          </h2>
          <p className="reveal-target font-editorial text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--axt-text-dim)' }}>
            Every engagement is different. Let's discuss what success looks like for yours.
          </p>
          <div className="reveal-target">
            <Link to="/contact" className="btn-axt btn-axt-gold inline-block">
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const CaseStudyCard = ({ study, index }: { study: typeof caseStudies[0]; index: number }) => {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className="p-8 md:p-12 transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]"
      style={{ background: index % 2 === 0 ? 'var(--axt-obsidian)' : 'var(--axt-void)' }}
    >
      <div className="reveal-target flex flex-wrap items-center gap-4 mb-6">
        <span
          className="font-mono text-[9px] uppercase tracking-[0.5em] px-3 py-1"
          style={{ color: sectorColors[study.sector], border: `1px solid ${sectorColors[study.sector]}40` }}
        >
          {study.sector}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: 'var(--axt-text-faint)' }}>
          {study.pillar}
        </span>
      </div>

      <h3 className="reveal-target font-display text-3xl md:text-4xl tracking-wider mb-6" style={{ color: 'var(--axt-ivory)' }}>
        {study.title}
      </h3>

      <div className="reveal-target grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {[
          { label: "Challenge", text: study.problem },
          { label: "Approach", text: study.approach },
          { label: "Outcome", text: study.outcome },
        ].map((section) => (
          <div key={section.label}>
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-3" style={{ color: 'var(--axt-gold)' }}>
              {section.label}
            </span>
            <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
              {section.text}
            </p>
          </div>
        ))}
      </div>

      <div className="reveal-target grid grid-cols-3 gap-[2px] max-w-md" style={{ background: 'var(--axt-ghost-border)' }}>
        {study.metrics.map((m) => (
          <div key={m.label} className="p-4 text-center" style={{ background: 'var(--axt-carbon)' }}>
            <span className="font-display text-2xl block" style={{ color: 'var(--axt-gold-bright)' }}>{m.value}</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.4em]" style={{ color: 'var(--axt-text-faint)' }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
