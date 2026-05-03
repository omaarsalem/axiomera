import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";
import MagneticButton from "@/components/MagneticButton";
import Seo from "@/components/Seo";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/i18n/LanguageProvider";

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

const pillars = [
  {
    num: "01",
    name: "AXT Infrastructure",
    tagline: "Design · Deploy · Defend",
    quote: "The foundation everything else is built on.",
  },
  {
    num: "02",
    name: "AXT Cyber",
    tagline: "Protect · Detect · Respond",
    quote: "Threats don't wait. Neither do we.",
  },
  {
    num: "03",
    name: "AXT Governance",
    tagline: "Risk · Compliance · Clarity",
    quote: "Clarity in complexity. Confidence in every decision.",
  },
];

const fellowshipStats = [
  { value: "5", label: "Fellows / cohort" },
  { value: "100%", label: "Free · Always" },
  { value: "Real", label: "Client work" },
  { value: "∞", label: "Alumni access" },
];

const Index = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();
  const heroRef = useReveal();
  const servicesRef = useReveal();
  const fellowshipRef = useReveal();
  const ctaRef = useReveal();

  return (
    <Layout>
      <Seo
        title="AXT — IT Infrastructure, Cybersecurity & Governance | SME & Enterprise UK"
        description="Axiomera Technologies — senior-led SME cybersecurity UK, virtual SOC Leeds, and IT governance UK. Infrastructure, cyber, and governance under one roof. Cairo · Leeds · London."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Axiomera Technologies",
          alternateName: "AXT",
          url: "https://axt.tech",
          areaServed: ["Cairo", "Leeds", "London"],
          serviceType: ["IT Infrastructure", "Cybersecurity", "Governance Consulting"],
        }}
      />
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center px-6 md:px-12 relative"
        style={{ background: 'var(--axt-void)' }}
      >
        <div className="max-w-[1400px] mx-auto w-full py-32 md:py-0">
          <div className="reveal-target reveal">
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-text-dim)' }}>
              {t("home.eyebrow")}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-8" style={{ color: 'var(--axt-text-faint)' }}>
              {t("home.subEyebrow")}
            </span>
          </div>
          <h1 className="reveal-target reveal reveal-delay-1 font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-none mb-6">
            {t("home.headline_a")}<br />
            <span style={{ color: 'var(--axt-gold)' }}>{t("home.headline_b")}</span>
          </h1>
          <p
            className="reveal-target reveal reveal-delay-2 font-editorial text-xl md:text-2xl max-w-xl mb-12"
            style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}
          >
            {t("home.tagline")}
          </p>
          <div className="reveal-target reveal reveal-delay-3 flex flex-wrap gap-4">
            <MagneticButton to={lp("/contact?service=security-check")} className="btn-axt btn-axt-gold inline-block">
              Free 15-Min Security Check
            </MagneticButton>
            <MagneticButton to={lp("/services")} className="btn-axt btn-axt-ghost inline-block">
              {t("common.cta_services")}
            </MagneticButton>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 reveal-target reveal reveal-delay-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: 'var(--axt-text-faint)' }}>{t("common.scroll")}</span>
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

      {/* ── 01 What We Do ── */}
      <section
        ref={servicesRef}
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: 'var(--axt-void)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label="What We Do" />
          </div>
          <h2 className="reveal-target font-display text-5xl md:text-7xl mb-4">
            Three Pillars.<br />
            <span style={{ color: 'var(--axt-gold)' }}>One Standard.</span>
          </h2>
          <p className="reveal-target font-mono text-xs leading-relaxed max-w-2xl mb-16" style={{ color: 'var(--axt-text-dim)' }}>
            Every service AXT delivers sits under one of three pillars — each designed to cover a complete domain of your technology and security posture. Together they form a total solution. Separately each one is best in class.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-12" style={{ background: 'var(--axt-divider)' }}>
            {pillars.map((p) => (
              <div
                key={p.name}
                className="reveal-target p-8 md:p-12 flex flex-col"
                style={{ background: 'var(--axt-void)' }}
              >
                <span className="font-display text-6xl block mb-4" style={{ color: 'var(--axt-gold-dim)' }}>{p.num}</span>
                <h3 className="font-display text-3xl md:text-4xl mb-2">{p.name}</h3>
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] block mb-4" style={{ color: 'var(--axt-gold)' }}>{p.tagline}</span>
                <p className="font-editorial text-sm mb-8 flex-1" style={{ color: 'var(--axt-text-dim)' }}>
                  "{p.quote}"
                </p>
                <Link
                  to={lp("/services")}
                  className="font-mono text-[10px] uppercase tracking-[0.35em] inline-flex items-center gap-2 transition-colors duration-200"
                  style={{ color: 'var(--axt-gold)' }}
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>

          <div className="reveal-target text-center">
            <Link to={lp("/services")} className="btn-axt btn-axt-ghost">
              Explore All Services
            </Link>
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

      {/* ── 02 Fellowship Teaser ── */}
      <section
        ref={fellowshipRef}
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: 'var(--axt-void)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target mb-8">
            <SectionLabel number="02" label="Fellowship" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
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
                <Link to={lp("/fellowship")} className="btn-axt btn-axt-ghost">
                  Learn About Fellowship
                </Link>
              </div>
            </div>

            <div>
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
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 Contact CTA ── */}
      <section
        ref={ctaRef}
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: 'var(--axt-carbon)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target mb-8">
            <SectionLabel number="03" label="Work With Us" />
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
                <Link to={lp("/contact?service=security-check")} className="btn-axt btn-axt-gold">
                  Book Free Security Check
                </Link>
                <Link to={lp("/contact")} className="btn-axt btn-axt-ghost">
                  Brief Us
                </Link>
              </div>
            </div>

            <div className="reveal-target space-y-6">
              {[
                { label: "Email", value: "hello@axiomera.technology" },
                { label: "Markets", value: "Cairo · Leeds · London" },
                { label: "Response", value: "Within 1 business day" },
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
