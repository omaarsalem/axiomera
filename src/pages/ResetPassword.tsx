import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if this is a recovery flow
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      // Not a valid recovery link — redirect
      navigate("/hub");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/hub"), 2000);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6" style={{ background: 'var(--axt-void)' }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl tracking-wider mb-4" style={{ color: 'var(--axt-ivory)' }}>
              Reset Password
            </h1>
            <p className="font-editorial text-lg" style={{ color: 'var(--axt-text-dim)' }}>
              Enter your new password below.
            </p>
          </div>

          {success ? (
            <div className="text-center p-8" style={{ border: '1px solid var(--axt-divider)' }}>
              <h3 className="font-display text-3xl mb-4" style={{ color: 'var(--axt-gold)' }}>Done.</h3>
              <p className="font-mono text-xs" style={{ color: 'var(--axt-text-dim)' }}>
                Password updated. Redirecting to the Hub...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: 'var(--axt-gold)' }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
                  style={{ borderColor: 'var(--axt-ghost-border)', color: 'var(--axt-ivory)', borderRadius: 0 }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--axt-gold)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--axt-ghost-border)'}
                  placeholder="Minimum 8 characters"
                />
              </div>
              <div>
                <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: 'var(--axt-gold)' }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
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
                {loading ? "Updating..." : "Set New Password"}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ResetPassword;
