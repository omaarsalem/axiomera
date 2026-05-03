import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useLocalePath } from "@/i18n/LanguageProvider";
import LanguageToggle from "./LanguageToggle";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { session } = useAuth();
  const { t } = useTranslation();
  const lp = useLocalePath();

  const navItems = [
    { label: t("nav.services"), path: "/services" },
    { label: t("nav.work"), path: "/work" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.fellowship"), path: "/fellowship" },
    { label: t("nav.insights"), path: "/insights" },
    { label: t("nav.testimonials"), path: "/testimonials" },
  ];

  useEffect(() => {
    if (location.hash === "#about") {
      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  const isActive = (target: string) => {
    const stripped = location.pathname.replace(/^\/(ar|en)(?=\/|$)/, "") || "/";
    return stripped === target;
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9998] backdrop-blur-md"
      style={{ background: 'rgba(6,6,10,0.85)', borderBottom: '1px solid var(--axt-divider)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <Link to={lp("/")} className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wider" style={{ color: 'var(--axt-gold)' }}>{t("common.brand")}</span>
          <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.4em]" style={{ color: 'var(--axt-text-dim)' }}>
            {t("common.brand_full")}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={lp(item.path)}
              className="font-mono text-[10px] uppercase tracking-[0.35em] transition-colors duration-200"
              style={{
                color: isActive(item.path) ? 'var(--axt-gold)' : 'var(--axt-text-dim)',
              }}
            >
              {item.label}
            </Link>
          ))}
          {session && (
            <Link
              to={lp("/hub")}
              className="font-mono text-[10px] uppercase tracking-[0.35em] transition-colors duration-200"
              style={{
                color: location.pathname.includes('/hub') ? 'var(--axt-gold)' : 'var(--axt-text-dim)',
              }}
            >
              {t("nav.hub")}
            </Link>
          )}
          <LanguageToggle />
          <Link to={lp("/contact")} className="btn-axt btn-axt-gold !py-3 !px-8">{t("common.cta_brief")}</Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t("nav.menu")}
        >
          <span className="block w-5 h-px" style={{ background: 'var(--axt-ivory)' }} />
          <span className="block w-5 h-px" style={{ background: 'var(--axt-ivory)' }} />
          <span className="block w-3 h-px" style={{ background: 'var(--axt-gold)' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: 'var(--axt-void)' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={lp(item.path)}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-[11px] uppercase tracking-[0.35em] py-2 transition-colors"
              style={{
                color: isActive(item.path) ? 'var(--axt-gold)' : 'var(--axt-text-dim)',
                borderBottom: '1px solid var(--axt-divider)',
              }}
            >
              {item.label}
            </Link>
          ))}
          {session && (
            <Link
              to={lp("/hub")}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-[11px] uppercase tracking-[0.35em] py-2 transition-colors"
              style={{
                color: location.pathname.includes('/hub') ? 'var(--axt-gold)' : 'var(--axt-text-dim)',
                borderBottom: '1px solid var(--axt-divider)',
              }}
            >
              {t("nav.hub")}
            </Link>
          )}
          <div className="py-2"><LanguageToggle /></div>
          <Link to={lp("/contact")} onClick={() => setMobileOpen(false)} className="btn-axt btn-axt-gold text-center mt-2">
            {t("common.cta_brief")}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
