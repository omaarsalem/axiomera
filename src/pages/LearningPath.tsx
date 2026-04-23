import { useState, useEffect, useMemo } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import useReveal from "@/hooks/useReveal";
import { supabase } from "@/integrations/supabase/client";
import CourseCard, { CourseInfo, CourseStatus } from "@/components/hub/CourseCard";

interface DBCourse {
  id: string;
  slug: string;
  platform: string;
  title: string;
  url: string;
  estimated_hours: number;
  sort_order: number;
  prerequisite_course_id: string | null;
}

interface DBPhase {
  id: string;
  number: string;
  title: string;
  months: string | null;
  goal: string | null;
  sort_order: number;
  courses: DBCourse[];
}

interface DBPath {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  fellow_name: string | null;
  duration_label: string | null;
  cost_label: string | null;
}

const PhaseSection = ({
  phase,
  index,
  statusMap,
  bookmarkSet,
  certSet,
  notesMap,
  onStatusChange,
}: {
  phase: DBPhase;
  index: number;
  statusMap: Record<string, CourseStatus>;
  bookmarkSet: Set<string>;
  certSet: Set<string>;
  notesMap: Record<string, string>;
  onStatusChange: (id: string, status: CourseStatus) => void;
}) => {
  const bgColor = index % 2 === 0 ? "var(--axt-void)" : "var(--axt-obsidian)";
  const sectionRef = useReveal();

  const completed = phase.courses.filter((c) => statusMap[c.slug] === "completed").length;
  const pct = phase.courses.length ? Math.round((completed / phase.courses.length) * 100) : 0;

  return (
    <section ref={sectionRef} className="px-6 md:px-12 py-20 md:py-28" style={{ background: bgColor }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12 reveal-target">
          <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: "var(--axt-gold)" }}>
            Phase {phase.number}{phase.months ? ` · ${phase.months}` : ""}
          </span>
          <h2 className="font-display text-4xl md:text-5xl tracking-wider mb-4" style={{ color: "var(--axt-ivory)" }}>
            {phase.title}
          </h2>
          {phase.goal && (
            <p className="font-mono text-sm max-w-2xl mb-6" style={{ color: "var(--axt-text-dim)" }}>
              {phase.goal}
            </p>
          )}

          <div className="max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em]" style={{ color: "var(--axt-text-faint)" }}>
                Phase Progress
              </span>
              <span className="font-mono text-[10px]" style={{ color: "var(--axt-gold-bright)" }}>
                {completed}/{phase.courses.length} · {pct}%
              </span>
            </div>
            <div className="h-[2px] w-full" style={{ background: "var(--axt-divider)" }}>
              <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: "var(--axt-gold)" }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] reveal-target"
          style={{ background: "var(--axt-ghost-border)" }}>
          {phase.courses.map((course) => {
            const prereq = course.prerequisite_course_id
              ? phase.courses.find((c) => c.id === course.prerequisite_course_id)
              : undefined;
            const prereqDone = !prereq || statusMap[prereq.slug] === "completed";
            const courseInfo: CourseInfo = { platform: course.platform, title: course.title, url: course.url };
            return (
              <div key={course.id} className="relative">
                <CourseCard
                  course={courseInfo}
                  courseId={course.slug}
                  phaseNumber={phase.number}
                  estimatedHours={course.estimated_hours}
                  initialStatus={statusMap[course.slug] ?? "not_started"}
                  initialBookmarked={bookmarkSet.has(course.slug)}
                  initialHasCert={certSet.has(course.slug)}
                  initialNotes={notesMap[course.slug] ?? ""}
                  onStatusChange={onStatusChange}
                />
                {!prereqDone && prereq && (
                  <div className="absolute top-2 right-2 font-mono text-[8px] uppercase tracking-[0.3em] px-2 py-1"
                    style={{ background: "var(--axt-void)", color: "var(--axt-text-faint)", border: "1px solid var(--axt-ghost-border)" }}>
                    Requires: {prereq.title.slice(0, 24)}…
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const LearningPath = () => {
  const { slug } = useParams<{ slug: string }>();
  const { session, loading, user } = useAuth();
  const heroRef = useReveal();

  const [path, setPath] = useState<DBPath | null>(null);
  const [phases, setPhases] = useState<DBPhase[]>([]);
  const [pathLoading, setPathLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [statusMap, setStatusMap] = useState<Record<string, CourseStatus>>({});
  const [bookmarkSet, setBookmarkSet] = useState<Set<string>>(new Set());
  const [certSet, setCertSet] = useState<Set<string>>(new Set());
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [lastActivity, setLastActivity] = useState<Date | null>(null);
  const [streak, setStreak] = useState(0);

  // Load path + phases + courses
  useEffect(() => {
    if (!slug) return;
    setPathLoading(true);
    (async () => {
      const { data: pathData } = await supabase
        .from("learning_paths")
        .select("id,slug,title,subtitle,description,fellow_name,duration_label,cost_label")
        .eq("slug", slug)
        .maybeSingle();

      if (!pathData) {
        setNotFound(true);
        setPathLoading(false);
        return;
      }
      setPath(pathData);

      const { data: phaseData } = await supabase
        .from("phases")
        .select("id,number,title,months,goal,sort_order")
        .eq("path_id", pathData.id)
        .order("sort_order");

      const phaseIds = (phaseData ?? []).map((p) => p.id);
      const { data: courseData } = phaseIds.length
        ? await supabase
            .from("courses")
            .select("id,slug,platform,title,url,estimated_hours,sort_order,phase_id,prerequisite_course_id")
            .in("phase_id", phaseIds)
            .order("sort_order")
        : { data: [] as Array<DBCourse & { phase_id: string }> };

      const byPhase: Record<string, DBCourse[]> = {};
      (courseData ?? []).forEach((c) => {
        (byPhase[c.phase_id] ||= []).push(c);
      });

      setPhases(
        (phaseData ?? []).map((p) => ({
          id: p.id,
          number: p.number,
          title: p.title,
          months: p.months,
          goal: p.goal,
          sort_order: p.sort_order,
          courses: byPhase[p.id] ?? [],
        }))
      );
      setPathLoading(false);
    })();
  }, [slug]);

  // Load user state
  useEffect(() => {
    if (!user) return;
    (async () => {
      const [progress, bookmarks, certs, notes] = await Promise.all([
        supabase.from("course_progress").select("course_id,status,updated_at").eq("user_id", user.id),
        supabase.from("course_bookmarks").select("course_id").eq("user_id", user.id),
        supabase.from("course_certificates").select("course_id").eq("user_id", user.id),
        supabase.from("course_notes").select("course_id,notes").eq("user_id", user.id),
      ]);
      const sMap: Record<string, CourseStatus> = {};
      let latest: Date | null = null;
      const days = new Set<string>();
      (progress.data ?? []).forEach((r) => {
        sMap[r.course_id] = r.status;
        const d = new Date(r.updated_at);
        if (!latest || d > latest) latest = d;
        days.add(d.toISOString().slice(0, 10));
      });
      setStatusMap(sMap);
      setLastActivity(latest);
      let s = 0;
      const cursor = new Date();
      while (days.has(cursor.toISOString().slice(0, 10))) { s += 1; cursor.setDate(cursor.getDate() - 1); }
      setStreak(s);
      setBookmarkSet(new Set((bookmarks.data ?? []).map((b) => b.course_id)));
      setCertSet(new Set((certs.data ?? []).map((c) => c.course_id)));
      const nMap: Record<string, string> = {};
      (notes.data ?? []).forEach((n) => { nMap[n.course_id] = n.notes; });
      setNotesMap(nMap);
    })();
  }, [user]);

  // Auto-enrol on first visit
  useEffect(() => {
    if (!user || !path) return;
    supabase.from("enrolments").upsert(
      { user_id: user.id, path_id: path.id, status: "active" },
      { onConflict: "user_id,path_id", ignoreDuplicates: true }
    ).then(() => {});
  }, [user, path]);

  const onStatusChange = (id: string, status: CourseStatus) => {
    setStatusMap((prev) => ({ ...prev, [id]: status }));
    setLastActivity(new Date());
  };

  const totals = useMemo(() => {
    const all = phases.flatMap((p) => p.courses);
    const totalCourses = all.length;
    const totalHours = all.reduce((sum, c) => sum + (c.estimated_hours || 0), 0);
    let completed = 0;
    let inProgress = 0;
    let remainingHours = 0;
    all.forEach((c) => {
      const st = statusMap[c.slug];
      if (st === "completed") completed += 1;
      else {
        if (st === "in_progress") inProgress += 1;
        remainingHours += c.estimated_hours || 0;
      }
    });
    return {
      totalCourses,
      totalHours,
      completed,
      inProgress,
      remainingHours,
      pct: totalCourses ? Math.round((completed / totalCourses) * 100) : 0,
    };
  }, [phases, statusMap]);

  if (loading || pathLoading) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center" style={{ background: "var(--axt-void)" }}>
          <p className="font-mono text-sm" style={{ color: "var(--axt-text-dim)" }}>Loading…</p>
        </section>
      </Layout>
    );
  }

  if (!session) return <Navigate to="/hub" replace />;

  if (notFound || !path) {
    return (
      <Layout>
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "var(--axt-void)" }}>
          <SectionLabel number="404" label="Path Not Found" />
          <h1 className="font-display text-5xl tracking-wider mt-6 mb-4" style={{ color: "var(--axt-ivory)" }}>
            This path doesn't exist
          </h1>
          <Link to="/hub/paths" className="btn-axt btn-axt-ghost mt-4">← Browse Paths</Link>
        </section>
      </Layout>
    );
  }

  const lastActivityLabel = lastActivity
    ? lastActivity.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  return (
    <Layout>
      <section ref={heroRef} className="px-6 md:px-12 pt-24 pb-16 md:pt-32 md:pb-24" style={{ background: "var(--axt-void)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label={`AXT Fellowship · ${path.fellow_name ? `${path.fellow_name}'s Path` : "Learning Path"}`} />
          </div>

          <div className="reveal-target">
            <h1 className="font-display text-5xl md:text-7xl tracking-wider mb-6" style={{ color: "var(--axt-ivory)" }}>
              {path.fellow_name ? (
                <>
                  Your Journey Starts Here,{" "}
                  <span style={{ color: "var(--axt-gold-bright)" }}>{path.fellow_name}</span>.
                </>
              ) : (
                path.title
              )}
            </h1>
            {path.description && (
              <p className="font-editorial text-xl md:text-2xl max-w-2xl" style={{ color: "var(--axt-text-dim)" }}>
                {path.description}
              </p>
            )}
          </div>

          <div className="mt-12 reveal-target max-w-3xl">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.5em]" style={{ color: "var(--axt-gold)" }}>
                Overall Progress
              </span>
              <span className="font-display text-2xl" style={{ color: "var(--axt-gold-bright)" }}>
                {totals.completed}/{totals.totalCourses} · {totals.pct}%
              </span>
            </div>
            <div className="h-1 w-full" style={{ background: "var(--axt-divider)" }}>
              <div className="h-full transition-all duration-500" style={{ width: `${totals.pct}%`, background: "var(--axt-gold)" }} />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-[2px] reveal-target"
            style={{ background: "var(--axt-ghost-border)" }}>
            {[
              { value: `${totals.completed}`, label: "Completed" },
              { value: `${totals.inProgress}`, label: "In Progress" },
              { value: `${totals.remainingHours}h`, label: "Est. Remaining" },
              { value: `${streak}`, label: "Day Streak" },
              { value: lastActivityLabel, label: "Last Activity" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 md:p-8 text-center" style={{ background: "var(--axt-carbon)" }}>
                <span className="font-display text-2xl md:text-3xl block mb-2" style={{ color: "var(--axt-gold-bright)" }}>
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: "var(--axt-text-faint)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {phases.length === 0 && (
        <section className="px-6 md:px-12 py-32 text-center" style={{ background: "var(--axt-obsidian)" }}>
          <p className="font-mono text-sm" style={{ color: "var(--axt-text-dim)" }}>
            No phases published yet for this path.
          </p>
        </section>
      )}

      {phases.map((phase, index) => (
        <PhaseSection
          key={phase.id}
          phase={phase}
          index={index}
          statusMap={statusMap}
          bookmarkSet={bookmarkSet}
          certSet={certSet}
          notesMap={notesMap}
          onStatusChange={onStatusChange}
        />
      ))}

      <section className="px-6 md:px-12 py-20 text-center" style={{ background: "var(--axt-void)" }}>
        <Link to="/hub/paths" className="btn-axt btn-axt-ghost mr-3">← All Paths</Link>
        <Link to="/hub" className="btn-axt btn-axt-ghost">Hub</Link>
      </section>
    </Layout>
  );
};

export default LearningPath;
