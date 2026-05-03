import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";
import { useLocalePath } from "@/i18n/LanguageProvider";

const testimonials = [
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
  {
    quote: "Senior engineers on every call. Decisions made in the room, not escalated for a week. That alone changed our timelines.",
    attribution: "Head of Infrastructure",
    org: "Manufacturing · UK",
  },
  {
    quote: "They treated our 40-person business with the same seriousness as their enterprise clients. That's rare.",
    attribution: "Managing Director",
    org: "Professional Services · Leeds",
  },
  {
    quote: "Clear scope, fixed outcomes, no surprises on the invoice. Exactly what consulting should be.",
    attribution: "CFO",
    org: "Group Holdings · Cairo",
  },
];

const Testimonials = () => {
  const heroRef = useReveal();
  const gridRef = useReveal();
  const ctaRef = useReveal();
  const lp = useLocalePath();

  return (
    <Layout>
      <Seo
        title="Client Voices — AXT Testimonials"
        description="What clients tell us about working with Axiomera Technologies — senior-led IT, cyber and governance delivery across Cairo and the UK."
        path="/testimonials"
      />

      {/* Hero */}
      <section ref={heroRef} className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <span className="reveal-target font-mono text-[9px] uppercase tracking-[0.5em] block mb-6" style={{ color: 'var(--axt-gold)' }}>
            Client Voices
          </span>
          <h1 className="reveal-target font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            What Clients<br />
            <span style={{ color: 'var(--axt-gold)' }}>Tell Us.</span>
          </h1>
          <p className="reveal-target font-editorial text-xl md:text-2xl max-w-2xl" style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}>
            Unvarnished feedback from the people who hired us — across banking, healthcare, logistics, and SMEs.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section ref={gridRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label="Testimonials" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--axt-divider)' }}>
            {testimonials.map((t, i) => (
              <div key={i} className="reveal-target p-8 md:p-12 flex flex-col" style={{ background: 'var(--axt-obsidian)' }}>
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

      {/* CTA */}
      <section ref={ctaRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-carbon)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="reveal-target font-display text-4xl md:text-6xl mb-6">
            Want to be<br /><span style={{ color: 'var(--axt-gold)' }}>The Next Voice?</span>
          </h2>
          <p className="reveal-target font-editorial text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--axt-text-dim)' }}>
            Brief us on your IT, cyber, or governance challenge. We respond within one business day.
          </p>
          <div className="reveal-target">
            <Link to={lp("/contact")} className="btn-axt btn-axt-gold inline-block">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
