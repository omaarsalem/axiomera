import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";
import useReveal from "@/hooks/useReveal";

type Mode = "signin" | "signup" | "magic" | "reset";

const inputStyle: React.CSSProperties = {
  borderColor: "var(--axt-ghost-border)", color: "var(--axt-ivory)", borderRadius: 0,
};
const focus = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "var(--axt-gold)");
const blur = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "var(--axt-ghost-border)");

const HubLogin = () => {
  const { signIn, signUp, signInWithMagicLink, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => { setError(""); setInfo(""); };

  const handleGoogle = async () => {
    reset(); setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    reset(); setLoading(true);

    if (mode === "signin") {
      const { error } = await signIn(email, password);
      if (error) setError("Invalid credentials. Please try again.");
    } else if (mode === "signup") {
      if (password.length < 8) { setError("Password must be at least 8 characters."); setLoading(false); return; }
      const { error } = await signUp(email, password, displayName || undefined);
      if (error) setError(error.message);
      else setInfo("Check your email to verify your account.");
    } else if (mode === "magic") {
      const { error } = await signInWithMagicLink(email);
      if (error) setError(error.message);
      else setInfo(`Magic link sent to ${email}.`);
    } else if (mode === "reset") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) setError(error.message);
      else setInfo(`Reset link sent to ${email}.`);
    }
    setLoading(false);
  };

  const tabBtn = (m: Mode, label: string) => (
    <button
      key={m}
      onClick={() => { setMode(m); reset(); }}
      className="font-mono text-[10px] uppercase tracking-[0.35em] px-4 py-3 bg-transparent border-none cursor-pointer transition-colors flex-1"
      style={{
        color: mode === m ? "var(--axt-gold)" : "var(--axt-text-faint)",
        borderBottom: mode === m ? "2px solid var(--axt-gold)" : "2px solid transparent",
      }}
    >{label}</button>
  );

  return (
    <Layout>
      <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-24" style={{ background: "var(--axt-void)" }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider mb-3" style={{ color: "var(--axt-ivory)" }}>Member Hub</h1>
            <p className="font-editorial text-lg" style={{ color: "var(--axt-text-dim)" }}>AXT Fellowship · Access Your Learning Path</p>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full mb-6 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.35em] cursor-pointer transition-colors flex items-center justify-center gap-3"
            style={{ background: "var(--axt-ivory)", color: "var(--axt-void)", border: "none", borderRadius: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.9 6.1 29.7 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.9 7.1 29.7 5 24 5 16.3 5 9.6 9.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.6 0 10.7-2.1 14.6-5.6l-6.7-5.7C29.7 34.4 27 35.5 24 35.5c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.5 39.4 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.4 4.3-4.4 5.7l6.7 5.7C40.7 36.8 44 31 44 24c0-1.3-.1-2.4-.4-3.5z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "var(--axt-divider)" }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.4em]" style={{ color: "var(--axt-text-faint)" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "var(--axt-divider)" }} />
          </div>

          {/* Mode tabs */}
          <div className="flex mb-6" style={{ borderBottom: "1px solid var(--axt-divider)" }}>
            {tabBtn("signin", "Sign In")}
            {tabBtn("signup", "Sign Up")}
            {tabBtn("magic", "Magic Link")}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div>
                <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: "var(--axt-gold)" }}>Display Name</label>
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
                  style={inputStyle} onFocus={focus} onBlur={blur} placeholder="How we should call you" />
              </div>
            )}
            <div>
              <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: "var(--axt-gold)" }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
                style={inputStyle} onFocus={focus} onBlur={blur} placeholder="fellow@email.com" />
            </div>
            {(mode === "signin" || mode === "signup") && (
              <div>
                <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: "var(--axt-gold)" }}>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
                  style={inputStyle} onFocus={focus} onBlur={blur} placeholder={mode === "signup" ? "Min 8 characters" : "••••••••"} />
              </div>
            )}
            {mode === "reset" && (
              <p className="font-mono text-xs" style={{ color: "var(--axt-text-dim)" }}>We'll email a reset link to the address above.</p>
            )}
            {error && <p className="font-mono text-xs" style={{ color: "#e74c3c" }}>{error}</p>}
            {info && <p className="font-mono text-xs" style={{ color: "var(--axt-gold)" }}>{info}</p>}
            <button type="submit" disabled={loading} className="btn-axt btn-axt-gold mt-2 w-full text-center">
              {loading ? "Working…" :
                mode === "signin" ? "Sign In" :
                mode === "signup" ? "Create Account" :
                mode === "magic" ? "Send Magic Link" :
                "Send Reset Link"}
            </button>
          </form>

          {mode === "signin" && (
            <button onClick={() => { setMode("reset"); reset(); }}
              className="w-full text-center mt-4 font-mono text-[10px] bg-transparent border-none cursor-pointer"
              style={{ color: "var(--axt-text-faint)" }}>Forgot password?</button>
          )}
          {mode === "reset" && (
            <button onClick={() => { setMode("signin"); reset(); }}
              className="w-full text-center mt-4 font-mono text-[10px] bg-transparent border-none cursor-pointer"
              style={{ color: "var(--axt-text-faint)" }}>← Back to sign in</button>
          )}

          <p className="text-center mt-8 font-mono text-[10px]" style={{ color: "var(--axt-text-faint)" }}>
            Sign-up creates a Fellowship account · pending admin review.
          </p>
        </div>
      </section>
    </Layout>
  );
};

const HubDashboard = () => {
  const { user, signOut } = useAuth();
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [progressStats, setProgressStats] = useState({ completed: 0, total: 0 });
  const [resumeCourse, setResumeCourse] = useState<{ course_id: string; phase_number: string; updated_at: string } | null>(null);
  const heroRef = useReveal();

  const emailVerified = !!user?.email_confirmed_at;
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (!user) return;

    supabase.from("profiles").select("display_name,avatar_url").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => { setDisplayName(data?.display_name ?? null); setAvatarUrl(data?.avatar_url ?? null); });

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

  const resendVerification = async () => {
    if (!user?.email) return;
    setResending(true);
    await supabase.auth.resend({ type: "signup", email: user.email, options: { emailRedirectTo: `${window.location.origin}/hub` } });
    setResending(false); setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  const name = displayName || user?.email?.split("@")[0] || "Fellow";

  return (
    <Layout>
      <section ref={heroRef} className="min-h-screen px-6 md:px-12 py-24 md:py-32" style={{ background: "var(--axt-void)" }}>
        <div className="max-w-[1400px] mx-auto">
          {!emailVerified && (
            <div className="mb-8 p-4 flex flex-wrap items-center gap-4" style={{ background: "var(--axt-carbon)", borderLeft: "3px solid var(--axt-gold)" }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--axt-gold)" }}>Verify Email</span>
              <span className="font-mono text-xs" style={{ color: "var(--axt-text-dim)" }}>Confirm {user?.email} to unlock all features.</span>
              <button onClick={resendVerification} disabled={resending}
                className="ml-auto font-mono text-[10px] uppercase tracking-[0.3em] px-4 py-2 bg-transparent cursor-pointer"
                style={{ color: "var(--axt-ivory)", border: "1px solid var(--axt-divider)" }}>
                {resending ? "Sending…" : resent ? "Sent ✓" : "Resend"}
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mb-16 flex-wrap gap-4">
            <SectionLabel number="01" label="AXT Fellowship · Member Hub" />
            <div className="flex items-center gap-3">
              {avatarUrl && <img src={avatarUrl} alt="" className="w-8 h-8 object-cover" style={{ border: "1px solid var(--axt-divider)" }} />}
              {isAdmin && <Link to="/hub/admin" className="btn-axt btn-axt-ghost !py-2 !px-6 shrink-0">Admin</Link>}
              <Link to="/hub/profile" className="btn-axt btn-axt-ghost !py-2 !px-6 shrink-0">Profile</Link>
              <button onClick={signOut} className="btn-axt btn-axt-ghost !py-2 !px-6 shrink-0">Sign Out</button>
            </div>
          </div>

          <div className="mb-20 reveal-target">
            <h1 className="font-display text-5xl md:text-7xl tracking-wider mb-4" style={{ color: "var(--axt-ivory)" }}>
              Welcome, <span style={{ color: "var(--axt-gold-bright)" }}>{name}</span>
            </h1>
            <p className="font-editorial text-xl" style={{ color: "var(--axt-text-dim)" }}>Your learning journey continues here.</p>
          </div>

          {progressStats.total > 0 && (
            <div className="mb-12 reveal-target">
              <div className="flex items-center gap-4 mb-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: "var(--axt-gold)" }}>Overall Progress</span>
                <span className="font-display text-xl" style={{ color: "var(--axt-gold-bright)" }}>{progressStats.completed}/{progressStats.total}</span>
              </div>
              <div className="h-1 w-full" style={{ background: "var(--axt-divider)" }}>
                <div className="h-full transition-all duration-500"
                  style={{ width: `${(progressStats.completed / progressStats.total) * 100}%`, background: "var(--axt-gold)" }} />
              </div>
            </div>
          )}

          {resumeCourse && (
            <Link to="/hub/hanna" className="block p-6 mb-12 reveal-target transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]"
              style={{ background: "var(--axt-carbon)", border: "1px solid var(--axt-gold)", borderLeft: "3px solid var(--axt-gold-bright)" }}>
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: "var(--axt-gold)" }}>
                Resume where you left off · Phase {resumeCourse.phase_number}
              </span>
              <h3 className="font-display text-2xl tracking-wider" style={{ color: "var(--axt-ivory)" }}>Continue your learning path →</h3>
            </Link>
          )}

          <div className="mb-8 reveal-target">
            <h2 className="font-display text-3xl tracking-wider mb-8" style={{ color: "var(--axt-ivory)" }}>Learning Paths</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] reveal-target" style={{ background: "var(--axt-ghost-border)" }}>
            <Link to="/hub/hanna" className="block p-8 transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]" style={{ background: "var(--axt-carbon)" }}>
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: "var(--axt-gold)" }}>Fellow · Hanna</span>
              <h3 className="font-display text-3xl tracking-wider mb-3" style={{ color: "var(--axt-ivory)" }}>Hanna's Learning Path</h3>
              <p className="font-mono text-xs mb-6" style={{ color: "var(--axt-text-dim)" }}>Business Administration & Digital Marketing</p>
              <div className="grid grid-cols-2 gap-4">
                {[{ value: "8", label: "Phases" }, { value: "24+", label: "Courses" }, { value: "8", label: "Months" }, { value: "£0", label: "Cost" }].map((stat) => (
                  <div key={stat.label}>
                    <span className="font-display text-2xl" style={{ color: "var(--axt-gold-bright)" }}>{stat.value}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] block mt-1" style={{ color: "var(--axt-text-faint)" }}>{stat.label}</span>
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
        <section className="min-h-screen flex items-center justify-center" style={{ background: "var(--axt-void)" }}>
          <p className="font-mono text-sm" style={{ color: "var(--axt-text-dim)" }}>Loading…</p>
        </section>
      </Layout>
    );
  }
  return session ? <HubDashboard /> : <HubLogin />;
};

export default Hub;
