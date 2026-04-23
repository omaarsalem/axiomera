import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";
import { useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

const benefits = [
  { title: "Remote-First", desc: "Work from Cairo, Leeds, London, or anywhere that works. We care about output, not office hours." },
  { title: "Senior Culture", desc: "No bureaucracy, no politics. You'll work alongside experienced practitioners who value craft over process." },
  { title: "Real Impact", desc: "Every project matters. You'll secure hospitals, modernise governments, and protect financial institutions." },
  { title: "Continuous Learning", desc: "Conference budgets, certification support, and access to the AXT knowledge network." },
];

const Careers = () => {
  const heroRef = useReveal();
  const whyRef = useReveal();
  const formRef = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string).trim();
    const email = (fd.get("email") as string).trim();
    const role_interest = (fd.get("role") as string).trim();
    const message = (fd.get("message") as string).trim();

    if (!name || !email) {
      setError("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    const { error: dbError } = await supabase.from("career_interests").insert({
      name,
      email,
      role_interest: role_interest || null,
      message: message || null,
    });

    if (dbError) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  const inputStyle = {
    background: 'var(--axt-void)',
    color: 'var(--axt-ivory)',
    border: '1px solid var(--axt-divider)',
    borderRadius: 0,
  };

  return (
    <Layout>
      <Seo
        title="Careers — Join AXT"
        description="Senior practitioners only. Register your interest for engineering, security, and advisory roles at AXT across Cairo, Leeds, and London."
        path="/careers"
      />
      {/* Hero */}
      <section ref={heroRef} className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <span className="reveal-target font-mono text-[9px] uppercase tracking-[0.5em] block mb-6" style={{ color: 'var(--axt-gold)' }}>
            Careers
          </span>
          <h1 className="reveal-target font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            Build What<br />
            <span style={{ color: 'var(--axt-gold)' }}>Matters.</span>
          </h1>
          <p className="reveal-target font-editorial text-xl md:text-2xl max-w-2xl" style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}>
            We're always looking for senior practitioners who want to do meaningful work across infrastructure, cybersecurity, and governance.
          </p>
        </div>
      </section>

      {/* Why AXT */}
      <section ref={whyRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label="Why Join AXT" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]" style={{ background: 'var(--axt-ghost-border)' }}>
            {benefits.map((b) => (
              <div
                key={b.title}
                className="reveal-target p-8 md:p-12 transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]"
                style={{ background: 'var(--axt-obsidian)' }}
              >
                <h3 className="font-display text-3xl tracking-wider mb-4" style={{ color: 'var(--axt-ivory)' }}>
                  {b.title}
                </h3>
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register Interest */}
      <section ref={formRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[700px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="02" label="Register Interest" />
          </div>
          <div className="reveal-target">
            <p className="font-mono text-xs mb-8 leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
              No open roles at the moment — but we're always interested in hearing from exceptional people. Drop your details and we'll be in touch when something fits.
            </p>

            {submitted ? (
              <div className="p-12" style={{ border: '1px solid var(--axt-divider)' }}>
                <h3 className="font-display text-3xl mb-4" style={{ color: 'var(--axt-gold)' }}>Noted.</h3>
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
                  We've saved your details. When the right opportunity comes up, you'll hear from us.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { label: "Full Name", name: "name", type: "text", required: true },
                  { label: "Email Address", name: "email", type: "email", required: true },
                  { label: "Role of Interest", name: "role", type: "text", required: false },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-3" style={{ color: 'var(--axt-gold)' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      className="w-full font-mono text-sm p-4 outline-none transition-all duration-200"
                      style={inputStyle}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--axt-gold)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'var(--axt-divider)'}
                    />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-3" style={{ color: 'var(--axt-gold)' }}>
                    Anything Else?
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full font-mono text-sm p-4 outline-none resize-none transition-all duration-200"
                    style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--axt-gold)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--axt-divider)'}
                  />
                </div>
                {error && <p className="font-mono text-xs" style={{ color: '#e74c3c' }}>{error}</p>}
                <button type="submit" className="btn-axt btn-axt-gold" disabled={submitting}>
                  {submitting ? "Sending..." : "Register Interest"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Fellowship link */}
      <section className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-carbon)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            Early in Your Career?
          </h2>
          <p className="font-editorial text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--axt-text-dim)' }}>
            The AXT Fellowship is a free, structured programme for emerging talent. Real projects, senior mentorship, zero cost.
          </p>
          <Link to="/fellowship" className="btn-axt btn-axt-ghost inline-block">
            Learn About the Fellowship
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
