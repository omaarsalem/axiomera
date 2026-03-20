import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const els = ref.current?.querySelectorAll(".reveal-target");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
};

const services = [
  {
    title: "Infrastructure Architecture",
    desc: "Enterprise-grade network design, cloud migration, and systems integration built for scale and resilience.",
  },
  {
    title: "Cybersecurity Operations",
    desc: "Threat detection, incident response, penetration testing, and continuous security monitoring.",
  },
  {
    title: "Governance & Compliance",
    desc: "ISO 27001, SOC 2, GDPR, and regulatory framework implementation with audit-ready documentation.",
  },
];

const Index = () => {
  const heroRef = useReveal();
  const servicesRef = useReveal();
  const ctaRef = useReveal();

  return (
    <Layout>
      {/* Hero */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center px-6 md:px-12"
        style={{ background: 'var(--axt-void)' }}
      >
        <div className="max-w-[1400px] mx-auto w-full py-32 md:py-0">
          <div className="reveal-target reveal">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-8"
              style={{ color: 'var(--axt-gold)' }}
            >
              Cairo — Leeds — London
            </span>
          </div>
          <h1 className="reveal-target reveal reveal-delay-1 font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-8">
            Infrastructure<br />
            <span style={{ color: 'var(--axt-gold)' }}>Redefined.</span>
          </h1>
          <p
            className="reveal-target reveal reveal-delay-2 font-editorial text-xl md:text-2xl max-w-xl mb-12"
            style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}
          >
            We architect resilient systems, fortify digital perimeters, and build governance frameworks that institutions trust.
          </p>
          <div className="reveal-target reveal reveal-delay-3 flex flex-wrap gap-4">
            <Link to="/services" className="btn-axt btn-axt-gold">
              Our Services
            </Link>
            <Link to="/contact" className="btn-axt btn-axt-ghost">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section
        ref={servicesRef}
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: 'var(--axt-obsidian)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label="Core Disciplines" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--axt-divider)' }}>
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`reveal-target p-8 md:p-12`}
                style={{ background: 'var(--axt-obsidian)', animationDelay: `${(i + 1) * 0.1}s` }}
              >
                <span
                  className="font-display text-6xl block mb-6"
                  style={{ color: 'var(--axt-gold-dim)' }}
                >
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl md:text-3xl mb-4">{s.title}</h3>
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel number="02" label="Presence" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { city: "Cairo", country: "Egypt", role: "Regional HQ — MENA Operations" },
              { city: "Leeds", country: "United Kingdom", role: "Engineering & Delivery Centre" },
              { city: "London", country: "United Kingdom", role: "Client Advisory & Governance" },
            ].map((loc) => (
              <div
                key={loc.city}
                className="p-8 md:p-10 transition-colors duration-300"
                style={{ background: 'var(--axt-obsidian)', border: '1px solid var(--axt-divider)' }}
              >
                <h3 className="font-display text-4xl mb-2">{loc.city}</h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--axt-gold)' }}>
                  {loc.country}
                </p>
                <p className="font-mono text-xs" style={{ color: 'var(--axt-text-dim)' }}>{loc.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef}
        className="px-6 md:px-12 py-[80px] md:py-[120px]"
        style={{ background: 'var(--axt-carbon)' }}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="reveal-target">
            <h2 className="font-display text-4xl md:text-6xl mb-6">
              Ready to Build<br />
              <span style={{ color: 'var(--axt-gold)' }}>What Matters?</span>
            </h2>
            <p className="font-editorial text-lg md:text-xl mb-10 max-w-lg mx-auto" style={{ color: 'var(--axt-text-dim)' }}>
              Whether you need to secure your infrastructure, meet compliance, or modernise legacy systems — we're here.
            </p>
            <Link to="/contact" className="btn-axt btn-axt-gold inline-block">
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
