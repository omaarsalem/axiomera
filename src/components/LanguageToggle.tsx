import { useLang, useSwitchLang } from "@/i18n/LanguageProvider";

const LanguageToggle = () => {
  const lang = useLang();
  const switchTo = useSwitchLang();

  const Btn = ({ value, label }: { value: "en" | "ar"; label: string }) => (
    <button
      onClick={() => switchTo(value)}
      aria-pressed={lang === value}
      className="font-mono text-[10px] uppercase tracking-[0.35em] transition-colors duration-200 px-1"
      style={{ color: lang === value ? "var(--axt-gold)" : "var(--axt-text-faint)" }}
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center gap-2" aria-label="Language">
      <Btn value="en" label="EN" />
      <span style={{ color: "var(--axt-text-faint)" }}>·</span>
      <Btn value="ar" label="ع" />
    </div>
  );
};

export default LanguageToggle;
