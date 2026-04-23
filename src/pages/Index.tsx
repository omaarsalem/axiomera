import { useState } from "react";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";

const tickerItems = [
  "AXT Infrastructure",
  "AXT Cyber",
  "AXT Governance",
  "Cairo",
  "Leeds",
  "London",
  "Design · Deploy · Defend",
  "Protect · Detect · Respond",
  "Risk · Compliance · Clarity",
];

const stats = [
  { value: "3", label: "Service Pillars" },
  { value: "3", label: "Markets" },
  { value: "1", label: "Philosophy" },
  { value: "∞", label: "Commitment" },
];

const pillars = [
  {
    num: "01",
    name: "AXT Infrastructure",
    tagline: "Design · Deploy · Defend",
    quote: "The foundation everything else is built on.",
    services: [
      "Network Architecture & Design",
      "Data Centre & Server Deployment",
      "Physical Security Systems",
      "Cloud & DR Infrastructure",
      "Microsoft & Cisco Solutions",
    ],
  },
  {
    num: "02",
    name: "AXT Cyber",
    tagline: "Protect · Detect · Respond",
    quote: "Threats don't wait. Neither do we.",
    services: [
      "Penetration Testing & Red Team",
      "SOC & Threat Intelligence",
      "Incident Response",
      "Endpoint & Network Security",
      "Vulnerability Management",
    ],
  },
  {
    num: "03",
    name: "AXT Governance",
    tagline: "Risk · Compliance · Clarity",
    quote: "Clarity in complexity. Confidence in every decision.",
    services: [
      "GRC Framework Design",
      "Regulatory Compliance",
      "Risk Assessment & Management",
      "Policy Architecture",
      "Security Awareness Training",
    ],
  },
];

const whyCards = [
  {
    icon: "◎",
    title: "Total Coverage",
    desc: "Infrastructure, security, and governance under one roof. No gaps between vendors. No finger-pointing when something goes wrong. One firm. Total accountability.",
  },
  {
    icon: "◈",
    title: "Senior Delivery",
    desc: "Every engagement is led by senior practitioners — not handed off to juniors after the pitch. The people who win your trust are the people who do the work.",
  },
  {
    icon: "⬡",
    title: "Market Fluency",
    desc: "Operating across Cairo and the UK — Leeds and London. We understand the regulatory, cultural, and operational realities of both markets — Egyptian enterprise and UK-standard best practice in one firm.",
  },
  {
    icon: "∞",
    title: "Long-Term Thinking",
    desc: "We build relationships, not transactions. Our decisions are made with your next five years in mind — not the next invoice. That's the AXT standard.",
  },
];

const fellowshipStats = [
  { value: "5", label: "Fellows / cohort" },
  { value: "100%", label: "Free · Always" },
  { value: "Real", label: "Client work" },
  { value: "∞", label: "Alumni access" },
];

const Index = () => {
  const heroRef = useReveal();
  const aboutRef = useReveal();
  const servicesRef = useReveal();
  const whyRef = useReveal();
  const fellowshipRef = useReveal();
  const ctaRef = useReveal();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <Layout>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center px-6 md:px-12 relative"
        style={{ background: 'var(--axt-void)' }}
      >
        <div className="max-w-[1400px] mx-auto w-full py-32 md:py-0">
          <div className="reveal-target reveal">
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-text-dim)' }}>
              AXT
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-8" style={{ color: 'var(--axt-text-faint)' }}>
              IT · Cybersecurity · Governance
            </span>
          </div>
          <h1 className="reveal-target reveal reveal-delay-1 font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-none mb-6">
            Where Decisions<br />
            <span style={{ color: 'var(--axt-gold)' }}>End.</span>
          </h1>
          <p
            className="reveal-target reveal reveal-delay-2 font-editorial text-xl md:text-2xl max-w-xl mb-12"
            style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}
          >
            "Built to be your only call."
          </p>
          <div className="reveal-target reveal reveal-delay-3 flex flex-wrap gap-4">
            <Link to="/services" className="btn-axt btn-axt-gold">
              Our Services
            </Link>
            <Link to="/contact" className="btn-axt btn-axt-ghost">
              Brief Us
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 reveal-target reveal reveal-delay-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: 'var(--axt-text-faint)' }}>Scroll</span>
          <div className="w-px h-8" style={{ background: 'var(--axt-divider)' }} />
        </div>
      </section>

      {/* ── Ticker ── */}
      <div
        className="overflow-hidden py-5"
        style={{ background: 'var(--axt-gold)', borderTop: '1px solid var(--axt-gold-bright)', borderBottom: '1px solid var(--axt-gold-bright)' }}
      >
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="font-mono text-[10px] uppercase tracking-[0.35em] shrink-0 mx-8"
              style={{ color: 'var(--axt-void)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── 01 Who We Are ── */}
      <section
        ref={aboutRef}
        id="about"
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: 'var(--axt-obsidian)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label="Who We Are" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="reveal-target font-display text-5xl md:text-7xl mb-6">
                One Firm.<br />
                <span style={{ color: 'var(--axt-gold)' }}>Total Confidence.</span>
              </h2>
              <p className="reveal-target font-mono text-xs leading-relaxed mb-8" style={{ color: 'var(--axt-text-dim)' }}>
                Axiomera Technologies is an IT and cybersecurity firm built around a single conviction: once a client walks in, they should never need to walk anywhere else. We design, deploy, and defend the infrastructure that enterprises and institutions depend on — across Cairo and the UK.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px reveal-target" style={{ background: 'var(--axt-divider)' }}>
                {stats.map((s) => (
                  <div key={s.label} className="p-6 text-center" style={{ background: 'var(--axt-obsidian)' }}>
                    <span className="font-display text-4xl block mb-2" style={{ color: 'var(--axt-gold-bright)' }}>{s.value}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: 'var(--axt-text-dim)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <blockquote
                className="reveal-target font-editorial text-2xl md:text-3xl mb-8"
                style={{ color: 'var(--axt-text-dim)', lineHeight: '1.4' }}
              >
                "We exist so that once a client walks in, they never need to walk anywhere else."
              </blockquote>
              <p className="reveal-target font-mono text-xs leading-relaxed mb-6" style={{ color: 'var(--axt-text-dim)' }}>
                AXT was built to be the last firm our clients ever need to call. Not because we oversell — but because we over-deliver. Every engagement, every system, every decision we make is held to one standard: would we stake our name on this?
              </p>
              <p className="reveal-target font-mono text-xs leading-relaxed mb-8" style={{ color: 'var(--axt-text-dim)' }}>
                The answer is always yes. That's the only way we work. Our foundation is built on UK-educated expertise and a deep understanding of the Egyptian and regional technology landscape.
              </p>

              {/* Location tags */}
              <div className="reveal-target flex flex-wrap gap-3">
                {["Cairo", "Leeds", "London", "UK-Educated"].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-[0.3em] px-5 py-3"
                    style={{ border: '1px solid var(--axt-divider)', color: 'var(--axt-text-dim)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 What We Do ── */}
      <section
        ref={servicesRef}
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: 'var(--axt-void)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="02" label="What We Do" />
          </div>
          <h2 className="reveal-target font-display text-5xl md:text-7xl mb-4">
            Three Pillars.<br />
            <span style={{ color: 'var(--axt-gold)' }}>One Standard.</span>
          </h2>
          <p className="reveal-target font-mono text-xs leading-relaxed max-w-2xl mb-16" style={{ color: 'var(--axt-text-dim)' }}>
            Every service AXT delivers sits under one of three pillars — each designed to cover a complete domain of your technology and security posture. Together they form a total solution. Separately each one is best in class.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--axt-divider)' }}>
            {pillars.map((p) => (
              <div
                key={p.name}
                className="reveal-target p-8 md:p-12"
                style={{ background: 'var(--axt-void)' }}
              >
                <span className="font-display text-6xl block mb-4" style={{ color: 'var(--axt-gold-dim)' }}>{p.num}</span>
                <h3 className="font-display text-3xl md:text-4xl mb-2">{p.name}</h3>
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] block mb-4" style={{ color: 'var(--axt-gold)' }}>{p.tagline}</span>
                <p className="font-editorial text-sm mb-6" style={{ color: 'var(--axt-text-dim)' }}>
                  "{p.quote}"
                </p>
                <ul className="space-y-2">
                  {p.services.map((s) => (
                    <li key={s} className="font-mono text-[11px]" style={{ color: 'var(--axt-text-dim)' }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy Break ── */}
      <section
        className="px-6 md:px-12 py-[80px] md:py-[120px] text-center"
        style={{ background: 'var(--axt-carbon)' }}
      >
        <div className="max-w-[900px] mx-auto">
          <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-6" style={{ color: 'var(--axt-gold)' }}>
            Axiomera
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-10" style={{ color: 'var(--axt-text-faint)' }}>
            Our Standard
          </span>
          <blockquote
            className="font-editorial text-3xl md:text-5xl mb-8"
            style={{ color: 'var(--axt-ivory)', lineHeight: '1.3' }}
          >
            "Built to be your only call."
          </blockquote>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: 'var(--axt-text-faint)' }}>
            — The AXT Promise
          </span>
        </div>
      </section>

      {/* ── 03 Why AXT ── */}
      <section
        ref={whyRef}
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: 'var(--axt-obsidian)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="03" label="Why AXT" />
          </div>
          <h2 className="reveal-target font-display text-5xl md:text-7xl mb-4">
            The Difference<br />
            <span style={{ color: 'var(--axt-gold)' }}>Is the Standard.</span>
          </h2>
          <p className="reveal-target font-mono text-xs leading-relaxed max-w-2xl mb-16" style={{ color: 'var(--axt-text-dim)' }}>
            Every firm promises quality. AXT is built around a different question entirely: what would it take for a client to never need anyone else?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'var(--axt-divider)' }}>
            {whyCards.map((c) => (
              <div
                key={c.title}
                className="reveal-target p-8 md:p-12 transition-colors duration-300 cursor-default"
                style={{
                  background: hoveredCard === c.title ? 'var(--axt-gold-subtle)' : 'var(--axt-obsidian)',
                }}
                onMouseEnter={() => setHoveredCard(c.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <span className="font-display text-5xl block mb-4" style={{ color: 'var(--axt-gold)' }}>{c.icon}</span>
                <h3 className="font-display text-3xl mb-4">{c.title}</h3>
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: 'var(--axt-void)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="04" label="Client Voices" />
          </div>
          <h2 className="reveal-target font-display text-5xl md:text-7xl mb-16">
            What Clients<br />
            <span style={{ color: 'var(--axt-gold)' }}>Tell Us.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--axt-divider)' }}>
            {[
              {
                quote: "AXT walked in, mapped our risk in two weeks, and gave us a roadmap our board could actually action. No jargon, no upsell.",
                attribution: "CIO",
                org: "Regional Bank · Cairo",
              },
              {
                quote: "We've worked with the big names. AXT is the first firm where the people we met in the pitch were the people who did the work.",
                attribution: "Head of IT",
                org: "Hospital Group · UK",
              },
              {
                quote: "Got us through ISO 27001 first time, zero non-conformities. They knew our auditor better than our auditor knew us.",
                attribution: "Compliance Director",
                org: "Logistics · MENA",
              },
            ].map((t, i) => (
              <div key={i} className="reveal-target p-8 md:p-12 flex flex-col" style={{ background: 'var(--axt-void)' }}>
                <span className="font-display text-5xl mb-6" style={{ color: 'var(--axt-gold)', lineHeight: 1 }}>"</span>
                <blockquote className="font-editorial text-lg md:text-xl mb-8 flex-1" style={{ color: 'var(--axt-ivory)', lineHeight: 1.5 }}>
                  {t.quote}
                </blockquote>
                <div className="pt-6" style={{ borderTop: '1px solid var(--axt-divider)' }}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] block mb-1" style={{ color: 'var(--axt-gold)' }}>{t.attribution}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--axt-text-faint)' }}>{t.org}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fellowship Teaser ── */}
      <section
        ref={fellowshipRef}
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: 'var(--axt-void)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="reveal-target flex items-center gap-3 mb-8">
                <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: 'var(--axt-text-faint)' }}>New Initiative</span>
              </div>
              <div className="reveal-target mb-2">
                <span className="font-display text-2xl tracking-wider" style={{ color: 'var(--axt-gold)' }}>AXT</span>
              </div>
              <h2 className="reveal-target font-display text-5xl md:text-7xl mb-6">
                Fellowship
              </h2>
              <p className="reveal-target font-mono text-xs leading-relaxed mb-6" style={{ color: 'var(--axt-text-dim)' }}>
                A free, selective program for students and fresh graduates — where they work on real AXT client projects, supervised by our practitioners, and walk away with verified experience. Not a course. Not a simulation. Real work.
              </p>
              <p className="reveal-target font-mono text-xs leading-relaxed mb-8" style={{ color: 'var(--axt-text-dim)' }}>
                Because the best firms invest in the people who will build the industry — before they're hired.
              </p>
              <div className="reveal-target">
                <Link to="/fellowship" className="btn-axt btn-axt-ghost">
                  Learn About Fellowship
                </Link>
              </div>
            </div>

            <div>
              {/* Fellowship stats */}
              <div className="reveal-target grid grid-cols-2 gap-px mb-8" style={{ background: 'var(--axt-divider)' }}>
                {fellowshipStats.map((s) => (
                  <div key={s.label} className="p-8 text-center" style={{ background: 'var(--axt-void)' }}>
                    <span className="font-display text-4xl md:text-5xl block mb-2" style={{ color: 'var(--axt-gold-bright)' }}>{s.value}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: 'var(--axt-text-dim)' }}>{s.label}</span>
                  </div>
                ))}
              </div>

              <blockquote
                className="reveal-target font-editorial text-xl mb-6 text-center"
                style={{ color: 'var(--axt-text-dim)', lineHeight: '1.4' }}
              >
                "Where decisions end — and careers begin."
              </blockquote>

              <div className="reveal-target text-center">
                <Link
                  to="/fellowship"
                  className="font-mono text-[10px] uppercase tracking-[0.35em] transition-colors duration-200 inline-flex items-center gap-2"
                  style={{ color: 'var(--axt-gold)' }}
                >
                  View Fellowship Program →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 Contact CTA ── */}
      <section
        ref={ctaRef}
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: 'var(--axt-carbon)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target mb-8">
            <SectionLabel number="04" label="Work With Us" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="reveal-target font-display text-5xl md:text-7xl lg:text-8xl mb-6">
                Make The<br />
                <span style={{ color: 'var(--axt-gold)' }}>Call.</span>
              </h2>
              <p
                className="reveal-target font-editorial text-xl mb-10"
                style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}
              >
                "The last firm you'll ever need to call is one conversation away."
              </p>
              <div className="reveal-target flex flex-wrap gap-4">
                <Link to="/contact" className="btn-axt btn-axt-gold">
                  Start a Brief
                </Link>
                <Link to="/services" className="btn-axt btn-axt-ghost">
                  View Services
                </Link>
              </div>
            </div>

            <div className="reveal-target space-y-6">
              {[
                { label: "Email", value: "hello@axt.tech" },
                { label: "Markets", value: "Cairo · Leeds · London" },
                { label: "Domain", value: "axt.tech" },
              ].map((item) => (
                <div key={item.label} className="py-4" style={{ borderBottom: '1px solid var(--axt-divider)' }}>
                  <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: 'var(--axt-gold)' }}>
                    {item.label}
                  </span>
                  <span className="font-mono text-sm" style={{ color: 'var(--axt-ivory)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
