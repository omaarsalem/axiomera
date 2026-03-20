import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";

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

const Services = () => (
  <Layout>
    {/* Hero */}
    <section className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: 'var(--axt-void)' }}>
      <div className="max-w-[1400px] mx-auto">
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-6 reveal" style={{ color: 'var(--axt-gold)' }}>
          What We Do
        </span>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6 reveal reveal-delay-1">
          Engineered<br />
          <span style={{ color: 'var(--axt-gold)' }}>Solutions</span>
        </h1>
        <p className="font-editorial text-xl md:text-2xl max-w-2xl reveal reveal-delay-2" style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}>
          Three disciplines, one mandate — to build systems that hold under pressure and scale with ambition.
        </p>
      </div>
    </section>

    {/* Service Categories */}
    {allServices.map((cat, catIdx) => (
      <section
        key={cat.category}
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: catIdx % 2 === 0 ? 'var(--axt-obsidian)' : 'var(--axt-void)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel number={`0${catIdx + 1}`} label={cat.category} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'var(--axt-divider)' }}>
            {cat.items.map((item) => (
              <div
                key={item.title}
                className="p-8 md:p-12 group transition-colors duration-300"
                style={{ background: catIdx % 2 === 0 ? 'var(--axt-obsidian)' : 'var(--axt-void)' }}
              >
                <h3 className="font-display text-2xl md:text-3xl mb-4 group-hover:text-axt-gold transition-colors duration-300">
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

    {/* CTA */}
    <section className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-carbon)' }}>
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="font-display text-4xl md:text-6xl mb-6">
          Need Something<br /><span style={{ color: 'var(--axt-gold)' }}>Specific?</span>
        </h2>
        <p className="font-editorial text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--axt-text-dim)' }}>
          Every engagement begins with understanding your landscape. Let's discuss yours.
        </p>
        <Link to="/contact" className="btn-axt btn-axt-gold inline-block">
          Start a Conversation
        </Link>
      </div>
    </section>
  </Layout>
);

export default Services;
