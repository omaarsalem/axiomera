import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { useTranslation } from "react-i18next";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";

const allServices = [
  {
    category: "Infrastructure",
    items: [
      { title: "Network Architecture", desc: "Design and deploy enterprise LAN/WAN, SD-WAN, and campus networks with high-availability topologies." },
      { title: "Cloud Migration", desc: "Structured migration to AWS, Azure, or hybrid environments with zero-downtime transition strategies." },
      { title: "Systems Integration", desc: "Connect disparate platforms into unified, observable ecosystems with API-first integration patterns." },
      { title: "Disaster Recovery", desc: "Business continuity planning, geo-redundant backups, and automated failover orchestration." },
    ],
  },
  {
    category: "Cybersecurity",
    items: [
      { title: "Threat Intelligence", desc: "Proactive threat hunting, SIEM tuning, and real-time intelligence feeds mapped to your attack surface." },
      { title: "Penetration Testing", desc: "Red-team engagements, application security assessments, and network vulnerability analysis." },
      { title: "Incident Response", desc: "24/7 response capability with forensic investigation, containment, and recovery procedures." },
      { title: "Security Operations Centre", desc: "Managed SOC services with continuous monitoring, alerting, and escalation workflows." },
    ],
  },
  {
    category: "Governance",
    items: [
      { title: "ISO 27001 Implementation", desc: "Full ISMS implementation from gap analysis through certification audit support." },
      { title: "SOC 2 Readiness", desc: "Control mapping, evidence collection, and audit preparation for Type I and Type II reports." },
      { title: "GDPR & Data Privacy", desc: "Data mapping, DPIA execution, consent management, and cross-border transfer mechanisms." },
      { title: "Risk Management", desc: "Enterprise risk frameworks, quantitative risk analysis, and board-level reporting structures." },
    ],
  },
];

const industries = [
  { name: "Financial Services", desc: "Banks, insurers, fintech — regulated environments demanding airtight controls." },
  { name: "Healthcare", desc: "Hospitals and clinics handling sensitive patient data under tight compliance regimes." },
  { name: "Government", desc: "Ministries and agencies modernising legacy infrastructure at national scale." },
  { name: "Energy & Utilities", desc: "Critical infrastructure protection for oil, gas, and power operators." },
  { name: "Education", desc: "Universities and research institutions balancing openness with security." },
  { name: "Retail & E-Commerce", desc: "Consumer-facing platforms with GDPR, PCI-DSS, and uptime imperatives." },
];

const methodology = [
  { num: "01", title: "Discover", desc: "We map your landscape — systems, people, risk posture, regulatory exposure. No assumptions." },
  { num: "02", title: "Design", desc: "Senior architects translate findings into a defensible, scalable solution blueprint." },
  { num: "03", title: "Deploy", desc: "Phased delivery with clear milestones, zero-surprise change management, and measured rollouts." },
  { num: "04", title: "Defend", desc: "Continuous monitoring, hardening, and tuning. The system improves under our care." },
  { num: "05", title: "Document", desc: "Every decision, every control, every artefact — captured for audit, handover, and continuity." },
];

const engagementModels = [
  {
    name: "Project",
    tagline: "Defined Scope",
    desc: "Fixed-outcome engagements with clear deliverables, timelines, and acceptance criteria. Best for migrations, audits, deployments.",
    features: ["Fixed scope & price", "Milestone-based delivery", "Final handover docs"],
  },
  {
    name: "Retainer",
    tagline: "Ongoing Partnership",
    desc: "Monthly engagement with reserved senior capacity for advisory, operations, and incident support across your stack.",
    features: ["Reserved capacity", "Monthly reporting", "SLA-backed response"],
  },
  {
    name: "Fractional CISO",
    tagline: "Executive Coverage",
    desc: "Senior security leadership on demand — board reporting, programme ownership, and audit representation without a full-time hire.",
    features: ["Board-level reporting", "Programme ownership", "Audit & compliance lead"],
  },
];

const tiers = [
  {
    eyebrow: "01 — For UK SMEs",
    name: "Community Essentials",
    tagline: "Affordable security for small businesses.",
    desc: "A pragmatic package built for UK small and medium businesses who need credible cyber protection without enterprise overhead. Reduced rates because protecting small business is how we strengthen UK digital resilience.",
    features: [
      "Essentials Cyber Pack — endpoint, email, identity",
      "Baseline hardening & policy templates",
      "Quarterly review with a senior practitioner",
      "Cyber Essentials readiness support",
      "Plain-English incident playbook",
    ],
    price: "From £POA",
    priceNote: "Scoped to your business",
    cta: "Book Free Security Check",
    ctaHref: "/contact?service=essentials",
  },
  {
    eyebrow: "02 — For Institutions",
    name: "Enterprise Premium",
    tagline: "Full-spectrum coverage. Senior-led.",
    desc: "End-to-end infrastructure, cyber, and governance for enterprises and regulated institutions. Bespoke scope, senior delivery, and the AXT standard from first call to final handover.",
    features: [
      "Full SOC, threat intel & 24/7 incident response",
      "ISO 27001 / SOC 2 / NCSC-aligned programmes",
      "Fractional CISO & board-level reporting",
      "Network, cloud, and DR architecture",
      "Multi-jurisdiction compliance (UK · EG · MENA)",
    ],
    price: "Bespoke",
    priceNote: "Discovery call required",
    cta: "Brief Us",
    ctaHref: "/contact?service=enterprise",
  },
];

const Services = () => {
  const { t } = useTranslation();
  const heroRef = useReveal();
  const catRefs = [useReveal(), useReveal(), useReveal()];
  const industriesRef = useReveal();
  const methodologyRef = useReveal();
  const modelsRef = useReveal();
  const tiersRef = useReveal();
  const caseRef = useReveal();
  const ctaRef = useReveal();

  return (
    <Layout>
      <Seo
        title="Services — SME Cybersecurity UK · Virtual SOC Leeds · IT Governance UK"
        description="AXT delivers infrastructure, cybersecurity, and governance under one roof. Community Essentials for UK SMEs and Enterprise Premium for institutions. Virtual SOC, ISO 27001, IT governance UK."
        path="/services"
      />
      {/* Hero */}
      <section ref={heroRef} className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <span className="reveal-target font-mono text-[9px] uppercase tracking-[0.5em] block mb-6" style={{ color: 'var(--axt-gold)' }}>
            {t("services.eyebrow")}
          </span>
          <h1 className="reveal-target font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            {t("services.headline_a")}<br />
            <span style={{ color: 'var(--axt-gold)' }}>{t("services.headline_b")}</span>
          </h1>
          <p className="reveal-target font-editorial text-xl md:text-2xl max-w-2xl" style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}>
            {t("services.intro")}
          </p>
        </div>
      </section>

      {/* Service Categories */}
      {allServices.map((cat, catIdx) => (
        <section
          key={cat.category}
          ref={catRefs[catIdx]}
          className="px-6 md:px-12 py-[80px] md:py-[120px]"
          style={{ background: catIdx % 2 === 0 ? 'var(--axt-obsidian)' : 'var(--axt-void)' }}
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="reveal-target">
              <SectionLabel number={`0${catIdx + 1}`} label={cat.category} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'var(--axt-divider)' }}>
              {cat.items.map((item) => (
                <div
                  key={item.title}
                  className="reveal-target p-8 md:p-12 group transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]"
                  style={{ background: catIdx % 2 === 0 ? 'var(--axt-obsidian)' : 'var(--axt-void)' }}
                >
                  <h3 className="font-display text-2xl md:text-3xl mb-4 transition-colors duration-300" style={{ color: 'var(--axt-ivory)' }}>
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Methodology */}
      <section ref={methodologyRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="04" label="How We Work" />
          </div>
          <h2 className="reveal-target font-display text-4xl md:text-6xl mb-4">
            The AXT<br /><span style={{ color: 'var(--axt-gold)' }}>Method.</span>
          </h2>
          <p className="reveal-target font-mono text-xs leading-relaxed max-w-2xl mb-16" style={{ color: 'var(--axt-text-dim)' }}>
            Five disciplined stages. Every engagement. No shortcuts, no surprises — just senior delivery from first call to final handover.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px" style={{ background: 'var(--axt-divider)' }}>
            {methodology.map((m) => (
              <div key={m.num} className="reveal-target p-6 md:p-8" style={{ background: 'var(--axt-obsidian)' }}>
                <span className="font-display text-5xl block mb-4" style={{ color: 'var(--axt-gold-bright)' }}>{m.num}</span>
                <h3 className="font-display text-2xl mb-3" style={{ color: 'var(--axt-ivory)' }}>{m.title}</h3>
                <p className="font-mono text-[11px] leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section ref={industriesRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="05" label="Industries Served" />
          </div>
          <h2 className="reveal-target font-display text-4xl md:text-6xl mb-4">
            Sectors We<br /><span style={{ color: 'var(--axt-gold)' }}>Understand.</span>
          </h2>
          <p className="reveal-target font-mono text-xs leading-relaxed max-w-2xl mb-16" style={{ color: 'var(--axt-text-dim)' }}>
            Deep domain fluency across regulated and high-stakes industries. We speak your auditors' language.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--axt-divider)' }}>
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="reveal-target p-8 md:p-10 transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]"
                style={{ background: 'var(--axt-void)' }}
              >
                <h3 className="font-display text-2xl mb-3" style={{ color: 'var(--axt-ivory)' }}>{ind.name}</h3>
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section ref={modelsRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="06" label="Engagement Models" />
          </div>
          <h2 className="reveal-target font-display text-4xl md:text-6xl mb-4">
            Three Ways<br /><span style={{ color: 'var(--axt-gold)' }}>To Engage.</span>
          </h2>
          <p className="reveal-target font-mono text-xs leading-relaxed max-w-2xl mb-16" style={{ color: 'var(--axt-text-dim)' }}>
            Pricing is bespoke to scope and risk profile. Every engagement begins with a no-obligation discovery call.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--axt-divider)' }}>
            {engagementModels.map((m, i) => (
              <div key={m.name} className="reveal-target p-8 md:p-12 flex flex-col" style={{ background: 'var(--axt-obsidian)' }}>
                <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-3" style={{ color: 'var(--axt-gold)' }}>
                  0{i + 1} — {m.tagline}
                </span>
                <h3 className="font-display text-3xl md:text-4xl mb-4" style={{ color: 'var(--axt-ivory)' }}>{m.name}</h3>
                <p className="font-mono text-xs leading-relaxed mb-6 flex-1" style={{ color: 'var(--axt-text-dim)' }}>{m.desc}</p>
                <ul className="space-y-2 pt-6" style={{ borderTop: '1px solid var(--axt-divider)' }}>
                  {m.features.map((f) => (
                    <li key={f} className="font-mono text-[11px] flex items-start gap-2" style={{ color: 'var(--axt-text-dim)' }}>
                      <span style={{ color: 'var(--axt-gold)' }}>—</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual-Tier Pricing */}
      <section ref={tiersRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="07" label="Pricing Tiers" />
          </div>
          <h2 className="reveal-target font-display text-4xl md:text-6xl mb-4">
            Two Tiers.<br /><span style={{ color: 'var(--axt-gold)' }}>One Standard.</span>
          </h2>
          <p className="reveal-target font-mono text-xs leading-relaxed max-w-2xl mb-16" style={{ color: 'var(--axt-text-dim)' }}>
            Whether you're a UK SME protecting your shop or an enterprise running national infrastructure, the standard of work is identical. Only the scope changes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'var(--axt-divider)' }}>
            {tiers.map((tier) => (
              <div key={tier.name} className="reveal-target p-8 md:p-12 flex flex-col" style={{ background: 'var(--axt-void)' }}>
                <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
                  {tier.eyebrow}
                </span>
                <h3 className="font-display text-4xl md:text-5xl mb-3" style={{ color: 'var(--axt-ivory)' }}>{tier.name}</h3>
                <p className="font-editorial text-lg mb-6" style={{ color: 'var(--axt-text-dim)', lineHeight: 1.4 }}>
                  "{tier.tagline}"
                </p>
                <p className="font-mono text-xs leading-relaxed mb-8" style={{ color: 'var(--axt-text-dim)' }}>
                  {tier.desc}
                </p>
                <ul className="space-y-3 mb-10 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="font-mono text-[11px] flex items-start gap-3" style={{ color: 'var(--axt-text-dim)' }}>
                      <span style={{ color: 'var(--axt-gold)' }}>—</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 mb-8" style={{ borderTop: '1px solid var(--axt-divider)' }}>
                  <span className="font-display text-3xl block" style={{ color: 'var(--axt-gold-bright)' }}>{tier.price}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--axt-text-faint)' }}>{tier.priceNote}</span>
                </div>
                <Link to={tier.ctaHref} className="btn-axt btn-axt-gold text-center">
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Scenario */}
      <section ref={caseRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="08" label="Illustrative Scenario" />
          </div>
          <div className="reveal-target grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl mb-4">
                Ransomware<br /><span style={{ color: 'var(--axt-gold)' }}>Contained.</span>
              </h2>
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] block" style={{ color: 'var(--axt-text-faint)' }}>
                Anonymised · For illustration
              </span>
            </div>
            <div className="lg:col-span-2">
              <p className="font-editorial text-xl md:text-2xl mb-6" style={{ color: 'var(--axt-ivory)', lineHeight: 1.4 }}>
                "How AXT Essentials protected a Leeds retailer from ransomware in 72 hours."
              </p>
              <p className="font-mono text-xs leading-relaxed mb-4" style={{ color: 'var(--axt-text-dim)' }}>
                A 14-staff Leeds retailer detected unusual file activity on a Friday afternoon. Their Essentials package routed the alert directly to an AXT senior on-call. Within two hours: lateral movement halted, affected endpoints isolated, clean backups verified.
              </p>
              <p className="font-mono text-xs leading-relaxed mb-8" style={{ color: 'var(--axt-text-dim)' }}>
                By Monday morning the shop opened on time. No ransom paid. No customer data exfiltrated. A board-ready post-incident report delivered Tuesday. This is what the Community Essentials tier is built for.
              </p>
              <Link to="/contact?service=security-check" className="btn-axt btn-axt-ghost inline-block">
                Could this be you? Book a check →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-carbon)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="reveal-target font-display text-4xl md:text-6xl mb-6">
            Need Something<br /><span style={{ color: 'var(--axt-gold)' }}>Specific?</span>
          </h2>
          <p className="reveal-target font-editorial text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--axt-text-dim)' }}>
            Every engagement begins with understanding your landscape. Let's discuss yours.
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

export default Services;
