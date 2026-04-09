import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";
import useReveal from "@/hooks/useReveal";

const HubProfile = () => {
  const { session, user, loading: authLoading } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [stats, setStats] = useState({ completed: 0, inProgress: 0, total: 0 });
  const heroRef = useReveal();

  useEffect(() => {
    if (!user) return;

    // Fetch profile
    supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.display_name) setDisplayName(data.display_name);
      });

    // Fetch progress stats
    supabase
      .from("course_progress")
      .select("status")
      .eq("user_id", user.id)
      .then(({ data }) => {
        const items = data ?? [];
        setStats({
          completed: items.filter((c) => c.status === "completed").length,
          inProgress: items.filter((c) => c.status === "in_progress").length,
          total: items.length,
        });
      });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaved(false);
    await supabase.from("profiles").update({ display_name: displayName }).eq("user_id", user.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (authLoading) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center" style={{ background: 'var(--axt-void)' }}>
          <p className="font-mono text-sm" style={{ color: 'var(--axt-text-dim)' }}>Loading...</p>
        </section>
      </Layout>
    );
  }

  if (!session) return <Navigate to="/hub" replace />;

  return (
    <Layout>
      <section ref={heroRef} className="min-h-screen px-6 md:px-12 py-24 md:py-32" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[700px] mx-auto">
          <div className="reveal-target mb-12">
            <SectionLabel number="01" label="Fellow Profile" />
          </div>

          <h1 className="reveal-target font-display text-5xl md:text-6xl tracking-wider mb-12" style={{ color: 'var(--axt-ivory)' }}>
            Your Profile
          </h1>

          {/* Stats */}
          <div className="reveal-target grid grid-cols-3 gap-[2px] mb-16" style={{ background: 'var(--axt-ghost-border)' }}>
            {[
              { value: stats.completed.toString(), label: "Completed" },
              { value: stats.inProgress.toString(), label: "In Progress" },
              { value: stats.total.toString(), label: "Tracked" },
            ].map((s) => (
              <div key={s.label} className="p-6 text-center" style={{ background: 'var(--axt-carbon)' }}>
                <span className="font-display text-3xl block mb-1" style={{ color: 'var(--axt-gold-bright)' }}>{s.value}</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.4em]" style={{ color: 'var(--axt-text-faint)' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Email (read-only) */}
          <div className="reveal-target mb-6">
            <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: 'var(--axt-gold)' }}>
              Email
            </label>
            <p className="font-mono text-sm p-4" style={{ color: 'var(--axt-text-dim)', border: '1px solid var(--axt-divider)' }}>
              {user?.email}
            </p>
          </div>

          {/* Display Name */}
          <div className="reveal-target mb-8">
            <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: 'var(--axt-gold)' }}>
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
              style={{ borderColor: 'var(--axt-ghost-border)', color: 'var(--axt-ivory)', borderRadius: 0 }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--axt-gold)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--axt-ghost-border)'}
            />
          </div>

          <div className="reveal-target flex items-center gap-4">
            <button onClick={handleSave} disabled={saving} className="btn-axt btn-axt-gold">
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {saved && <span className="font-mono text-xs" style={{ color: 'var(--axt-gold)' }}>Saved ✓</span>}
          </div>

          <div className="reveal-target mt-16">
            <Link to="/hub" className="btn-axt btn-axt-ghost">← Back to Hub</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HubProfile;
