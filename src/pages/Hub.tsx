import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";

const HubLogin = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError("Invalid credentials. Please try again.");
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: 'var(--axt-gold)' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors focus:border-[var(--axt-gold-dim)]"
                style={{
                  borderColor: 'var(--axt-ghost-border)',
                  color: 'var(--axt-ivory)',
                  borderRadius: 0,
                }}
                placeholder="fellow@email.com"
              />
            </div>

            <div>
              <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: 'var(--axt-gold)' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors focus:border-[var(--axt-gold-dim)]"
                style={{
                  borderColor: 'var(--axt-ghost-border)',
                  color: 'var(--axt-ivory)',
                  borderRadius: 0,
                }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="font-mono text-xs" style={{ color: '#e74c3c' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-axt btn-axt-gold mt-4 w-full text-center"
            >
              {loading ? "Authenticating..." : "Access Hub"}
            </button>
          </form>

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
  const displayName = user?.email?.split("@")[0] ?? "Fellow";

  return (
    <Layout>
      <section className="min-h-screen px-6 md:px-12 py-24 md:py-32" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-16">
            <SectionLabel number="01" label="AXT Fellowship · Member Hub" />
            <button
              onClick={signOut}
              className="btn-axt btn-axt-ghost !py-2 !px-6 shrink-0"
            >
              Sign Out
            </button>
          </div>

          {/* Welcome */}
          <div className="mb-20 reveal">
            <h1 className="font-display text-5xl md:text-7xl tracking-wider mb-4" style={{ color: 'var(--axt-ivory)' }}>
              Welcome, <span style={{ color: 'var(--axt-gold-bright)' }}>{displayName}</span>
            </h1>
            <p className="font-editorial text-xl" style={{ color: 'var(--axt-text-dim)' }}>
              Your learning journey continues here.
            </p>
          </div>

          {/* Learning Path Cards */}
          <div className="mb-8 reveal reveal-delay-2">
            <h2 className="font-display text-3xl tracking-wider mb-8" style={{ color: 'var(--axt-ivory)' }}>
              Learning Paths
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] reveal reveal-delay-3"
            style={{ background: 'var(--axt-ghost-border)' }}>
            {/* Hanna's Path Card */}
            <Link
              to="/hub/hanna"
              className="block p-8 transition-colors duration-300"
              style={{ background: 'var(--axt-carbon)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--axt-gold-subtle)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--axt-carbon)'}
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
                    <span className="font-display text-2xl" style={{ color: 'var(--axt-gold-bright)' }}>
                      {stat.value}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] block mt-1" style={{ color: 'var(--axt-text-faint)' }}>
                      {stat.label}
                    </span>
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
          <p className="font-mono text-sm" style={{ color: 'var(--axt-text-dim)' }}>Loading...</p>
        </section>
      </Layout>
    );
  }

  return session ? <HubDashboard /> : <HubLogin />;
};

export default Hub;
