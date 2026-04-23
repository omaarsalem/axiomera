import { FormEvent, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  source?: string;
}

const NewsletterSignup = ({ source = "footer" }: Props) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: trimmed, source });
    if (error && !error.message.toLowerCase().includes("duplicate")) {
      setStatus("error");
      setMessage("Could not subscribe. Try again.");
      return;
    }
    setStatus("success");
    setMessage("You're on the list.");
    setEmail("");
  };

  return (
    <div className="max-w-xl">
      <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
        Field Notes
      </span>
      <h3 className="font-display text-3xl md:text-4xl mb-3" style={{ color: 'var(--axt-ivory)' }}>
        Quarterly insights.<br />Zero noise.
      </h3>
      <p className="font-mono text-xs leading-relaxed mb-6" style={{ color: 'var(--axt-text-dim)' }}>
        Practitioner-grade analysis on cyber, governance, and infrastructure — delivered four times a year. Unsubscribe in one click.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 font-mono text-sm p-4 outline-none"
          style={{
            background: 'var(--axt-void)',
            color: 'var(--axt-ivory)',
            border: '1px solid var(--axt-divider)',
            borderRadius: 0,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--axt-gold)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--axt-divider)')}
        />
        <button type="submit" className="btn-axt btn-axt-gold" disabled={status === "loading"}>
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {message && (
        <p className="font-mono text-[11px] mt-3" style={{ color: status === "success" ? 'var(--axt-gold)' : '#e74c3c' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsletterSignup;
