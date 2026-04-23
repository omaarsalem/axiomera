import { useState, useEffect, useRef } from "react";
import { ExternalLink, Bookmark, BookmarkCheck, FileText, Award, Check, Clock, Circle, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";

export type CourseStatus = Database["public"]["Enums"]["course_status"];

export interface CourseInfo {
  platform: string;
  title: string;
  url: string;
}

interface Props {
  course: CourseInfo;
  courseId: string;
  phaseNumber: string;
  estimatedHours?: number;
  initialStatus?: CourseStatus;
  initialBookmarked?: boolean;
  initialHasCert?: boolean;
  initialNotes?: string;
  onStatusChange?: (id: string, status: CourseStatus) => void;
}

const STATUS_CYCLE: CourseStatus[] = ["not_started", "in_progress", "completed"];
const STATUS_LABEL: Record<CourseStatus, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  completed: "Completed",
};
const STATUS_ICON: Record<CourseStatus, React.ReactNode> = {
  not_started: <Circle size={12} />,
  in_progress: <Clock size={12} />,
  completed: <Check size={12} />,
};

const CourseCard = ({
  course,
  courseId,
  phaseNumber,
  estimatedHours = 8,
  initialStatus = "not_started",
  initialBookmarked = false,
  initialHasCert = false,
  initialNotes = "",
  onStatusChange,
}: Props) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<CourseStatus>(initialStatus);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [hasCert, setHasCert] = useState(initialHasCert);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [savingNotes, setSavingNotes] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const notesTimer = useRef<number | null>(null);

  useEffect(() => { setStatus(initialStatus); }, [initialStatus]);
  useEffect(() => { setBookmarked(initialBookmarked); }, [initialBookmarked]);
  useEffect(() => { setHasCert(initialHasCert); }, [initialHasCert]);
  useEffect(() => { setNotes(initialNotes); }, [initialNotes]);

  const cycleStatus = async () => {
    if (!user) return;
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(status) + 1) % 3];
    setStatus(next);
    onStatusChange?.(courseId, next);
    const payload: Database["public"]["Tables"]["course_progress"]["Insert"] = {
      user_id: user.id,
      course_id: courseId,
      phase_number: phaseNumber,
      status: next,
      started_at: next === "in_progress" ? new Date().toISOString() : null,
      completed_at: next === "completed" ? new Date().toISOString() : null,
    };
    await supabase.from("course_progress").upsert(payload, { onConflict: "user_id,course_id" });
  };

  const toggleBookmark = async () => {
    if (!user) return;
    if (bookmarked) {
      setBookmarked(false);
      await supabase.from("course_bookmarks").delete().eq("user_id", user.id).eq("course_id", courseId);
    } else {
      setBookmarked(true);
      await supabase.from("course_bookmarks").insert({ user_id: user.id, course_id: courseId, phase_number: phaseNumber });
    }
  };

  const handleNotesChange = (val: string) => {
    setNotes(val);
    if (notesTimer.current) window.clearTimeout(notesTimer.current);
    notesTimer.current = window.setTimeout(async () => {
      if (!user) return;
      setSavingNotes(true);
      await supabase.from("course_notes").upsert(
        { user_id: user.id, course_id: courseId, phase_number: phaseNumber, notes: val },
        { onConflict: "user_id,course_id" }
      );
      setSavingNotes(false);
    }, 700);
  };

  const handleCertUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const path = `${user.id}/${courseId}-${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("certificates").upload(path, file);
    if (!upErr) {
      await supabase.from("course_certificates").upsert(
        { user_id: user.id, course_id: courseId, phase_number: phaseNumber, file_path: path, file_name: file.name },
        { onConflict: "user_id,course_id" }
      );
      setHasCert(true);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeCert = async () => {
    if (!user) return;
    const { data } = await supabase.from("course_certificates").select("file_path").eq("user_id", user.id).eq("course_id", courseId).maybeSingle();
    if (data?.file_path) await supabase.storage.from("certificates").remove([data.file_path]);
    await supabase.from("course_certificates").delete().eq("user_id", user.id).eq("course_id", courseId);
    setHasCert(false);
  };

  const statusColor = status === "completed" ? "var(--axt-gold-bright)" : status === "in_progress" ? "var(--axt-gold)" : "var(--axt-text-faint)";

  return (
    <div
      className="p-6 transition-colors duration-300 flex flex-col"
      style={{
        background: 'var(--axt-carbon)',
        border: '1px solid var(--axt-ghost-border)',
        borderLeft: status === "completed" ? '2px solid var(--axt-gold-bright)' : status === "in_progress" ? '2px solid var(--axt-gold)' : '1px solid var(--axt-ghost-border)',
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: 'var(--axt-gold)' }}>
          {course.platform}
        </span>
        <button
          onClick={toggleBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark course"}
          className="bg-transparent border-none cursor-pointer p-0"
          style={{ color: bookmarked ? 'var(--axt-gold-bright)' : 'var(--axt-text-faint)' }}
        >
          {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
        </button>
      </div>

      <h4 className="font-display text-xl tracking-wider mb-4 flex-1" style={{ color: 'var(--axt-ivory)' }}>
        {course.title}
      </h4>

      {/* Status pill + meta */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <button
          onClick={cycleStatus}
          className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] px-3 py-2 bg-transparent cursor-pointer transition-colors"
          style={{ border: `1px solid ${statusColor}`, color: statusColor }}
        >
          {STATUS_ICON[status]}
          <span>{STATUS_LABEL[status]}</span>
        </button>
        <span className="font-mono text-[9px]" style={{ color: 'var(--axt-text-faint)' }}>
          ~{estimatedHours}h
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-axt btn-axt-ghost inline-flex items-center gap-2 !py-2 !px-4 !text-[9px]"
        >
          <span>Start</span>
          <ExternalLink size={10} />
        </a>
        <button
          onClick={() => setShowNotes((s) => !s)}
          className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] px-3 py-2 bg-transparent cursor-pointer"
          style={{ border: '1px solid var(--axt-ghost-border)', color: 'var(--axt-text-dim)' }}
          aria-label="Toggle notes"
        >
          <FileText size={10} />
          <span>Notes</span>
        </button>
        {hasCert ? (
          <button
            onClick={removeCert}
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] px-3 py-2 bg-transparent cursor-pointer"
            style={{ border: '1px solid var(--axt-gold)', color: 'var(--axt-gold-bright)' }}
            aria-label="Remove certificate"
          >
            <Award size={10} />
            <span>Certified</span>
            <X size={10} />
          </button>
        ) : (
          <>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] px-3 py-2 bg-transparent cursor-pointer disabled:opacity-50"
              style={{ border: '1px solid var(--axt-ghost-border)', color: 'var(--axt-text-dim)' }}
              aria-label="Upload certificate"
            >
              <Upload size={10} />
              <span>{uploading ? "Uploading…" : "Cert"}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleCertUpload}
              className="hidden"
            />
          </>
        )}
      </div>

      {showNotes && (
        <div className="mt-4">
          <textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Private notes for this course…"
            className="w-full px-3 py-2 font-mono text-xs bg-transparent outline-none resize-y min-h-[80px]"
            style={{ border: '1px solid var(--axt-ghost-border)', color: 'var(--axt-ivory)', borderRadius: 0 }}
          />
          <div className="text-right mt-1">
            <span className="font-mono text-[9px]" style={{ color: 'var(--axt-text-faint)' }}>
              {savingNotes ? "Saving…" : "Auto-saved"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
