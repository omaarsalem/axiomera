import { useState, useEffect, useRef } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";
import useReveal from "@/hooks/useReveal";

const inputStyle: React.CSSProperties = {
  borderColor: "var(--axt-ghost-border)", color: "var(--axt-ivory)", borderRadius: 0,
};
const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "var(--axt-gold)");
const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "var(--axt-ghost-border)");

// A small curated timezone list — covers AXT markets + commonly used ones
const TIMEZONES = [
  "UTC",
  "Africa/Cairo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Dubai",
  "Asia/Riyadh",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
];

const HubProfile = () => {
  const { session, user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const heroRef = useReveal();
  const fileRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [stats, setStats] = useState({ completed: 0, inProgress: 0, total: 0 });

  // Email change
  const [newEmail, setNewEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  // Password change
  const [newPassword, setNewPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  // Delete confirmation
  const [confirmDelete, setConfirmDelete] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name,bio,timezone,avatar_url").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => {
        if (data?.display_name) setDisplayName(data.display_name);
        if (data?.bio) setBio(data.bio);
        if (data?.timezone) setTimezone(data.timezone);
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
      });
    supabase.from("course_progress").select("status").eq("user_id", user.id)
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
    setSaving(true); setSaved(false);
    await supabase.from("profiles").update({
      display_name: displayName,
      bio: bio || null,
      timezone,
      avatar_url: avatarUrl,
    }).eq("user_id", user.id);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatar = async (file: File) => {
    if (!user) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (upErr) { alert(upErr.message); setUploading(false); return; }
    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    const url = pub.publicUrl;
    await supabase.from("profiles").update({ avatar_url: url }).eq("user_id", user.id);
    setAvatarUrl(url);
    setUploading(false);
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault(); setEmailMsg("");
    if (!newEmail) return;
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setEmailMsg(error ? error.message : "Confirmation email sent. Check both inboxes.");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault(); setPwMsg("");
    if (newPassword.length < 8) { setPwMsg("Password must be at least 8 characters."); return; }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwMsg(error ? error.message : "Password updated.");
    if (!error) setNewPassword("");
  };

  const handleDelete = async () => {
    if (confirmDelete !== "DELETE") return;
    setDeleting(true);
    // Delete user-owned data we control via RLS
    if (user) {
      await Promise.all([
        supabase.from("course_progress").delete().eq("user_id", user.id),
        supabase.from("course_notes").delete().eq("user_id", user.id),
        supabase.from("course_bookmarks").delete().eq("user_id", user.id),
        supabase.from("course_certificates").delete().eq("user_id", user.id),
        supabase.from("profiles").delete().eq("user_id", user.id),
      ]);
    }
    await signOut();
    navigate("/", { replace: true });
  };

  if (authLoading) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center" style={{ background: "var(--axt-void)" }}>
          <p className="font-mono text-sm" style={{ color: "var(--axt-text-dim)" }}>Loading…</p>
        </section>
      </Layout>
    );
  }
  if (!session) return <Navigate to="/hub" replace />;

  const emailVerified = !!user?.email_confirmed_at;

  return (
    <Layout>
      <section ref={heroRef} className="min-h-screen px-6 md:px-12 py-24 md:py-32" style={{ background: "var(--axt-void)" }}>
        <div className="max-w-[800px] mx-auto">
          <div className="reveal-target mb-12 flex items-center justify-between">
            <SectionLabel number="01" label="Fellow Profile" />
            <Link to="/hub" className="btn-axt btn-axt-ghost !py-2 !px-6">← Hub</Link>
          </div>

          <h1 className="reveal-target font-display text-5xl md:text-6xl tracking-wider mb-12" style={{ color: "var(--axt-ivory)" }}>
            Your Profile
          </h1>

          {/* Avatar + identity */}
          <div className="reveal-target flex items-center gap-6 mb-12">
            <div className="w-24 h-24 flex items-center justify-center" style={{ background: "var(--axt-carbon)", border: "1px solid var(--axt-divider)" }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="font-display text-3xl" style={{ color: "var(--axt-gold)" }}>{(displayName || user?.email || "?")[0]?.toUpperCase()}</span>
              )}
            </div>
            <div>
              <input ref={fileRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleAvatar(e.target.files[0])} className="hidden" />
              <button onClick={() => fileRef.current?.click()} className="btn-axt btn-axt-ghost !py-2 !px-6">
                {uploading ? "Uploading…" : avatarUrl ? "Replace Avatar" : "Upload Avatar"}
              </button>
              <p className="font-mono text-[10px] mt-2" style={{ color: "var(--axt-text-faint)" }}>JPG or PNG. Square works best.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="reveal-target grid grid-cols-3 gap-[2px] mb-16" style={{ background: "var(--axt-ghost-border)" }}>
            {[
              { value: stats.completed.toString(), label: "Completed" },
              { value: stats.inProgress.toString(), label: "In Progress" },
              { value: stats.total.toString(), label: "Tracked" },
            ].map((s) => (
              <div key={s.label} className="p-6 text-center" style={{ background: "var(--axt-carbon)" }}>
                <span className="font-display text-3xl block mb-1" style={{ color: "var(--axt-gold-bright)" }}>{s.value}</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.4em]" style={{ color: "var(--axt-text-faint)" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Email status */}
          <div className="reveal-target mb-6">
            <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: "var(--axt-gold)" }}>Email</label>
            <div className="flex items-center gap-3 p-4" style={{ border: "1px solid var(--axt-divider)" }}>
              <span className="font-mono text-sm" style={{ color: "var(--axt-text-dim)" }}>{user?.email}</span>
              <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.35em] px-2 py-1"
                style={{ color: emailVerified ? "var(--axt-void)" : "var(--axt-gold)", background: emailVerified ? "var(--axt-gold)" : "transparent", border: "1px solid var(--axt-gold)" }}>
                {emailVerified ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>

          {/* Display Name */}
          <div className="reveal-target mb-6">
            <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: "var(--axt-gold)" }}>Display Name</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
              style={inputStyle} onFocus={focus} onBlur={blur} />
          </div>

          {/* Bio */}
          <div className="reveal-target mb-6">
            <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: "var(--axt-gold)" }}>Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} maxLength={400}
              className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors resize-y"
              style={inputStyle} onFocus={focus} onBlur={blur} placeholder="A short professional summary (optional)." />
            <p className="font-mono text-[10px] mt-1" style={{ color: "var(--axt-text-faint)" }}>{bio.length}/400</p>
          </div>

          {/* Timezone */}
          <div className="reveal-target mb-8">
            <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: "var(--axt-gold)" }}>Timezone</label>
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
              style={{ ...inputStyle, background: "var(--axt-carbon)" }} onFocus={focus} onBlur={blur}>
              {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>

          <div className="reveal-target flex items-center gap-4 mb-20">
            <button onClick={handleSave} disabled={saving} className="btn-axt btn-axt-gold">
              {saving ? "Saving…" : "Save Changes"}
            </button>
            {saved && <span className="font-mono text-xs" style={{ color: "var(--axt-gold)" }}>Saved ✓</span>}
          </div>

          {/* ── Security ───────────────────────────── */}
          <div className="reveal-target mb-12 pt-12" style={{ borderTop: "1px solid var(--axt-divider)" }}>
            <h2 className="font-display text-3xl tracking-wider mb-8" style={{ color: "var(--axt-ivory)" }}>Security</h2>

            <form onSubmit={handleEmailChange} className="mb-10">
              <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: "var(--axt-gold)" }}>Change Email</label>
              <div className="flex gap-3">
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="new@email.com"
                  className="flex-1 px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
                  style={inputStyle} onFocus={focus} onBlur={blur} />
                <button type="submit" className="btn-axt btn-axt-ghost !py-2 !px-6">Update</button>
              </div>
              {emailMsg && <p className="font-mono text-xs mt-2" style={{ color: "var(--axt-gold)" }}>{emailMsg}</p>}
            </form>

            <form onSubmit={handlePasswordChange}>
              <label className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-2" style={{ color: "var(--axt-gold)" }}>Change Password</label>
              <div className="flex gap-3">
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="flex-1 px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
                  style={inputStyle} onFocus={focus} onBlur={blur} />
                <button type="submit" className="btn-axt btn-axt-ghost !py-2 !px-6">Update</button>
              </div>
              {pwMsg && <p className="font-mono text-xs mt-2" style={{ color: pwMsg === "Password updated." ? "var(--axt-gold)" : "#e74c3c" }}>{pwMsg}</p>}
            </form>
          </div>

          {/* ── Danger Zone ────────────────────────── */}
          <div className="reveal-target pt-12" style={{ borderTop: "1px solid var(--axt-divider)" }}>
            <h2 className="font-display text-3xl tracking-wider mb-4" style={{ color: "#e74c3c" }}>Danger Zone</h2>
            <p className="font-mono text-xs mb-4" style={{ color: "var(--axt-text-dim)" }}>
              Deletes your profile, learning progress, notes, bookmarks, and certificates. Type <strong>DELETE</strong> to confirm.
            </p>
            <div className="flex gap-3">
              <input type="text" value={confirmDelete} onChange={(e) => setConfirmDelete(e.target.value)}
                placeholder="Type DELETE"
                className="flex-1 px-4 py-3 font-mono text-sm bg-transparent border outline-none transition-colors"
                style={inputStyle} onFocus={focus} onBlur={blur} />
              <button onClick={handleDelete} disabled={confirmDelete !== "DELETE" || deleting}
                className="font-mono text-[10px] uppercase tracking-[0.35em] px-6 py-3 cursor-pointer"
                style={{ background: confirmDelete === "DELETE" ? "#e74c3c" : "transparent", color: confirmDelete === "DELETE" ? "var(--axt-ivory)" : "var(--axt-text-faint)", border: "1px solid #e74c3c", borderRadius: 0 }}>
                {deleting ? "Deleting…" : "Delete Account"}
              </button>
            </div>
            <p className="font-mono text-[10px] mt-3" style={{ color: "var(--axt-text-faint)" }}>
              Note: your sign-in identity will remain in our auth system until an admin removes it.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HubProfile;
