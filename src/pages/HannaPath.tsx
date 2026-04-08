import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import { ExternalLink } from "lucide-react";
import useReveal from "@/hooks/useReveal";

interface Course {
  platform: string;
  title: string;
  url: string;
}

interface Phase {
  number: string;
  title: string;
  months: string;
  goal: string;
  courses: Course[];
}

const phases: Phase[] = [
  {
    number: "01",
    title: "How to Learn + English Foundations",
    months: "Months 1–2",
    goal: "Build learning strategies and establish English fluency fundamentals.",
    courses: [
      { platform: "Coursera", title: "Learning How to Learn: Powerful Mental Tools to Help You Master Tough Subjects", url: "https://www.coursera.org/learn/learning-how-to-learn" },
      { platform: "FutureLearn", title: "Basic English 1: Elementary", url: "https://www.futurelearn.com/courses/basic-english-elementary" },
      { platform: "FutureLearn", title: "Basic English 2: Pre-Intermediate", url: "https://www.futurelearn.com/courses/basic-english-pre-intermediate" },
      { platform: "OpenLearn", title: "Everyday English 1", url: "https://www.open.edu/openlearn/languages/everyday-english-1/content-section-overview?active-tab=content-tab" },
    ],
  },
  {
    number: "02",
    title: "Digital Foundations — Excel + ICDL",
    months: "Months 2–3",
    goal: "Master essential digital literacy and spreadsheet skills for the modern workplace.",
    courses: [
      { platform: "Edraak", title: "International Computer Driving Licence (ICDL Base)", url: "https://www.edraak.org/en/programs/specialization/icdlsp-vv2/" },
      { platform: "Edraak", title: "Mastering Excel", url: "https://www.edraak.org/en/programs/specialization/me101-vv2/" },
      { platform: "Santander", title: "Excel – From Basics to Intermediate", url: "https://app.santanderopenacademy.com/en/course/excel" },
    ],
  },
  {
    number: "03",
    title: "Business Fundamentals",
    months: "Months 3–4",
    goal: "Understand core business operations — accounting, project management, and agile methodologies.",
    courses: [
      { platform: "Edraak", title: "Accounting Essentials for Non-Accountants", url: "https://www.edraak.org/en/programs/course/afna102-v2026-t3/" },
      { platform: "Edraak", title: "Agile Project Management", url: "https://www.edraak.org/en/programs/course/agile-project-management-v1/" },
      { platform: "edX (AdelaideX)", title: "Introduction to Project Management", url: "https://www.edx.org/learn/project-management/university-of-adelaide-introduction-to-project-management" },
    ],
  },
  {
    number: "04",
    title: "Digital Marketing Core",
    months: "Months 4–5",
    goal: "Build a solid foundation in digital and content marketing with industry-recognized certifications.",
    courses: [
      { platform: "HubSpot", title: "Social Media Marketing Certification", url: "https://academy.hubspot.com/certification-overview" },
      { platform: "HubSpot", title: "Digital Marketing Certification", url: "https://academy.hubspot.com/certification-overview" },
      { platform: "HubSpot", title: "Content Marketing Certification", url: "https://academy.hubspot.com/certification-overview" },
      { platform: "Simplilearn", title: "Digital Marketing Strategy", url: "https://www.simplilearn.com/free-digital-marketing-strategy-training-course-skillup" },
    ],
  },
  {
    number: "05",
    title: "Advanced Marketing + AI",
    months: "Months 5–6",
    goal: "Leverage AI tools and advanced strategies to become a modern, data-driven marketer.",
    courses: [
      { platform: "Simplilearn", title: "ChatGPT for Digital Marketing", url: "https://www.simplilearn.com/free-chatgpt-for-digital-marketing-course-skillup" },
      { platform: "Simplilearn", title: "Introduction to Content Marketing", url: "https://www.simplilearn.com/free-content-marketing-training-course-skillup" },
      { platform: "Semrush", title: "Become an AI-Powered Marketer", url: "https://www.semrush.com/academy/courses/ai-for-marketing-course/" },
      { platform: "Santander", title: "Digital Marketing", url: "https://app.santanderopenacademy.com/en/course/digital-marketing" },
      { platform: "Santander", title: "Digital Advertising: Data, AI and Legal Compliance", url: "https://app.santanderopenacademy.com/en/course/digital-advertising-data-ai-legal-compliance" },
    ],
  },
  {
    number: "06",
    title: "Communication + Leadership",
    months: "Months 6–7",
    goal: "Develop professional communication, critical thinking, and leadership capabilities.",
    courses: [
      { platform: "Santander", title: "Effective Communication", url: "https://app.santanderopenacademy.com/en/course/effective-communication" },
      { platform: "Santander", title: "Critical Thinking & Problem Solving", url: "https://app.santanderopenacademy.com/en/course/critical-thinking-problem-solving" },
      { platform: "Santander", title: "Strategic Communication & Teamwork", url: "https://app.santanderopenacademy.com/en/course/strategic-communication-teamwork" },
      { platform: "Santander", title: "Leadership", url: "https://app.santanderopenacademy.com/en/course/leadership" },
      { platform: "Edraak", title: "Introduction to Entrepreneurship", url: "https://www.edraak.org/en/programs/course/introtoentrepreneurship-v1/" },
    ],
  },
  {
    number: "07",
    title: "Professional English",
    months: "Month 7",
    goal: "Elevate English proficiency for professional presentations, writing, and leadership communication.",
    courses: [
      { platform: "Santander", title: "Elevating Your English: Crafting Engaging Presentations", url: "https://app.santanderopenacademy.com/en/course/elevating-your-english-crafting-engaging-presentations" },
      { platform: "Santander", title: "Elevating Your English: Communicating as a Leader", url: "https://app.santanderopenacademy.com/en/course/elevating-your-english-communicating-as-a-leader" },
      { platform: "edX (BerkeleyX)", title: "How to Write an Essay", url: "https://www.edx.org/learn/professional-writing/university-of-california-berkeley-how-to-write-an-essay" },
    ],
  },
  {
    number: "08",
    title: "Certification + Professional Portfolio",
    months: "Month 8",
    goal: "Complete advanced certifications and build a professional portfolio for career readiness.",
    courses: [
      { platform: "Santander", title: "Excel – Intermediate to Advanced", url: "https://app.santanderopenacademy.com/en/course/excel-course-intermediate-to-advanced" },
      { platform: "Santander", title: "Project Management & Agile Fundamentals", url: "https://app.santanderopenacademy.com/en/course/project-management-agile-fundamentals" },
      { platform: "Meta", title: "100-101 Meta Certified Digital Marketing Associate", url: "https://www.facebookblueprint.com/student/collection/238354" },
    ],
  },
];

const CourseCard = ({ course }: { course: Course }) => (
  <div
    className="p-6 transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]"
    style={{ background: 'var(--axt-carbon)', border: '1px solid var(--axt-ghost-border)' }}
  >
    <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-3" style={{ color: 'var(--axt-gold)' }}>
      {course.platform}
    </span>
    <h4 className="font-display text-xl tracking-wider mb-4" style={{ color: 'var(--axt-ivory)' }}>
      {course.title}
    </h4>
    <a
      href={course.url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-axt btn-axt-ghost inline-flex items-center gap-2 !py-2 !px-6"
    >
      <span>Free · Start Course</span>
      <ExternalLink size={12} />
    </a>
  </div>
);

const PhaseSection = ({ phase, index }: { phase: Phase; index: number }) => {
  const bgColor = index % 2 === 0 ? 'var(--axt-void)' : 'var(--axt-obsidian)';
  const sectionRef = useReveal();

  return (
    <section ref={sectionRef} className="px-6 md:px-12 py-20 md:py-28" style={{ background: bgColor }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12 reveal-target">
          <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
            Phase {phase.number} · {phase.months}
          </span>
          <h2 className="font-display text-4xl md:text-5xl tracking-wider mb-4" style={{ color: 'var(--axt-ivory)' }}>
            {phase.title}
          </h2>
          <p className="font-mono text-sm max-w-2xl" style={{ color: 'var(--axt-text-dim)' }}>
            {phase.goal}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] reveal-target"
          style={{ background: 'var(--axt-ghost-border)' }}>
          {phase.courses.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

const HannaPath = () => {
  const { session, loading } = useAuth();
  const heroRef = useReveal();

  if (loading) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center" style={{ background: 'var(--axt-void)' }}>
          <p className="font-mono text-sm" style={{ color: 'var(--axt-text-dim)' }}>Loading...</p>
        </section>
      </Layout>
    );
  }

  if (!session) return <Navigate to="/hub" replace />;

  const totalCourses = phases.reduce((sum, p) => sum + p.courses.length, 0);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="px-6 md:px-12 pt-24 pb-16 md:pt-32 md:pb-24" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label="AXT Fellowship · Learning Path" />
          </div>

          <div className="reveal-target">
            <h1 className="font-display text-6xl md:text-8xl tracking-wider mb-6" style={{ color: 'var(--axt-ivory)' }}>
              Your Journey Starts Here,{" "}
              <span style={{ color: 'var(--axt-gold-bright)' }}>Hanna</span>.
            </h1>
            <p className="font-editorial text-xl md:text-2xl max-w-2xl" style={{ color: 'var(--axt-text-dim)' }}>
              A curated 8-month path from foundations to professional certification — entirely free.
            </p>
          </div>

          {/* Stats Bar */}
          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-[2px] reveal-target"
            style={{ background: 'var(--axt-ghost-border)' }}
          >
            {[
              { value: "8", label: "Phases" },
              { value: `${totalCourses}`, label: "Courses" },
              { value: "8", label: "Months" },
              { value: "£0", label: "Total Cost" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 md:p-8 text-center" style={{ background: 'var(--axt-carbon)' }}>
                <span className="font-display text-4xl md:text-5xl block mb-2" style={{ color: 'var(--axt-gold-bright)' }}>
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: 'var(--axt-text-faint)' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases */}
      {phases.map((phase, index) => (
        <PhaseSection key={phase.number} phase={phase} index={index} />
      ))}

      {/* Back to Hub */}
      <section className="px-6 md:px-12 py-20 text-center" style={{ background: 'var(--axt-void)' }}>
        <Link to="/hub" className="btn-axt btn-axt-ghost">
          ← Back to Hub
        </Link>
      </section>
    </Layout>
  );
};

export default HannaPath;
