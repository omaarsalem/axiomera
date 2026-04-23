import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import useReveal from "@/hooks/useReveal";
import { supabase } from "@/integrations/supabase/client";
import { SkeletonPathRow } from "@/components/Skeletons";

interface PathRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  fellow_name: string | null;
  duration_label: string | null;
  cost_label: string | null;
  is_published: boolean;
}

interface PathStats {
  phases: number;
  courses: number;
  completed: number;
}

const Paths = () => {
  const { session, loading, user } = useAuth();
  const [paths, setPaths] = useState<PathRow[]>([]);
  const [stats, setStats] = useState<Record<string, PathStats>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [pathsLoading, setPathsLoading] = useState(true);
  const heroRef = useReveal();

  useEffect(() => {
    if (!user) return;
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin")
      .then(({ data }) => setIsAdmin((data?.length ?? 0) > 0));
  }, [user]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      // Admin sees all; fellow sees only published (RLS handles this)
      const { data: pathRows } = await supabase
        .from("learning_paths")
        .select("id,slug,title,subtitle,fellow_name,duration_label,cost_label,is_published")
        .order("sort_order");

      setPaths(pathRows ?? []);

      // Pull phase + course counts and user progress
      const { data: phaseRows } = await supabase.from("phases").select("id,path_id");
      const { data: courseRows } = await supabase.from("courses").select("id,slug,phase_id");
      const { data: progressRows } = await supabase
        .from("course_progress")
        .select("course_id,status")
        .eq("user_id", user.id)
        .eq("status", "completed");

      const completedSet = new Set((progressRows ?? []).map((p) => p.course_id));
      const phasesByPath: Record<string, string[]> = {};
      (phaseRows ?? []).forEach((p) => { (phasesByPath[p.path_id] ||= []).push(p.id); });
      const coursesByPhase: Record<string, { slug: string }[]> = {};
      (courseRows ?? []).forEach((c) => { (coursesByPhase[c.phase_id] ||= []).push({ slug: c.slug }); });

      const next: Record<string, PathStats> = {};
      (pathRows ?? []).forEach((p) => {
        const phaseIds = phasesByPath[p.id] ?? [];
        const slugs = phaseIds.flatMap((pid) => (coursesByPhase[pid] ?? []).map((c) => c.slug));
        const completed = slugs.filter((s) => completedSet.has(s)).length;
        next[p.id] = { phases: phaseIds.length, courses: slugs.length, completed };
      });
      setStats(next);
      setPathsLoading(false);
    })();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center" style={{ background: "var(--axt-void)" }}>
          <p className="font-mono text-sm" style={{ color: "var(--axt-text-dim)" }}>Loading…</p>
        </section>
      </Layout>
    );
  }

  if (!session) return <Navigate to="/hub" replace />;

  return (
    <Layout>
      <Seo title="Learning Paths" description="Curated learning paths for AXT Fellows." path="/hub/paths" noIndex />
      <section ref={heroRef} className="px-6 md:px-12 pt-24 pb-16 md:pt-32 md:pb-24" style={{ background: "var(--axt-void)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <SectionLabel number="02" label="AXT Fellowship · Learning Paths" />
            <Link to="/hub" className="btn-axt btn-axt-ghost !py-2 !px-6">← Hub</Link>
          </div>

          <div className="reveal-target mb-16">
            <h1 className="font-display text-5xl md:text-7xl tracking-wider mb-6" style={{ color: "var(--axt-ivory)" }}>
              Choose Your <span style={{ color: "var(--axt-gold-bright)" }}>Path</span>.
            </h1>
            <p className="font-editorial text-xl md:text-2xl max-w-2xl" style={{ color: "var(--axt-text-dim)" }}>
              Curated, free learning journeys for AXT Fellows — from foundations to certification.
            </p>
          </div>

          {pathsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]" style={{ background: "var(--axt-ghost-border)" }}>
              {[1, 2, 3].map((i) => <SkeletonPathRow key={i} />)}
            </div>
          ) : paths.length === 0 ? (
            <p className="font-mono text-sm" style={{ color: "var(--axt-text-dim)" }}>No paths available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] reveal-target"
              style={{ background: "var(--axt-ghost-border)" }}>
              {paths.map((p) => {
                const s = stats[p.id] ?? { phases: 0, courses: 0, completed: 0 };
                const pct = s.courses ? Math.round((s.completed / s.courses) * 100) : 0;
                return (
                  <Link
                    key={p.id}
                    to={`/hub/paths/${p.slug}`}
                    className="block p-8 transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]"
                    style={{ background: "var(--axt-carbon)" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: "var(--axt-gold)" }}>
                        {p.fellow_name ? `Fellow · ${p.fellow_name}` : "Open Path"}
                      </span>
                      {!p.is_published && isAdmin && (
                        <span className="font-mono text-[8px] uppercase tracking-[0.3em] px-2 py-1"
                          style={{ background: "var(--axt-void)", color: "var(--axt-text-faint)", border: "1px solid var(--axt-ghost-border)" }}>
                          Draft
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-3xl tracking-wider mb-2" style={{ color: "var(--axt-ivory)" }}>{p.title}</h3>
                    {p.subtitle && (
                      <p className="font-mono text-xs mb-6" style={{ color: "var(--axt-text-dim)" }}>{p.subtitle}</p>
                    )}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { value: `${s.phases}`, label: "Phases" },
                        { value: `${s.courses}`, label: "Courses" },
                        { value: p.duration_label ?? "—", label: "Duration" },
                        { value: p.cost_label ?? "£0", label: "Cost" },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <span className="font-display text-2xl" style={{ color: "var(--axt-gold-bright)" }}>{stat.value}</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.4em] block mt-1" style={{ color: "var(--axt-text-faint)" }}>{stat.label}</span>
                        </div>
                      ))}
                    </div>
                    {s.courses > 0 && (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] uppercase tracking-[0.4em]" style={{ color: "var(--axt-text-faint)" }}>Your progress</span>
                          <span className="font-mono text-[10px]" style={{ color: "var(--axt-gold-bright)" }}>{s.completed}/{s.courses} · {pct}%</span>
                        </div>
                        <div className="h-[2px] w-full" style={{ background: "var(--axt-divider)" }}>
                          <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: "var(--axt-gold)" }} />
                        </div>
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Paths;
