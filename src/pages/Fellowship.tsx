import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";

const Fellowship = () => {
  const heroRef = useReveal();
  const whatRef = useReveal();
  const tracksRef = useReveal();
  const eligRef = useReveal();
  const ctaRef = useReveal();

  return (
    <Layout>
      <Seo
        title="AXT Fellowship — Where Careers Begin"
        description="A free, project-based fellowship for ambitious students and graduates. Five fellows per cohort. Real client work, senior mentorship, lifetime alumni access."
        path="/fellowship"
      />
      {/* Hero */}
      <section ref={heroRef} className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <span className="reveal-target font-mono text-[9px] uppercase tracking-[0.5em] block mb-6" style={{ color: 'var(--axt-gold)' }}>
            AXT Fellowship Programme
          </span>
          <h1 className="reveal-target font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            Build Real<br />
            <span style={{ color: 'var(--axt-gold)' }}>Systems.</span>
          </h1>
          <p className="reveal-target font-editorial text-xl md:text-2xl max-w-2xl" style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}>
            A selective, zero-cost programme for students and recent graduates to work on live infrastructure and security projects alongside senior engineers.
          </p>
        </div>
      </section>

      {/* What It Is */}
      <section ref={whatRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label="The Programme" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="reveal-target font-display text-3xl md:text-5xl mb-6">
                Not an Internship.<br />
                <span style={{ color: 'var(--axt-gold)' }}>A Crucible.</span>
              </h2>
              <p className="reveal-target font-mono text-xs leading-relaxed mb-6" style={{ color: 'var(--axt-text-dim)' }}>
                The AXT Fellowship is a structured engagement where selected candidates are embedded into active client projects. You'll work on real deliverables — network architecture reviews, security audit preparations, compliance documentation — under direct mentorship from our senior consultants.
              </p>
              <p className="reveal-target font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
                This is not theoretical. There are no simulations. Your work ships.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { label: "Duration", value: "12–16 Weeks" },
                { label: "Cost", value: "Completely Free" },
                { label: "Format", value: "Remote + On-Site Rotations" },
                { label: "Cohort Size", value: "8–12 Fellows Per Cycle" },
              ].map((item) => (
                <div key={item.label} className="reveal-target p-6" style={{ border: '1px solid var(--axt-divider)' }}>
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-2" style={{ color: 'var(--axt-gold)' }}>
                    {item.label}
                  </span>
                  <span className="font-display text-2xl">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Do */}
      <section ref={tracksRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="02" label="Tracks" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--axt-divider)' }}>
            {[
              { title: "Infrastructure Track", desc: "Network design, cloud deployments, monitoring stack setup, and capacity planning exercises." },
              { title: "Security Track", desc: "Vulnerability assessment, log analysis, incident triage, and security tooling configuration." },
              { title: "Governance Track", desc: "Policy drafting, risk register development, compliance gap analysis, and audit support." },
            ].map((track, i) => (
              <div key={track.title} className="reveal-target p-8 md:p-12" style={{ background: 'var(--axt-void)' }}>
                <span className="font-display text-5xl block mb-6" style={{ color: 'var(--axt-gold-dim)' }}>
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl md:text-3xl mb-4">{track.title}</h3>
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
                  {track.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section ref={eligRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="03" label="Eligibility" />
          </div>
          <div className="max-w-2xl">
            <ul className="space-y-4">
              {[
                "Currently enrolled in a university programme (Computer Science, Engineering, Cybersecurity, or related field) or graduated within the last 18 months.",
                "Demonstrated curiosity — personal projects, CTF participation, lab environments, open-source contributions.",
                "Strong written communication. You'll produce client-facing documentation.",
                "Available for a minimum of 20 hours per week during the programme period.",
                "Based in or willing to travel to Cairo, Leeds, or London for on-site rotations.",
              ].map((item, i) => (
                <li key={i} className="reveal-target flex gap-4 items-start">
                  <span className="font-display text-lg shrink-0" style={{ color: 'var(--axt-gold)' }}>—</span>
                  <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-carbon)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="reveal-target font-display text-4xl md:text-6xl mb-6">
            Applications Open<br /><span style={{ color: 'var(--axt-gold)' }}>Q3 2026</span>
          </h2>
          <p className="reveal-target font-editorial text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--axt-text-dim)' }}>
            Register your interest and we'll notify you when the next cohort opens.
          </p>
          <div className="reveal-target">
            <Link to="/contact" className="btn-axt btn-axt-gold inline-block">
              Register Interest
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Fellowship;
