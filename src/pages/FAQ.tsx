import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqSections = [
  {
    category: "Services & Engagement",
    items: [
      {
        q: "What services does AXT offer?",
        a: "AXT operates across three pillars: Infrastructure (network architecture, cloud migration, disaster recovery), Cybersecurity (threat intelligence, penetration testing, SOC operations, incident response), and Governance (ISO 27001, SOC 2, GDPR, risk management).",
      },
      {
        q: "How does a typical engagement begin?",
        a: "Every engagement starts with a discovery call where we understand your landscape, challenges, and objectives. From there, we produce a scoping document with clear deliverables, timelines, and pricing — before any work begins.",
      },
      {
        q: "Do you offer ongoing retainer arrangements?",
        a: "Yes. Many clients retain AXT for continuous monitoring, quarterly assessments, or advisory services. We design retainer packages around your specific needs and review them quarterly.",
      },
      {
        q: "What industries do you serve?",
        a: "We work across finance, healthcare, government, education, energy, and technology sectors. Our frameworks are industry-agnostic, but our consultants have deep vertical experience.",
      },
      {
        q: "Can you work with our existing vendors?",
        a: "Absolutely. We regularly collaborate with existing IT teams and third-party vendors. Our role is to augment and elevate — not replace.",
      },
    ],
  },
  {
    category: "AXT Fellowship",
    items: [
      {
        q: "What is the AXT Fellowship?",
        a: "The AXT Fellowship is a structured mentorship and learning programme for emerging professionals. Fellows work on real client projects under senior guidance — not simulations. It's entirely free, always.",
      },
      {
        q: "How many fellows do you accept?",
        a: "Five per cohort. We keep it small intentionally — each fellow receives significant personal attention, mentorship, and real project exposure.",
      },
      {
        q: "What are the selection criteria?",
        a: "We weight Attitude & Drive (40%), Curiosity (30%), Clarity of Thought (20%), and Relevant Background (10%). We care about potential, not pedigree — your institution or grades are less important than your mindset.",
      },
      {
        q: "Is the Fellowship really free?",
        a: "100% free, always. No tuition, no hidden costs, no strings attached. We believe in investing in talent as a long-term strategy.",
      },
      {
        q: "What do fellows earn upon completion?",
        a: "Fellows receive industry-recognised certifications, a professional portfolio of real work, lifetime alumni access to the AXT network, and a strong reference from senior practitioners.",
      },
    ],
  },
  {
    category: "Technical & Security",
    items: [
      {
        q: "Which compliance frameworks do you support?",
        a: "ISO 27001, SOC 2 (Type I & II), GDPR, PCI DSS, NIST CSF, Cyber Essentials, and IEC 62443. We can also map to bespoke frameworks required by your regulators.",
      },
      {
        q: "Do you offer penetration testing?",
        a: "Yes — including external/internal network testing, web application testing, API security assessments, and social engineering engagements. All testers hold OSCP, CREST, or equivalent certifications.",
      },
      {
        q: "Can you provide 24/7 monitoring?",
        a: "Yes. Our managed SOC service provides round-the-clock monitoring, alerting, and escalation. We use a combination of SIEM, EDR, and custom detection rules tailored to your environment.",
      },
    ],
  },
];

const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid var(--axt-divider)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left bg-transparent border-none cursor-pointer group"
      >
        <span className="font-mono text-sm pr-8 transition-colors duration-200" style={{ color: open ? 'var(--axt-gold)' : 'var(--axt-ivory)' }}>
          {q}
        </span>
        <ChevronDown
          size={16}
          className="shrink-0 transition-transform duration-200"
          style={{
            color: 'var(--axt-text-faint)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '400px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="font-mono text-xs leading-relaxed pb-6" style={{ color: 'var(--axt-text-dim)' }}>
          {a}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const heroRef = useReveal();
  const sectionRefs = faqSections.map(() => useReveal());
  const ctaRef = useReveal();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSections.flatMap((s) =>
      s.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      }))
    ),
  };

  return (
    <Layout>
      <Seo
        title="FAQ — Frequently asked questions"
        description="Answers to common questions about AXT engagement models, the fellowship programme, and how we work across Cairo, Leeds, and London."
        path="/faq"
        jsonLd={faqJsonLd}
      />
      {/* Hero */}
      <section ref={heroRef} className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <span className="reveal-target font-mono text-[9px] uppercase tracking-[0.5em] block mb-6" style={{ color: 'var(--axt-gold)' }}>
            FAQ
          </span>
          <h1 className="reveal-target font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            Common<br />
            <span style={{ color: 'var(--axt-gold)' }}>Questions.</span>
          </h1>
          <p className="reveal-target font-editorial text-xl md:text-2xl max-w-2xl" style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}>
            Everything you need to know about working with AXT — our services, the Fellowship, and how we operate.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      {faqSections.map((section, i) => (
        <section
          key={section.category}
          ref={sectionRefs[i]}
          className="px-6 md:px-12 py-[80px] md:py-[120px]"
          style={{ background: i % 2 === 0 ? 'var(--axt-obsidian)' : 'var(--axt-void)' }}
        >
          <div className="max-w-[900px] mx-auto">
            <div className="reveal-target">
              <SectionLabel number={`0${i + 1}`} label={section.category} />
            </div>
            <div className="reveal-target">
              {section.items.map((item) => (
                <AccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section ref={ctaRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-carbon)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="reveal-target font-display text-4xl md:text-6xl mb-6">
            Still Have<br /><span style={{ color: 'var(--axt-gold)' }}>Questions?</span>
          </h2>
          <p className="reveal-target font-editorial text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--axt-text-dim)' }}>
            We'd rather talk than have you guess. Reach out — no obligation, no pressure.
          </p>
          <div className="reveal-target">
            <Link to="/contact" className="btn-axt btn-axt-gold inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
