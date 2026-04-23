import { useState, useEffect, useCallback, useRef } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";
import useReveal from "@/hooks/useReveal";
import RichTextEditor from "@/components/hub/RichTextEditor";
import { logAdminAction, downloadCsv } from "@/lib/auditLog";

type LeadStatus = "new" | "contacted" | "closed";
type PostStatus = "draft" | "published";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  organisation: string | null;
  message: string;
  created_at: string;
  status: LeadStatus;
  admin_notes: string | null;
}

interface CareerInterest {
  id: string;
  name: string;
  email: string;
  role_interest: string | null;
  message: string | null;
  created_at: string;
  status: LeadStatus;
  admin_notes: string | null;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author_name: string;
  cover_image_url: string | null;
  status: PostStatus;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface ActivityRow {
  id: string;
  actor_email: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  created_at: string;
}

type Tab = "posts" | "enquiries" | "careers" | "activity";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const HubAdmin = () => {
  const { session, user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("posts");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [careerInterests, setCareerInterests] = useState<CareerInterest[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activity, setActivity] = useState<ActivityRow[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [savingMsg, setSavingMsg] = useState<string>("");
  const heroRef = useReveal();

  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .then(({ data }) => setIsAdmin((data?.length ?? 0) > 0));
  }, [user]);

  const refreshAll = useCallback(async () => {
    const [eq, ci, bp, al] = await Promise.all([
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("career_interests").select("*").order("created_at", { ascending: false }),
      supabase.from("blog_posts").select("*").order("updated_at", { ascending: false }),
      supabase.from("admin_activity_log").select("*").order("created_at", { ascending: false }).limit(100),
    ]);
    setEnquiries((eq.data ?? []) as Enquiry[]);
    setCareerInterests((ci.data ?? []) as CareerInterest[]);
    setPosts((bp.data ?? []) as BlogPost[]);
    setActivity((al.data ?? []) as ActivityRow[]);
  }, []);

  useEffect(() => {
    if (isAdmin) refreshAll();
  }, [isAdmin, refreshAll]);

  if (authLoading || isAdmin === null) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center" style={{ background: "var(--axt-void)" }}>
          <p className="font-mono text-sm" style={{ color: "var(--axt-text-dim)" }}>Loading…</p>
        </section>
      </Layout>
    );
  }
  if (!session) return <Navigate to="/hub" replace />;
  if (!isAdmin) return <Navigate to="/hub" replace />;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  // Lead status updater
  const updateLeadStatus = async (
    table: "enquiries" | "career_interests",
    id: string,
    status: LeadStatus,
  ) => {
    await supabase.from(table).update({ status }).eq("id", id);
    await logAdminAction("update_status", table, id, { status });
    refreshAll();
  };

  const updateLeadNotes = async (
    table: "enquiries" | "career_interests",
    id: string,
    admin_notes: string,
  ) => {
    await supabase.from(table).update({ admin_notes }).eq("id", id);
    await logAdminAction("update_notes", table, id);
  };

  const newPost = (): BlogPost => ({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author_name: "AXT Team",
    cover_image_url: null,
    status: "draft",
    published: false,
    published_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  return (
    <Layout>
      <section ref={heroRef} className="min-h-screen px-6 md:px-12 py-24 md:py-32" style={{ background: "var(--axt-void)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target flex items-center justify-between mb-12">
            <SectionLabel number="01" label="Admin Dashboard" />
            <Link to="/hub" className="btn-axt btn-axt-ghost !py-2 !px-6">← Hub</Link>
          </div>

          <h1 className="reveal-target font-display text-5xl md:text-7xl tracking-wider mb-12" style={{ color: "var(--axt-ivory)" }}>
            Admin
          </h1>

          {/* Tabs */}
          <div className="reveal-target flex flex-wrap gap-0 mb-12" style={{ borderBottom: "1px solid var(--axt-divider)" }}>
            {([
              ["posts", `Posts (${posts.length})`],
              ["enquiries", `Enquiries (${enquiries.length})`],
              ["careers", `Careers (${careerInterests.length})`],
              ["activity", `Activity`],
            ] as [Tab, string][]).map(([t, label]) => (
              <button
                key={t}
                onClick={() => { setTab(t); setEditing(null); }}
                className="font-mono text-[10px] uppercase tracking-[0.35em] px-6 py-4 transition-colors bg-transparent border-none cursor-pointer"
                style={{
                  color: tab === t ? "var(--axt-gold)" : "var(--axt-text-faint)",
                  borderBottom: tab === t ? "2px solid var(--axt-gold)" : "2px solid transparent",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* POSTS */}
          {tab === "posts" && !editing && (
            <div>
              <div className="flex justify-end mb-6">
                <button onClick={() => setEditing(newPost())} className="btn-axt btn-axt-gold !py-2 !px-6">+ New Post</button>
              </div>
              <div className="space-y-[2px]" style={{ background: "var(--axt-ghost-border)" }}>
                {posts.length === 0 ? (
                  <div className="p-12 text-center" style={{ background: "var(--axt-carbon)" }}>
                    <p className="font-mono text-xs" style={{ color: "var(--axt-text-dim)" }}>No posts yet. Create your first article.</p>
                  </div>
                ) : posts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setEditing(p)}
                    className="w-full text-left p-6 md:p-8 transition-colors hover:bg-[var(--axt-gold-subtle)] bg-transparent border-none cursor-pointer"
                    style={{ background: "var(--axt-carbon)" }}
                  >
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <span className="font-display text-xl" style={{ color: "var(--axt-ivory)" }}>{p.title || "(untitled)"}</span>
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.35em] px-2 py-1"
                        style={{
                          color: p.status === "published" ? "var(--axt-void)" : "var(--axt-gold)",
                          background: p.status === "published" ? "var(--axt-gold)" : "transparent",
                          border: "1px solid var(--axt-gold)",
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                    <p className="font-mono text-[10px]" style={{ color: "var(--axt-text-faint)" }}>
                      /insights/{p.slug || "—"} · updated {formatDate(p.updated_at)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === "posts" && editing && (
            <PostEditor
              post={editing}
              onCancel={() => setEditing(null)}
              onSaved={async () => { setEditing(null); await refreshAll(); }}
              setSavingMsg={setSavingMsg}
              savingMsg={savingMsg}
            />
          )}

          {/* ENQUIRIES */}
          {tab === "enquiries" && (
            <div>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => downloadCsv("enquiries.csv", enquiries as unknown as Record<string, unknown>[])}
                  className="btn-axt btn-axt-ghost !py-2 !px-6"
                >Export CSV</button>
              </div>
              <div className="space-y-[2px]" style={{ background: "var(--axt-ghost-border)" }}>
                {enquiries.length === 0 ? (
                  <div className="p-12 text-center" style={{ background: "var(--axt-carbon)" }}>
                    <p className="font-mono text-xs" style={{ color: "var(--axt-text-dim)" }}>No enquiries yet.</p>
                  </div>
                ) : enquiries.map((eq) => (
                  <LeadCard
                    key={eq.id}
                    title={eq.name}
                    email={eq.email}
                    meta={eq.organisation}
                    body={eq.message}
                    status={eq.status}
                    notes={eq.admin_notes ?? ""}
                    createdAt={eq.created_at}
                    onStatus={(s) => updateLeadStatus("enquiries", eq.id, s)}
                    onNotes={(n) => updateLeadNotes("enquiries", eq.id, n)}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CAREERS */}
          {tab === "careers" && (
            <div>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => downloadCsv("career-interests.csv", careerInterests as unknown as Record<string, unknown>[])}
                  className="btn-axt btn-axt-ghost !py-2 !px-6"
                >Export CSV</button>
              </div>
              <div className="space-y-[2px]" style={{ background: "var(--axt-ghost-border)" }}>
                {careerInterests.length === 0 ? (
                  <div className="p-12 text-center" style={{ background: "var(--axt-carbon)" }}>
                    <p className="font-mono text-xs" style={{ color: "var(--axt-text-dim)" }}>No career interest submissions yet.</p>
                  </div>
                ) : careerInterests.map((ci) => (
                  <LeadCard
                    key={ci.id}
                    title={ci.name}
                    email={ci.email}
                    meta={ci.role_interest}
                    body={ci.message ?? ""}
                    status={ci.status}
                    notes={ci.admin_notes ?? ""}
                    createdAt={ci.created_at}
                    onStatus={(s) => updateLeadStatus("career_interests", ci.id, s)}
                    onNotes={(n) => updateLeadNotes("career_interests", ci.id, n)}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ACTIVITY */}
          {tab === "activity" && (
            <div className="space-y-[2px]" style={{ background: "var(--axt-ghost-border)" }}>
              {activity.length === 0 ? (
                <div className="p-12 text-center" style={{ background: "var(--axt-carbon)" }}>
                  <p className="font-mono text-xs" style={{ color: "var(--axt-text-dim)" }}>No admin activity recorded.</p>
                </div>
              ) : activity.map((a) => (
                <div key={a.id} className="p-4 md:p-6 flex flex-wrap items-center gap-4" style={{ background: "var(--axt-carbon)" }}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: "var(--axt-gold)" }}>{a.action}</span>
                  <span className="font-mono text-xs" style={{ color: "var(--axt-text-dim)" }}>{a.entity_type}{a.entity_id ? ` · ${a.entity_id.slice(0, 8)}` : ""}</span>
                  <span className="font-mono text-[10px] ml-auto" style={{ color: "var(--axt-text-faint)" }}>{a.actor_email} · {formatDate(a.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

/* ───────────── Sub-components ───────────── */

const LeadCard = ({
  title, email, meta, body, status, notes, createdAt, onStatus, onNotes, formatDate,
}: {
  title: string; email: string; meta: string | null; body: string;
  status: LeadStatus; notes: string; createdAt: string;
  onStatus: (s: LeadStatus) => void; onNotes: (n: string) => void;
  formatDate: (d: string) => string;
}) => {
  const [localNotes, setLocalNotes] = useState(notes);
  const [open, setOpen] = useState(false);
  const colors: Record<LeadStatus, string> = { new: "var(--axt-gold)", contacted: "var(--axt-ivory)", closed: "var(--axt-text-faint)" };
  return (
    <div className="p-6 md:p-8" style={{ background: "var(--axt-carbon)" }}>
      <div className="flex flex-wrap items-center gap-4 mb-3">
        <span className="font-display text-xl" style={{ color: "var(--axt-ivory)" }}>{title}</span>
        <span className="font-mono text-[9px]" style={{ color: "var(--axt-gold)" }}>{email}</span>
        {meta && <span className="font-mono text-[9px]" style={{ color: "var(--axt-text-faint)" }}>· {meta}</span>}
        <div className="ml-auto flex gap-0" style={{ border: "1px solid var(--axt-divider)" }}>
          {(["new", "contacted", "closed"] as LeadStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => onStatus(s)}
              className="font-mono text-[9px] uppercase tracking-[0.3em] px-3 py-1 bg-transparent border-none cursor-pointer transition-colors"
              style={{
                color: status === s ? "var(--axt-void)" : colors[s],
                background: status === s ? colors[s] : "transparent",
              }}
            >{s}</button>
          ))}
        </div>
      </div>
      <p className="font-mono text-xs leading-relaxed mb-2 whitespace-pre-wrap" style={{ color: "var(--axt-text-dim)" }}>{body}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="font-mono text-[8px]" style={{ color: "var(--axt-text-faint)" }}>{formatDate(createdAt)}</span>
        <button onClick={() => setOpen(!open)} className="font-mono text-[9px] uppercase tracking-[0.3em] bg-transparent border-none cursor-pointer" style={{ color: "var(--axt-gold)" }}>
          {open ? "Hide notes" : "+ Notes"}
        </button>
      </div>
      {open && (
        <textarea
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          onBlur={() => onNotes(localNotes)}
          placeholder="Internal notes…"
          rows={3}
          className="w-full mt-3 p-3 font-mono text-xs bg-transparent resize-y"
          style={{ color: "var(--axt-ivory)", border: "1px solid var(--axt-divider)" }}
        />
      )}
    </div>
  );
};

const PostEditor = ({
  post, onCancel, onSaved, savingMsg, setSavingMsg,
}: {
  post: BlogPost; onCancel: () => void; onSaved: () => void;
  savingMsg: string; setSavingMsg: (s: string) => void;
}) => {
  const [draft, setDraft] = useState<BlogPost>(post);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-save (only for existing drafts)
  const triggerAutoSave = useCallback((next: BlogPost) => {
    if (!next.id) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      setSavingMsg("Saving…");
      const { error } = await supabase
        .from("blog_posts")
        .update({
          title: next.title,
          slug: next.slug,
          excerpt: next.excerpt,
          content: next.content,
          cover_image_url: next.cover_image_url,
          author_name: next.author_name,
        })
        .eq("id", next.id);
      setSavingMsg(error ? "Save failed" : `Saved · ${new Date().toLocaleTimeString()}`);
    }, 1200);
  }, [setSavingMsg]);

  const update = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => {
    setDraft((d) => {
      const next = { ...d, [key]: value };
      if (key === "title" && (!d.slug || d.slug === slugify(d.title))) {
        next.slug = slugify(String(value ?? ""));
      }
      triggerAutoSave(next);
      return next;
    });
  };

  const handleCover = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${(post.id || "new")}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("post-covers").upload(path, file, { upsert: true });
    if (upErr) { alert(upErr.message); setUploading(false); return; }
    const { data: pub } = supabase.storage.from("post-covers").getPublicUrl(path);
    update("cover_image_url", pub.publicUrl);
    setUploading(false);
  };

  const save = async (publish: boolean) => {
    if (!draft.title.trim() || !draft.slug.trim()) { alert("Title and slug are required."); return; }
    const payload = {
      title: draft.title,
      slug: draft.slug,
      excerpt: draft.excerpt,
      content: draft.content,
      author_name: draft.author_name,
      cover_image_url: draft.cover_image_url,
      status: (publish ? "published" : "draft") as PostStatus,
      published: publish,
      published_at: publish ? (draft.published_at ?? new Date().toISOString()) : null,
    };
    if (draft.id) {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", draft.id);
      if (error) { alert(error.message); return; }
      await logAdminAction(publish ? "publish_post" : "update_post", "blog_posts", draft.id, { title: draft.title });
    } else {
      const { data, error } = await supabase.from("blog_posts").insert(payload).select("id").single();
      if (error) { alert(error.message); return; }
      await logAdminAction(publish ? "publish_post" : "create_post", "blog_posts", data?.id ?? null, { title: draft.title });
    }
    onSaved();
  };

  const remove = async () => {
    if (!draft.id) { onCancel(); return; }
    if (!confirm("Delete this post permanently?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", draft.id);
    if (error) { alert(error.message); return; }
    await logAdminAction("delete_post", "blog_posts", draft.id, { title: draft.title });
    onSaved();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <button onClick={onCancel} className="btn-axt btn-axt-ghost !py-2 !px-6">← Back</button>
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] ml-auto" style={{ color: "var(--axt-text-faint)" }}>{savingMsg}</span>
        {draft.id && <button onClick={remove} className="font-mono text-[10px] uppercase tracking-[0.3em] px-4 py-2 bg-transparent cursor-pointer" style={{ color: "var(--axt-text-faint)", border: "1px solid var(--axt-divider)" }}>Delete</button>}
        <button onClick={() => save(false)} className="btn-axt btn-axt-ghost !py-2 !px-6">Save Draft</button>
        <button onClick={() => save(true)} className="btn-axt btn-axt-gold !py-2 !px-6">Publish</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Title">
          <input value={draft.title} onChange={(e) => update("title", e.target.value)} className="axt-input" />
        </Field>
        <Field label="Slug">
          <input value={draft.slug} onChange={(e) => update("slug", slugify(e.target.value))} className="axt-input" />
        </Field>
        <Field label="Author">
          <input value={draft.author_name} onChange={(e) => update("author_name", e.target.value)} className="axt-input" />
        </Field>
        <Field label="Cover Image">
          <div className="flex items-center gap-3">
            <input ref={fileRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleCover(e.target.files[0])} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()} className="font-mono text-[10px] uppercase tracking-[0.3em] px-4 py-2 bg-transparent cursor-pointer" style={{ color: "var(--axt-ivory)", border: "1px solid var(--axt-divider)" }}>
              {uploading ? "Uploading…" : draft.cover_image_url ? "Replace" : "Upload"}
            </button>
            {draft.cover_image_url && (
              <img src={draft.cover_image_url} alt="cover" className="h-10 w-auto" />
            )}
          </div>
        </Field>
      </div>

      <Field label="Excerpt">
        <textarea
          value={draft.excerpt ?? ""}
          onChange={(e) => update("excerpt", e.target.value)}
          rows={2}
          className="axt-input"
        />
      </Field>

      <Field label="Content">
        <RichTextEditor value={draft.content} onChange={(html) => update("content", html)} placeholder="Start writing…" />
      </Field>

      <style>{`
        .axt-input {
          width: 100%;
          background: var(--axt-carbon);
          color: var(--axt-ivory);
          border: 1px solid var(--axt-divider);
          padding: 12px 14px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          border-radius: 0;
          outline: none;
        }
        .axt-input:focus { border-color: var(--axt-gold); }
      `}</style>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="font-mono text-[9px] uppercase tracking-[0.35em] block mb-2" style={{ color: "var(--axt-text-faint)" }}>{label}</span>
    {children}
  </label>
);

export default HubAdmin;
