import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionLabel from "@/components/SectionLabel";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import useReveal from "@/hooks/useReveal";
import { useTranslation } from "react-i18next";

const SECTORS = ["Financial Services", "Healthcare", "Government", "Energy & Utilities", "Education", "Retail / E-Commerce", "SME / Small Business", "Other"];
const SERVICES = ["Free 15-Min Security Check", "AXT Infrastructure", "AXT Cyber", "AXT Governance", "Community Essentials (SME)", "Enterprise Premium", "Not sure yet"];
const BUDGETS = ["Under £25k", "£25k – £100k", "£100k – £500k", "£500k+", "To be discussed"];
const TIMELINES = ["Immediate (this month)", "1–3 months", "3–6 months", "Exploratory"];

type FormState = {
  sector: string;
  service_interest: string;
  budget_range: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  org: string;
  message: string;
};

const initial: FormState = {
  sector: "", service_interest: "", budget_range: "", timeline: "",
  name: "", email: "", phone: "", org: "", message: "",
};

const Contact = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const heroRef = useReveal();
  const formRef = useReveal();
  const newsRef = useReveal();

  // Pre-tag enquiry from CTA query param (e.g. ?service=security-check)
  useEffect(() => {
    const svc = searchParams.get("service");
    if (svc === "security-check") {
      setData((d) => ({ ...d, service_interest: "Free 15-Min Security Check", sector: d.sector || "SME / Small Business" }));
    } else if (svc === "essentials") {
      setData((d) => ({ ...d, service_interest: "Community Essentials (SME)", sector: d.sector || "SME / Small Business" }));
    } else if (svc === "enterprise") {
      setData((d) => ({ ...d, service_interest: "Enterprise Premium" }));
    }
  }, [searchParams]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setData((d) => ({ ...d, [k]: v }));

  const canAdvance =
    (step === 1 && data.sector && data.service_interest) ||
    (step === 2 && data.budget_range && data.timeline) ||
    (step === 3 && data.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) && data.message.trim());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canAdvance) return;
    setSubmitting(true);
    setError(null);

    const { error: dbError } = await supabase.from("enquiries").insert({
      name: data.name.trim(),
      email: data.email.trim(),
      organisation: data.org.trim() || null,
      phone: data.phone.trim() || null,
      message: data.message.trim(),
      sector: data.sector,
      service_interest: data.service_interest,
      budget_range: data.budget_range,
      timeline: data.timeline,
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

  const Choice = ({ value, current, onSelect, label }: { value: string; current: string; onSelect: (v: string) => void; label: string }) => (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className="text-left p-4 font-mono text-xs transition-all duration-200"
      style={{
        background: current === value ? 'var(--axt-gold-subtle)' : 'var(--axt-void)',
        border: `1px solid ${current === value ? 'var(--axt-gold)' : 'var(--axt-divider)'}`,
        color: current === value ? 'var(--axt-ivory)' : 'var(--axt-text-dim)',
        borderRadius: 0,
      }}
    >
      {label}
    </button>
  );

  return (
    <Layout>
      <Seo
        title="Contact — Make the Call"
        description="Brief AXT on your IT, cyber, or governance challenge. Cairo · Leeds · London. We respond within one business day."
        path="/contact"
      />
      <section ref={heroRef} className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <span className="reveal-target font-mono text-[9px] uppercase tracking-[0.5em] block mb-6" style={{ color: 'var(--axt-gold)' }}>
            {t("contact.eyebrow")}
          </span>
          <h1 className="reveal-target font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            {t("contact.headline_a")}<br />
            <span style={{ color: 'var(--axt-gold)' }}>{t("contact.headline_b")}</span>
          </h1>
          <p className="reveal-target font-editorial text-xl md:text-2xl max-w-xl" style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}>
            {t("contact.intro")}
          </p>
        </div>
      </section>

      <section ref={formRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label="Enquiry" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div className="reveal-target">
              {submitted ? (
                <div className="p-12" style={{ border: '1px solid var(--axt-divider)' }}>
                  <h3 className="font-display text-3xl mb-4" style={{ color: 'var(--axt-gold)' }}>Received.</h3>
                  <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
                    A senior practitioner will be in touch within 48 hours. Every enquiry is reviewed personally.
                  </p>
                </div>
              ) : (
                <>
                  {/* Step indicator */}
                  <div className="flex items-center gap-2 mb-10">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex-1 flex items-center gap-2">
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.3em] w-8 h-8 flex items-center justify-center"
                          style={{
                            background: step >= s ? 'var(--axt-gold)' : 'transparent',
                            color: step >= s ? 'var(--axt-void)' : 'var(--axt-text-faint)',
                            border: `1px solid ${step >= s ? 'var(--axt-gold)' : 'var(--axt-divider)'}`,
                          }}
                        >
                          0{s}
                        </span>
                        {s < 3 && <div className="flex-1 h-px" style={{ background: step > s ? 'var(--axt-gold)' : 'var(--axt-divider)' }} />}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {step === 1 && (
                      <>
                        <div>
                          <label className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
                            Your Sector
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {SECTORS.map((s) => <Choice key={s} value={s} current={data.sector} onSelect={(v) => update("sector", v)} label={s} />)}
                          </div>
                        </div>
                        <div>
                          <label className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
                            Service Interest
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {SERVICES.map((s) => <Choice key={s} value={s} current={data.service_interest} onSelect={(v) => update("service_interest", v)} label={s} />)}
                          </div>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div>
                          <label className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
                            Indicative Budget
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {BUDGETS.map((s) => <Choice key={s} value={s} current={data.budget_range} onSelect={(v) => update("budget_range", v)} label={s} />)}
                          </div>
                        </div>
                        <div>
                          <label className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
                            Timeline
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {TIMELINES.map((s) => <Choice key={s} value={s} current={data.timeline} onSelect={(v) => update("timeline", v)} label={s} />)}
                          </div>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        {([
                          { label: "Full Name *", k: "name", type: "text" },
                          { label: "Email *", k: "email", type: "email" },
                          { label: "Phone (optional)", k: "phone", type: "tel" },
                          { label: "Organisation", k: "org", type: "text" },
                        ] as const).map((f) => (
                          <div key={f.k}>
                            <label className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-3" style={{ color: 'var(--axt-gold)' }}>{f.label}</label>
                            <input
                              type={f.type}
                              value={data[f.k]}
                              onChange={(e) => update(f.k, e.target.value)}
                              maxLength={255}
                              className="w-full font-mono text-sm p-4 outline-none transition-all duration-200"
                              style={inputStyle}
                              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--axt-gold)')}
                              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--axt-divider)')}
                            />
                          </div>
                        ))}
                        <div>
                          <label className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-3" style={{ color: 'var(--axt-gold)' }}>
                            Tell us more *
                          </label>
                          <textarea
                            value={data.message}
                            onChange={(e) => update("message", e.target.value)}
                            rows={5}
                            maxLength={2000}
                            className="w-full font-mono text-sm p-4 outline-none resize-none transition-all duration-200"
                            style={inputStyle}
                            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--axt-gold)')}
                            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--axt-divider)')}
                          />
                        </div>
                      </>
                    )}

                    {error && <p className="font-mono text-xs" style={{ color: '#e74c3c' }}>{error}</p>}

                    <div className="flex flex-wrap gap-3 pt-4">
                      {step > 1 && (
                        <button type="button" onClick={() => setStep(step - 1)} className="btn-axt btn-axt-ghost">
                          ← Back
                        </button>
                      )}
                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={() => canAdvance && setStep(step + 1)}
                          disabled={!canAdvance}
                          className="btn-axt btn-axt-gold"
                          style={{ opacity: canAdvance ? 1 : 0.4, cursor: canAdvance ? 'pointer' : 'not-allowed' }}
                        >
                          Continue →
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={submitting || !canAdvance}
                          className="btn-axt btn-axt-gold"
                          style={{ opacity: canAdvance && !submitting ? 1 : 0.4 }}
                        >
                          {submitting ? "Sending..." : "Send Brief"}
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>

            <div className="reveal-target">
              <div className="space-y-8">
                <div className="p-8" style={{ border: '1px solid var(--axt-gold)', background: 'var(--axt-gold-subtle)' }}>
                  <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-3" style={{ color: 'var(--axt-gold)' }}>
                    Direct Line
                  </span>
                  <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--axt-ivory)' }}>hello@axiomera.technology</h3>
                  <p className="font-mono text-xs mt-3" style={{ color: 'var(--axt-text-dim)' }}>
                    Every enquiry reviewed personally. Response within one business day.
                  </p>
                </div>
                {[
                  { city: "Cairo", address: "Smart Village, Building B119, 6th of October, Giza" },
                  { city: "Leeds", address: "Platform, New Station Street, Leeds LS1 4JB" },
                  { city: "London", address: "30 St Mary Axe, London EC3A 8BF" },
                ].map((office) => (
                  <div key={office.city} className="p-8" style={{ border: '1px solid var(--axt-divider)' }}>
                    <h3 className="font-display text-3xl mb-2">{office.city}</h3>
                    <p className="font-mono text-xs" style={{ color: 'var(--axt-text-dim)' }}>{office.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section ref={newsRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-carbon)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="02" label="Stay Informed" />
          </div>
          <div className="reveal-target">
            <NewsletterSignup source="contact-page" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
