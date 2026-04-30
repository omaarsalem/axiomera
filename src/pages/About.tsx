import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";

const timeline = [
  { year: "2022", event: "AXT founded in Cairo with a focus on cybersecurity consulting for MENA enterprises." },
  { year: "2023", event: "Expanded to Leeds, UK — established infrastructure practice and first government contracts." },
  { year: "2024", event: "Launched AXT Governance practice. ISO 27001 and SOC 2 readiness services go live." },
  { year: "2025", event: "London office opened. AXT Fellowship programme launched for emerging talent." },
  { year: "2026", event: "Continued growth across three markets. Fellowship cohort delivering real client projects." },
];

const values = [
  {
    title: "Senior Delivery",
    desc: "Every engagement is led by experienced practitioners — not juniors learning on your time. You get the people who designed the methodology.",
  },
  {
    title: "Total Coverage",
    desc: "Infrastructure, cybersecurity, and governance under one roof. No gaps between vendors, no finger-pointing between teams.",
  },
  {
    title: "Market Fluency",
    desc: "We operate across Cairo, Leeds, and London — understanding regulatory landscapes, business cultures, and technical ecosystems in each market.",
  },
  {
    title: "Long-Term Thinking",
    desc: "We build systems and strategies that compound over time. Quick fixes are for vendors — we're partners.",
  },
];

const founder = {
  name: "Omar Salem",
  role: "Founder & Managing Director",
  origin: "UK-Educated · Cairo-Based · Internationally Minded",
  story: "AXT was built to give back to the society that taught me so much.",
  bio: [
    "Omar founded Axiomera Technologies after a decade working across UK and MENA enterprise IT — from infrastructure architecture to cybersecurity programmes for regulated institutions. UK-educated and Cairo-based, he saw the same gap in both markets: clients juggling four vendors when they needed one trusted firm.",
    "AXT is the answer. A single firm where senior practitioners take engagements from first call to final handover — and where UK SMEs receive the same standard as enterprises through the Community Essentials programme.",
  ],
};

const About = () => {
  const heroRef = useReveal();
  const valuesRef = useReveal();
  const teamRef = useReveal();
  const timelineRef = useReveal();
  const ctaRef = useReveal();

  return (
    <Layout>
      <Seo
        title="About — One firm. Total confidence."
        description="AXT is a private IT and cybersecurity consultancy with UK-educated practitioners working across Cairo, Leeds, and London. Built to be your only call."
        path="/about"
      />
      {/* Hero */}
      <section ref={heroRef} className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <span className="reveal-target font-mono text-[9px] uppercase tracking-[0.5em] block mb-6" style={{ color: 'var(--axt-gold)' }}>
            About AXT
          </span>
          <h1 className="reveal-target font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            One Firm.<br />
            <span style={{ color: 'var(--axt-gold)' }}>Total Confidence.</span>
          </h1>
          <p className="reveal-target font-editorial text-xl md:text-2xl max-w-2xl" style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}>
            Axiomera Technologies was built on a simple premise: organisations deserve a single, trusted partner for everything IT — infrastructure, security, and governance.
          </p>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label="Our Values" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]" style={{ background: 'var(--axt-ghost-border)' }}>
            {values.map((v) => (
              <div
                key={v.title}
                className="reveal-target p-8 md:p-12 transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]"
                style={{ background: 'var(--axt-obsidian)' }}
              >
                <h3 className="font-display text-3xl tracking-wider mb-4" style={{ color: 'var(--axt-ivory)' }}>
                  {v.title}
                </h3>
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="02" label="Leadership" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]" style={{ background: 'var(--axt-ghost-border)' }}>
            {team.map((member) => (
              <div
                key={member.name}
                className="reveal-target p-8 md:p-12 transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]"
                style={{ background: 'var(--axt-void)' }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-3" style={{ color: 'var(--axt-gold)' }}>
                  {member.role}
                </span>
                <h3 className="font-display text-3xl tracking-wider mb-4" style={{ color: 'var(--axt-ivory)' }}>
                  {member.name}
                </h3>
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="03" label="Our Journey" />
          </div>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className="reveal-target flex gap-8 md:gap-16 py-8"
                style={{ borderBottom: '1px solid var(--axt-divider)' }}
              >
                <span className="font-display text-4xl md:text-5xl shrink-0 w-24 md:w-32" style={{ color: 'var(--axt-gold-bright)' }}>
                  {item.year}
                </span>
                <p className="font-mono text-sm leading-relaxed pt-3" style={{ color: 'var(--axt-text-dim)' }}>
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-carbon)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="reveal-target font-display text-4xl md:text-6xl mb-6">
            Ready to<br /><span style={{ color: 'var(--axt-gold)' }}>Work Together?</span>
          </h2>
          <p className="reveal-target font-editorial text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--axt-text-dim)' }}>
            Whether it's a single project or a long-term partnership — every relationship starts with a conversation.
          </p>
          <div className="reveal-target">
            <Link to="/contact" className="btn-axt btn-axt-gold inline-block">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
