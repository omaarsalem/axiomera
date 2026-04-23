import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logAdminAction } from "@/lib/auditLog";

interface Path {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  fellow_name: string | null;
  duration_label: string | null;
  cost_label: string | null;
  is_published: boolean;
  sort_order: number;
}

interface Phase {
  id: string;
  path_id: string;
  number: string;
  title: string;
  months: string | null;
  goal: string | null;
  sort_order: number;
}

interface Course {
  id: string;
  phase_id: string;
  slug: string;
  platform: string;
  title: string;
  url: string;
  estimated_hours: number;
  level: string | null;
  language: string | null;
  sort_order: number;
  prerequisite_course_id: string | null;
}

const inputCls = "w-full bg-[var(--axt-carbon)] text-[var(--axt-ivory)] border border-[var(--axt-divider)] focus:border-[var(--axt-gold)] outline-none px-3 py-2 font-mono text-xs";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const PathsAdmin = () => {
  const [paths, setPaths] = useState<Path[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [editingPath, setEditingPath] = useState<Path | null>(null);
  const [editingPhase, setEditingPhase] = useState<Phase | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const refresh = useCallback(async () => {
    const [p, ph, c] = await Promise.all([
      supabase.from("learning_paths").select("*").order("sort_order"),
      supabase.from("phases").select("*").order("sort_order"),
      supabase.from("courses").select("*").order("sort_order"),
    ]);
    setPaths((p.data ?? []) as Path[]);
    setPhases((ph.data ?? []) as Phase[]);
    setCourses((c.data ?? []) as Course[]);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // ── Path CRUD
  const newPath = (): Path => ({
    id: "", slug: "", title: "", subtitle: "", description: "",
    fellow_name: "", duration_label: "", cost_label: "£0",
    is_published: false, sort_order: paths.length + 1,
  });
  const savePath = async () => {
    if (!editingPath) return;
    const { id, ...rest } = editingPath;
    const payload = { ...rest, slug: rest.slug || slugify(rest.title) };
    if (id) {
      const { error } = await supabase.from("learning_paths").update(payload).eq("id", id);
      if (error) return alert(error.message);
      await logAdminAction("update_path", "learning_paths", id, { title: payload.title });
    } else {
      const { data, error } = await supabase.from("learning_paths").insert(payload).select("id").single();
      if (error) return alert(error.message);
      await logAdminAction("create_path", "learning_paths", data?.id, { title: payload.title });
    }
    setEditingPath(null);
    refresh();
  };
  const deletePath = async (p: Path) => {
    if (!confirm(`Delete "${p.title}" and all its phases & courses?`)) return;
    const { error } = await supabase.from("learning_paths").delete().eq("id", p.id);
    if (error) return alert(error.message);
    await logAdminAction("delete_path", "learning_paths", p.id, { title: p.title });
    if (selectedPath === p.id) setSelectedPath(null);
    refresh();
  };

  // ── Phase CRUD
  const newPhase = (pathId: string): Phase => {
    const existing = phases.filter((p) => p.path_id === pathId);
    const num = String(existing.length + 1).padStart(2, "0");
    return { id: "", path_id: pathId, number: num, title: "", months: "", goal: "", sort_order: existing.length + 1 };
  };
  const savePhase = async () => {
    if (!editingPhase) return;
    const { id, ...rest } = editingPhase;
    if (id) {
      const { error } = await supabase.from("phases").update(rest).eq("id", id);
      if (error) return alert(error.message);
      await logAdminAction("update_phase", "phases", id, { title: rest.title });
    } else {
      const { data, error } = await supabase.from("phases").insert(rest).select("id").single();
      if (error) return alert(error.message);
      await logAdminAction("create_phase", "phases", data?.id, { title: rest.title });
    }
    setEditingPhase(null);
    refresh();
  };
  const deletePhase = async (p: Phase) => {
    if (!confirm(`Delete phase "${p.title}" and all its courses?`)) return;
    const { error } = await supabase.from("phases").delete().eq("id", p.id);
    if (error) return alert(error.message);
    await logAdminAction("delete_phase", "phases", p.id, { title: p.title });
    refresh();
  };

  // ── Course CRUD
  const newCourse = (phaseId: string): Course => {
    const existing = courses.filter((c) => c.phase_id === phaseId);
    return {
      id: "", phase_id: phaseId, slug: "", platform: "", title: "", url: "",
      estimated_hours: 8, level: "", language: "English",
      sort_order: existing.length, prerequisite_course_id: null,
    };
  };
  const saveCourse = async () => {
    if (!editingCourse) return;
    const phase = phases.find((p) => p.id === editingCourse.phase_id);
    const path = phase ? paths.find((pa) => pa.id === phase.path_id) : null;
    const slug = editingCourse.slug || (path && phase
      ? `${path.slug}-p${phase.number}-${slugify(editingCourse.title).slice(0, 60)}`
      : slugify(editingCourse.title));
    const { id, ...rest } = { ...editingCourse, slug };
    if (id) {
      const { error } = await supabase.from("courses").update(rest).eq("id", id);
      if (error) return alert(error.message);
      await logAdminAction("update_course", "courses", id, { title: rest.title });
    } else {
      const { data, error } = await supabase.from("courses").insert(rest).select("id").single();
      if (error) return alert(error.message);
      await logAdminAction("create_course", "courses", data?.id, { title: rest.title });
    }
    setEditingCourse(null);
    refresh();
  };
  const deleteCourse = async (c: Course) => {
    if (!confirm(`Delete course "${c.title}"?`)) return;
    const { error } = await supabase.from("courses").delete().eq("id", c.id);
    if (error) return alert(error.message);
    await logAdminAction("delete_course", "courses", c.id, { title: c.title });
    refresh();
  };

  // Reorder helper (swap with neighbour)
  const reorder = async <T extends { id: string; sort_order: number }>(
    table: "phases" | "courses", items: T[], item: T, dir: -1 | 1
  ) => {
    const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex((i) => i.id === item.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    await supabase.from(table).update({ sort_order: swap.sort_order }).eq("id", item.id);
    await supabase.from(table).update({ sort_order: item.sort_order }).eq("id", swap.id);
    refresh();
  };

  const path = paths.find((p) => p.id === selectedPath);
  const pathPhases = phases.filter((p) => p.path_id === selectedPath).sort((a, b) => a.sort_order - b.sort_order);

  /* ── Path list (when none selected) ── */
  if (!selectedPath) {
    return (
      <div>
        <div className="flex justify-end mb-6">
          <button onClick={() => setEditingPath(newPath())} className="btn-axt btn-axt-gold !py-2 !px-6">+ New Path</button>
        </div>
        <div className="space-y-[2px]" style={{ background: "var(--axt-ghost-border)" }}>
          {paths.length === 0 ? (
            <div className="p-12 text-center" style={{ background: "var(--axt-carbon)" }}>
              <p className="font-mono text-xs" style={{ color: "var(--axt-text-dim)" }}>No paths yet.</p>
            </div>
          ) : paths.map((p) => {
            const phaseCount = phases.filter((x) => x.path_id === p.id).length;
            const courseCount = courses.filter((c) => phases.find((x) => x.id === c.phase_id && x.path_id === p.id)).length;
            return (
              <div key={p.id} className="p-6 md:p-8 flex flex-wrap items-center gap-4" style={{ background: "var(--axt-carbon)" }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-xl" style={{ color: "var(--axt-ivory)" }}>{p.title}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.35em] px-2 py-1"
                      style={{
                        color: p.is_published ? "var(--axt-void)" : "var(--axt-gold)",
                        background: p.is_published ? "var(--axt-gold)" : "transparent",
                        border: "1px solid var(--axt-gold)",
                      }}>
                      {p.is_published ? "published" : "draft"}
                    </span>
                  </div>
                  <p className="font-mono text-[10px]" style={{ color: "var(--axt-text-faint)" }}>
                    /{p.slug} · {phaseCount} phases · {courseCount} courses{p.fellow_name ? ` · Fellow: ${p.fellow_name}` : ""}
                  </p>
                </div>
                <button onClick={() => setSelectedPath(p.id)} className="btn-axt btn-axt-ghost !py-2 !px-4">Manage</button>
                <button onClick={() => setEditingPath(p)} className="font-mono text-[10px] uppercase tracking-[0.3em] px-4 py-2 bg-transparent cursor-pointer"
                  style={{ color: "var(--axt-ivory)", border: "1px solid var(--axt-divider)" }}>Edit</button>
                <button onClick={() => deletePath(p)} className="font-mono text-[10px] uppercase tracking-[0.3em] px-4 py-2 bg-transparent cursor-pointer"
                  style={{ color: "var(--axt-text-faint)", border: "1px solid var(--axt-divider)" }}>Delete</button>
              </div>
            );
          })}
        </div>

        {editingPath && (
          <PathForm path={editingPath} setPath={setEditingPath} onSave={savePath} onCancel={() => setEditingPath(null)} />
        )}
      </div>
    );
  }

  /* ── Path detail (manage phases & courses) ── */
  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <button onClick={() => setSelectedPath(null)} className="btn-axt btn-axt-ghost !py-2 !px-4">← All Paths</button>
        <h3 className="font-display text-2xl tracking-wider" style={{ color: "var(--axt-ivory)" }}>{path?.title}</h3>
        <span className="font-mono text-[10px]" style={{ color: "var(--axt-text-faint)" }}>/{path?.slug}</span>
        <button onClick={() => path && setEditingPath(path)}
          className="ml-auto font-mono text-[10px] uppercase tracking-[0.3em] px-4 py-2 bg-transparent cursor-pointer"
          style={{ color: "var(--axt-ivory)", border: "1px solid var(--axt-divider)" }}>Edit Path</button>
        <button onClick={() => setEditingPhase(newPhase(selectedPath))} className="btn-axt btn-axt-gold !py-2 !px-4">+ Phase</button>
      </div>

      {pathPhases.length === 0 ? (
        <div className="p-12 text-center" style={{ background: "var(--axt-carbon)" }}>
          <p className="font-mono text-xs" style={{ color: "var(--axt-text-dim)" }}>No phases yet — create the first one.</p>
        </div>
      ) : pathPhases.map((ph) => {
        const phaseCourses = courses.filter((c) => c.phase_id === ph.id).sort((a, b) => a.sort_order - b.sort_order);
        return (
          <div key={ph.id} className="mb-6" style={{ border: "1px solid var(--axt-divider)" }}>
            <div className="p-4 md:p-6 flex flex-wrap items-center gap-3" style={{ background: "var(--axt-obsidian)" }}>
              <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: "var(--axt-gold)" }}>Phase {ph.number}</span>
              <span className="font-display text-lg" style={{ color: "var(--axt-ivory)" }}>{ph.title}</span>
              {ph.months && <span className="font-mono text-[10px]" style={{ color: "var(--axt-text-faint)" }}>· {ph.months}</span>}
              <div className="ml-auto flex gap-2">
                <button onClick={() => reorder("phases", pathPhases, ph, -1)} className="font-mono text-[10px] px-2 py-1 bg-transparent cursor-pointer"
                  style={{ color: "var(--axt-ivory)", border: "1px solid var(--axt-divider)" }}>↑</button>
                <button onClick={() => reorder("phases", pathPhases, ph, 1)} className="font-mono text-[10px] px-2 py-1 bg-transparent cursor-pointer"
                  style={{ color: "var(--axt-ivory)", border: "1px solid var(--axt-divider)" }}>↓</button>
                <button onClick={() => setEditingPhase(ph)} className="font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1 bg-transparent cursor-pointer"
                  style={{ color: "var(--axt-ivory)", border: "1px solid var(--axt-divider)" }}>Edit</button>
                <button onClick={() => setEditingCourse(newCourse(ph.id))} className="font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1 bg-transparent cursor-pointer"
                  style={{ color: "var(--axt-gold)", border: "1px solid var(--axt-gold)" }}>+ Course</button>
                <button onClick={() => deletePhase(ph)} className="font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1 bg-transparent cursor-pointer"
                  style={{ color: "var(--axt-text-faint)", border: "1px solid var(--axt-divider)" }}>Delete</button>
              </div>
            </div>
            {phaseCourses.length === 0 ? (
              <div className="p-6 text-center" style={{ background: "var(--axt-carbon)" }}>
                <p className="font-mono text-[10px]" style={{ color: "var(--axt-text-faint)" }}>No courses in this phase.</p>
              </div>
            ) : phaseCourses.map((c) => (
              <div key={c.id} className="p-4 md:p-5 flex flex-wrap items-center gap-3 border-t" style={{ background: "var(--axt-carbon)", borderColor: "var(--axt-divider)" }}>
                <span className="font-mono text-[9px] uppercase tracking-[0.4em]" style={{ color: "var(--axt-gold)" }}>{c.platform}</span>
                <span className="font-mono text-xs flex-1 min-w-0 truncate" style={{ color: "var(--axt-ivory)" }}>{c.title}</span>
                <span className="font-mono text-[9px]" style={{ color: "var(--axt-text-faint)" }}>{c.estimated_hours}h</span>
                <button onClick={() => reorder("courses", phaseCourses, c, -1)} className="font-mono text-[10px] px-2 py-1 bg-transparent cursor-pointer"
                  style={{ color: "var(--axt-ivory)", border: "1px solid var(--axt-divider)" }}>↑</button>
                <button onClick={() => reorder("courses", phaseCourses, c, 1)} className="font-mono text-[10px] px-2 py-1 bg-transparent cursor-pointer"
                  style={{ color: "var(--axt-ivory)", border: "1px solid var(--axt-divider)" }}>↓</button>
                <button onClick={() => setEditingCourse(c)} className="font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1 bg-transparent cursor-pointer"
                  style={{ color: "var(--axt-ivory)", border: "1px solid var(--axt-divider)" }}>Edit</button>
                <button onClick={() => deleteCourse(c)} className="font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1 bg-transparent cursor-pointer"
                  style={{ color: "var(--axt-text-faint)", border: "1px solid var(--axt-divider)" }}>×</button>
              </div>
            ))}
          </div>
        );
      })}

      {editingPath && (
        <PathForm path={editingPath} setPath={setEditingPath} onSave={savePath} onCancel={() => setEditingPath(null)} />
      )}
      {editingPhase && (
        <PhaseForm phase={editingPhase} setPhase={setEditingPhase} onSave={savePhase} onCancel={() => setEditingPhase(null)} />
      )}
      {editingCourse && (
        <CourseForm
          course={editingCourse}
          setCourse={setEditingCourse}
          onSave={saveCourse}
          onCancel={() => setEditingCourse(null)}
          phaseCourses={courses.filter((c) => c.phase_id === editingCourse.phase_id && c.id !== editingCourse.id)}
        />
      )}
    </div>
  );
};

/* ─────── Modal forms ─────── */

const Modal = ({ title, children, onCancel, onSave, saveLabel = "Save" }: {
  title: string; children: React.ReactNode; onCancel: () => void; onSave: () => void; saveLabel?: string;
}) => (
  <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4" style={{ background: "rgba(6,6,10,0.85)" }} onClick={onCancel}>
    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8"
      style={{ background: "var(--axt-carbon)", border: "1px solid var(--axt-gold-border)" }}
      onClick={(e) => e.stopPropagation()}>
      <h3 className="font-display text-2xl tracking-wider mb-6" style={{ color: "var(--axt-ivory)" }}>{title}</h3>
      <div className="space-y-4">{children}</div>
      <div className="flex justify-end gap-3 mt-8">
        <button onClick={onCancel} className="btn-axt btn-axt-ghost !py-2 !px-6">Cancel</button>
        <button onClick={onSave} className="btn-axt btn-axt-gold !py-2 !px-6">{saveLabel}</button>
      </div>
    </div>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="font-mono text-[9px] uppercase tracking-[0.35em] block mb-2" style={{ color: "var(--axt-text-faint)" }}>{label}</span>
    {children}
  </label>
);

const PathForm = ({ path, setPath, onSave, onCancel }: {
  path: Path; setPath: (p: Path) => void; onSave: () => void; onCancel: () => void;
}) => (
  <Modal title={path.id ? "Edit Path" : "New Path"} onCancel={onCancel} onSave={onSave}>
    <div className="grid md:grid-cols-2 gap-4">
      <Field label="Title"><input className={inputCls} value={path.title}
        onChange={(e) => setPath({ ...path, title: e.target.value, slug: path.slug || slugify(e.target.value) })} /></Field>
      <Field label="Slug"><input className={inputCls} value={path.slug} onChange={(e) => setPath({ ...path, slug: slugify(e.target.value) })} /></Field>
      <Field label="Subtitle"><input className={inputCls} value={path.subtitle ?? ""} onChange={(e) => setPath({ ...path, subtitle: e.target.value })} /></Field>
      <Field label="Fellow Name (optional)"><input className={inputCls} value={path.fellow_name ?? ""} onChange={(e) => setPath({ ...path, fellow_name: e.target.value || null })} /></Field>
      <Field label="Duration Label"><input className={inputCls} value={path.duration_label ?? ""} placeholder="8 Months" onChange={(e) => setPath({ ...path, duration_label: e.target.value })} /></Field>
      <Field label="Cost Label"><input className={inputCls} value={path.cost_label ?? ""} placeholder="£0" onChange={(e) => setPath({ ...path, cost_label: e.target.value })} /></Field>
    </div>
    <Field label="Description"><textarea rows={3} className={inputCls} value={path.description ?? ""} onChange={(e) => setPath({ ...path, description: e.target.value })} /></Field>
    <label className="flex items-center gap-3">
      <input type="checkbox" checked={path.is_published} onChange={(e) => setPath({ ...path, is_published: e.target.checked })} />
      <span className="font-mono text-xs" style={{ color: "var(--axt-ivory)" }}>Published (visible to fellows)</span>
    </label>
  </Modal>
);

const PhaseForm = ({ phase, setPhase, onSave, onCancel }: {
  phase: Phase; setPhase: (p: Phase) => void; onSave: () => void; onCancel: () => void;
}) => (
  <Modal title={phase.id ? "Edit Phase" : "New Phase"} onCancel={onCancel} onSave={onSave}>
    <div className="grid md:grid-cols-3 gap-4">
      <Field label="Number"><input className={inputCls} value={phase.number} onChange={(e) => setPhase({ ...phase, number: e.target.value })} /></Field>
      <Field label="Months"><input className={inputCls} value={phase.months ?? ""} placeholder="Months 1–2" onChange={(e) => setPhase({ ...phase, months: e.target.value })} /></Field>
      <Field label="Sort Order"><input type="number" className={inputCls} value={phase.sort_order} onChange={(e) => setPhase({ ...phase, sort_order: parseInt(e.target.value) || 0 })} /></Field>
    </div>
    <Field label="Title"><input className={inputCls} value={phase.title} onChange={(e) => setPhase({ ...phase, title: e.target.value })} /></Field>
    <Field label="Goal"><textarea rows={2} className={inputCls} value={phase.goal ?? ""} onChange={(e) => setPhase({ ...phase, goal: e.target.value })} /></Field>
  </Modal>
);

const CourseForm = ({ course, setCourse, onSave, onCancel, phaseCourses }: {
  course: Course; setCourse: (c: Course) => void; onSave: () => void; onCancel: () => void;
  phaseCourses: Course[];
}) => (
  <Modal title={course.id ? "Edit Course" : "New Course"} onCancel={onCancel} onSave={onSave}>
    <div className="grid md:grid-cols-2 gap-4">
      <Field label="Platform"><input className={inputCls} value={course.platform} onChange={(e) => setCourse({ ...course, platform: e.target.value })} /></Field>
      <Field label="Estimated Hours"><input type="number" className={inputCls} value={course.estimated_hours} onChange={(e) => setCourse({ ...course, estimated_hours: parseInt(e.target.value) || 0 })} /></Field>
    </div>
    <Field label="Title"><input className={inputCls} value={course.title} onChange={(e) => setCourse({ ...course, title: e.target.value })} /></Field>
    <Field label="URL"><input className={inputCls} value={course.url} placeholder="https://…" onChange={(e) => setCourse({ ...course, url: e.target.value })} /></Field>
    <div className="grid md:grid-cols-3 gap-4">
      <Field label="Level"><input className={inputCls} value={course.level ?? ""} placeholder="Beginner / Intermediate" onChange={(e) => setCourse({ ...course, level: e.target.value })} /></Field>
      <Field label="Language"><input className={inputCls} value={course.language ?? ""} onChange={(e) => setCourse({ ...course, language: e.target.value })} /></Field>
      <Field label="Slug (auto)"><input className={inputCls} value={course.slug} placeholder="auto from title" onChange={(e) => setCourse({ ...course, slug: e.target.value })} /></Field>
    </div>
    <Field label="Prerequisite Course (optional)">
      <select className={inputCls} value={course.prerequisite_course_id ?? ""} onChange={(e) => setCourse({ ...course, prerequisite_course_id: e.target.value || null })}>
        <option value="">None</option>
        {phaseCourses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
      </select>
    </Field>
  </Modal>
);

export default PathsAdmin;
