import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { useState, FormEvent } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-6 reveal" style={{ color: 'var(--axt-gold)' }}>
            Contact
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6 reveal reveal-delay-1">
            Let's<br />
            <span style={{ color: 'var(--axt-gold)' }}>Talk.</span>
          </h1>
          <p className="font-editorial text-xl md:text-2xl max-w-xl reveal reveal-delay-2" style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}>
            Every engagement starts with a conversation. Tell us what you're building, protecting, or transforming.
          </p>
        </div>
      </section>

      {/* Form + Offices */}
      <section className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel number="01" label="Enquiry" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="p-12" style={{ border: '1px solid var(--axt-divider)' }}>
                  <h3 className="font-display text-3xl mb-4" style={{ color: 'var(--axt-gold)' }}>
                    Received.
                  </h3>
                  <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
                    We'll be in touch within 48 hours. Our team reviews every enquiry personally.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { label: "Full Name", name: "name", type: "text" },
                    { label: "Email Address", name: "email", type: "email" },
                    { label: "Organisation", name: "org", type: "text" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-3" style={{ color: 'var(--axt-gold)' }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required
                        className="w-full font-mono text-sm p-4 outline-none transition-colors duration-200 focus:border-axt-gold"
                        style={{
                          background: 'var(--axt-void)',
                          color: 'var(--axt-ivory)',
                          border: '1px solid var(--axt-divider)',
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-3" style={{ color: 'var(--axt-gold)' }}>
                      How Can We Help?
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full font-mono text-sm p-4 outline-none resize-none transition-colors duration-200 focus:border-axt-gold"
                      style={{
                        background: 'var(--axt-void)',
                        color: 'var(--axt-ivory)',
                        border: '1px solid var(--axt-divider)',
                        borderRadius: 0,
                      }}
                    />
                  </div>
                  <button type="submit" className="btn-axt btn-axt-gold">
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>

            {/* Offices */}
            <div>
              <div className="space-y-8">
                {[
                  { city: "Cairo", address: "Smart Village, Building B119, 6th of October, Giza", email: "cairo@axiomera.tech" },
                  { city: "Leeds", address: "Platform, New Station Street, Leeds LS1 4JB", email: "leeds@axiomera.tech" },
                  { city: "London", address: "30 St Mary Axe, London EC3A 8BF", email: "london@axiomera.tech" },
                ].map((office) => (
                  <div key={office.city} className="p-8" style={{ border: '1px solid var(--axt-divider)' }}>
                    <h3 className="font-display text-3xl mb-2">{office.city}</h3>
                    <p className="font-mono text-xs mb-2" style={{ color: 'var(--axt-text-dim)' }}>{office.address}</p>
                    <p className="font-mono text-xs" style={{ color: 'var(--axt-gold)' }}>{office.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
