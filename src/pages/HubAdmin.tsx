import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";
import useReveal from "@/hooks/useReveal";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  organisation: string | null;
  message: string;
  created_at: string;
}

interface CareerInterest {
  id: string;
  name: string;
  email: string;
  role_interest: string | null;
  message: string | null;
  created_at: string;
}

const HubAdmin = () => {
  const { session, user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"enquiries" | "careers">("enquiries");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [careerInterests, setCareerInterests] = useState<CareerInterest[]>([]);
  const heroRef = useReveal();

  useEffect(() => {
    if (!user) return;

    // Check admin role
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .then(({ data }) => {
        setIsAdmin((data?.length ?? 0) > 0);
      });
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;

    supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setEnquiries(data ?? []));

    supabase
      .from("career_interests")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setCareerInterests(data ?? []));
  }, [isAdmin]);

  if (authLoading || isAdmin === null) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center" style={{ background: 'var(--axt-void)' }}>
          <p className="font-mono text-sm" style={{ color: 'var(--axt-text-dim)' }}>Loading...</p>
        </section>
      </Layout>
    );
  }

  if (!session) return <Navigate to="/hub" replace />;
  if (!isAdmin) return <Navigate to="/hub" replace />;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <Layout>
      <section ref={heroRef} className="min-h-screen px-6 md:px-12 py-24 md:py-32" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target flex items-center justify-between mb-12">
            <SectionLabel number="01" label="Admin Dashboard" />
            <Link to="/hub" className="btn-axt btn-axt-ghost !py-2 !px-6">← Hub</Link>
          </div>

          <h1 className="reveal-target font-display text-5xl md:text-7xl tracking-wider mb-12" style={{ color: 'var(--axt-ivory)' }}>
            Admin
          </h1>

          {/* Tabs */}
          <div className="reveal-target flex gap-0 mb-12" style={{ borderBottom: '1px solid var(--axt-divider)' }}>
            {(["enquiries", "careers"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="font-mono text-[10px] uppercase tracking-[0.35em] px-6 py-4 transition-colors bg-transparent border-none cursor-pointer"
                style={{
                  color: tab === t ? 'var(--axt-gold)' : 'var(--axt-text-faint)',
                  borderBottom: tab === t ? '2px solid var(--axt-gold)' : '2px solid transparent',
                }}
              >
                {t === "enquiries" ? `Enquiries (${enquiries.length})` : `Career Interest (${careerInterests.length})`}
              </button>
            ))}
          </div>

          {/* Enquiries Tab */}
          {tab === "enquiries" && (
            <div className="space-y-[2px]" style={{ background: 'var(--axt-ghost-border)' }}>
              {enquiries.length === 0 ? (
                <div className="p-12 text-center" style={{ background: 'var(--axt-carbon)' }}>
                  <p className="font-mono text-xs" style={{ color: 'var(--axt-text-dim)' }}>No enquiries yet.</p>
                </div>
              ) : enquiries.map((eq) => (
                <div key={eq.id} className="p-6 md:p-8" style={{ background: 'var(--axt-carbon)' }}>
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <span className="font-display text-xl" style={{ color: 'var(--axt-ivory)' }}>{eq.name}</span>
                    <span className="font-mono text-[9px]" style={{ color: 'var(--axt-gold)' }}>{eq.email}</span>
                    {eq.organisation && (
                      <span className="font-mono text-[9px]" style={{ color: 'var(--axt-text-faint)' }}>· {eq.organisation}</span>
                    )}
                  </div>
                  <p className="font-mono text-xs leading-relaxed mb-2" style={{ color: 'var(--axt-text-dim)' }}>{eq.message}</p>
                  <span className="font-mono text-[8px]" style={{ color: 'var(--axt-text-faint)' }}>{formatDate(eq.created_at)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Career Tab */}
          {tab === "careers" && (
            <div className="space-y-[2px]" style={{ background: 'var(--axt-ghost-border)' }}>
              {careerInterests.length === 0 ? (
                <div className="p-12 text-center" style={{ background: 'var(--axt-carbon)' }}>
                  <p className="font-mono text-xs" style={{ color: 'var(--axt-text-dim)' }}>No career interest submissions yet.</p>
                </div>
              ) : careerInterests.map((ci) => (
                <div key={ci.id} className="p-6 md:p-8" style={{ background: 'var(--axt-carbon)' }}>
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <span className="font-display text-xl" style={{ color: 'var(--axt-ivory)' }}>{ci.name}</span>
                    <span className="font-mono text-[9px]" style={{ color: 'var(--axt-gold)' }}>{ci.email}</span>
                    {ci.role_interest && (
                      <span className="font-mono text-[9px]" style={{ color: 'var(--axt-text-faint)' }}>· {ci.role_interest}</span>
                    )}
                  </div>
                  {ci.message && <p className="font-mono text-xs leading-relaxed mb-2" style={{ color: 'var(--axt-text-dim)' }}>{ci.message}</p>}
                  <span className="font-mono text-[8px]" style={{ color: 'var(--axt-text-faint)' }}>{formatDate(ci.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default HubAdmin;
