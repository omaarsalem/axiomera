import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";
import useReveal from "@/hooks/useReveal";

const HubLogin = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) setError("Invalid credentials. Please try again.");
    setLoading(false);
  };

  const handleReset = async () => {
    if (!email) {
      setError("Enter your email address first.");
      return;
    }
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6" style={{ background: 'var(--axt-void)' }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider mb-4" style={{ color: 'var(--axt-ivory)' }}>
              Member Hub
            </h1>
            <p className="font-editorial text-lg" style={{ color: 'var(--axt-text-dim)' }}>
              AXT Fellowship · Access Your Learning Path
            </p>
          </div>

          {resetSent ? (
            <div className="text-center p-8" style={{ border: '1px solid var(--axt-divider)' }}>
              <h3 className="font-display text-3xl mb-4" style={{ color: 'var(--axt-gold)' }}>Check Your Email.</h3>
              <p className="font-mono text-xs" style={{ color: 'var(--axt-text-dim)' }}>
                If an account exists for {email}, you'll receive a password reset link shortly.
              </p>
              <button onClick={() => { setResetSent(false); setShowReset(false); }} className="btn-axt btn-axt-ghost mt-6 !py-2 !px-6">
                Back to Login
              </button>
            </div>
          ) : showReset ? (
            <div>
              <p className="font-mono text-xs mb-6" style={{ color: 'var(--axt-text-dim)' }}>
                Enter your email and we'll send you a password reset link.
              </p>
              <div className="mb-4">
                <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: 'var(--axt-gold)' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
                  style={{ borderColor: 'var(--axt-ghost-border)', color: 'var(--axt-ivory)', borderRadius: 0 }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--axt-gold)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--axt-ghost-border)'}
                  placeholder="fellow@email.com"
                />
              </div>
              {error && <p className="font-mono text-xs mb-4" style={{ color: '#e74c3c' }}>{error}</p>}
              <button onClick={handleReset} disabled={loading} className="btn-axt btn-axt-gold w-full text-center mb-4">
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <button onClick={() => setShowReset(false)} className="btn-axt btn-axt-ghost w-full text-center">
                Back to Login
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: 'var(--axt-gold)' }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
                    style={{ borderColor: 'var(--axt-ghost-border)', color: 'var(--axt-ivory)', borderRadius: 0 }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--axt-gold)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--axt-ghost-border)'}
                    placeholder="fellow@email.com"
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: 'var(--axt-gold)' }}>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
                    style={{ borderColor: 'var(--axt-ghost-border)', color: 'var(--axt-ivory)', borderRadius: 0 }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--axt-gold)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--axt-ghost-border)'}
                    placeholder="••••••••"
                  />
                </div>
                {error && <p className="font-mono text-xs" style={{ color: '#e74c3c' }}>{error}</p>}
                <button type="submit" disabled={loading} className="btn-axt btn-axt-gold mt-4 w-full text-center">
                  {loading ? "Authenticating..." : "Access Hub"}
                </button>
              </form>
              <button
                onClick={() => setShowReset(true)}
                className="w-full text-center mt-4 font-mono text-[10px] bg-transparent border-none cursor-pointer transition-colors"
                style={{ color: 'var(--axt-text-faint)' }}
              >
                Forgot password?
              </button>
            </>
          )}

          <p className="text-center mt-8 font-mono text-[10px]" style={{ color: 'var(--axt-text-faint)' }}>
            Access is limited to AXT Fellowship members.
          </p>
        </div>
      </section>
    </Layout>
  );
};

const HubDashboard = () => {
  const { user, signOut } = useAuth();
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [progressStats, setProgressStats] = useState({ completed: 0, total: 0 });
  const [resumeCourse, setResumeCourse] = useState<{ course_id: string; phase_number: string; updated_at: string } | null>(null);
  const heroRef = useReveal();

  useEffect(() => {
    if (!user) return;

    supabase.from("profiles").select("display_name").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => setDisplayName(data?.display_name ?? null));

    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin")
      .then(({ data }) => setIsAdmin((data?.length ?? 0) > 0));

    supabase.from("course_progress").select("course_id,phase_number,status,updated_at").eq("user_id", user.id)
      .then(({ data }) => {
        const items = data ?? [];
        setProgressStats({
          completed: items.filter((c) => c.status === "completed").length,
          total: items.length,
        });
        const inProgress = items
          .filter((c) => c.status === "in_progress")
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        setResumeCourse(inProgress[0] ?? null);
      });
  }, [user]);

  const name = displayName || user?.email?.split("@")[0] || "Fellow";

  return (
    <Layout>
      <section ref={heroRef} className="min-h-screen px-6 md:px-12 py-24 md:py-32" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-16">
            <SectionLabel number="01" label="AXT Fellowship · Member Hub" />
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link to="/hub/admin" className="btn-axt btn-axt-ghost !py-2 !px-6 shrink-0">Admin</Link>
              )}
              <Link to="/hub/profile" className="btn-axt btn-axt-ghost !py-2 !px-6 shrink-0">Profile</Link>
              <button onClick={signOut} className="btn-axt btn-axt-ghost !py-2 !px-6 shrink-0">Sign Out</button>
            </div>
          </div>

          <div className="mb-20 reveal-target">
            <h1 className="font-display text-5xl md:text-7xl tracking-wider mb-4" style={{ color: 'var(--axt-ivory)' }}>
              Welcome, <span style={{ color: 'var(--axt-gold-bright)' }}>{name}</span>
            </h1>
            <p className="font-editorial text-xl" style={{ color: 'var(--axt-text-dim)' }}>
              Your learning journey continues here.
            </p>
          </div>

          {/* Progress Summary */}
          {progressStats.total > 0 && (
            <div className="mb-12 reveal-target">
              <div className="flex items-center gap-4 mb-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: 'var(--axt-gold)' }}>
                  Overall Progress
                </span>
                <span className="font-display text-xl" style={{ color: 'var(--axt-gold-bright)' }}>
                  {progressStats.completed}/{progressStats.total}
                </span>
              </div>
              <div className="h-1 w-full" style={{ background: 'var(--axt-divider)' }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${(progressStats.completed / progressStats.total) * 100}%`,
                    background: 'var(--axt-gold)',
                  }}
                />
              </div>
            </div>
          )}

          {/* Learning Path Cards */}
          <div className="mb-8 reveal-target">
            <h2 className="font-display text-3xl tracking-wider mb-8" style={{ color: 'var(--axt-ivory)' }}>
              Learning Paths
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] reveal-target"
            style={{ background: 'var(--axt-ghost-border)' }}>
            <Link
              to="/hub/hanna"
              className="block p-8 transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]"
              style={{ background: 'var(--axt-carbon)' }}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
                Fellow · Hanna
              </span>
              <h3 className="font-display text-3xl tracking-wider mb-3" style={{ color: 'var(--axt-ivory)' }}>
                Hanna's Learning Path
              </h3>
              <p className="font-mono text-xs mb-6" style={{ color: 'var(--axt-text-dim)' }}>
                Business Administration & Digital Marketing
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "8", label: "Phases" },
                  { value: "24+", label: "Courses" },
                  { value: "8", label: "Months" },
                  { value: "£0", label: "Cost" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span className="font-display text-2xl" style={{ color: 'var(--axt-gold-bright)' }}>{stat.value}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] block mt-1" style={{ color: 'var(--axt-text-faint)' }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Hub = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center" style={{ background: 'var(--axt-void)' }}>
          <div className="text-center">
            <div className="inline-block w-8 h-8 mb-4" style={{ border: '2px solid var(--axt-divider)', borderTopColor: 'var(--axt-gold)' }}>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              <div style={{ width: '100%', height: '100%', animation: 'spin 0.8s linear infinite' }} />
            </div>
            <p className="font-mono text-sm" style={{ color: 'var(--axt-text-dim)' }}>Loading...</p>
          </div>
        </section>
      </Layout>
    );
  }

  return session ? <HubDashboard /> : <HubLogin />;
};

export default Hub;
