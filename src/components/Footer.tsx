import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocalePath } from "@/i18n/LanguageProvider";

const Footer = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();

  return (
    <footer style={{ background: 'var(--axt-void)', borderTop: '1px solid var(--axt-divider)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-display text-3xl tracking-wider" style={{ color: 'var(--axt-gold)' }}>{t("common.brand")}</span>
            <p className="font-editorial text-lg mt-4" style={{ color: 'var(--axt-text-dim)' }}>
              "{t("footer.tagline")}"
            </p>
            <p className="font-mono text-xs mt-4 leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
              {t("common.brand_full")} — IT Infrastructure, Cybersecurity, and Governance. Cairo · Leeds · London.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
              {t("footer.services")}
            </span>
            {[
              { label: "AXT Infrastructure", path: "/services" },
              { label: "AXT Cyber", path: "/services" },
              { label: "AXT Governance", path: "/services" },
            ].map((item) => (
              <Link key={item.label} to={lp(item.path)} className="block font-mono text-xs mb-2 transition-colors hover:text-axt-gold" style={{ color: 'var(--axt-text-dim)' }}>
                {item.label}
              </Link>
            ))}

            <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4 mt-8" style={{ color: 'var(--axt-gold)' }}>
              {t("footer.company")}
            </span>
            {[
              { label: t("nav.about"), path: "/about" },
              { label: t("nav.work"), path: "/work" },
              { label: t("nav.insights"), path: "/insights" },
              { label: t("nav.fellowship"), path: "/fellowship" },
              { label: "Careers", path: "/careers" },
              { label: "FAQ", path: "/faq" },
              { label: t("footer.contact"), path: "/contact" },
            ].map((item) => (
              <Link key={item.label} to={lp(item.path)} className="block font-mono text-xs mb-2 transition-colors hover:text-axt-gold" style={{ color: 'var(--axt-text-dim)' }}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Markets */}
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
              Markets
            </span>
            {["Cairo, Egypt", "Leeds, UK", "London, UK"].map((loc) => (
              <p key={loc} className="font-mono text-xs mb-2" style={{ color: 'var(--axt-text-dim)' }}>{loc}</p>
            ))}

            <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4 mt-8" style={{ color: 'var(--axt-gold)' }}>
              {t("footer.contact")}
            </span>
            <p className="font-mono text-xs mb-2" style={{ color: 'var(--axt-text-dim)' }}>hello@axiomera.technology</p>
            <Link to={lp("/contact?service=security-check")} className="block font-mono text-[10px] uppercase tracking-[0.3em] mt-3 transition-colors" style={{ color: 'var(--axt-gold)' }}>
              Free 15-Min Security Check →
            </Link>
          </div>
        </div>

        <div className="axt-divider mt-12 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-[10px]" style={{ color: 'var(--axt-text-faint)' }}>
            © {new Date().getFullYear()} {t("common.brand_full")} · {t("footer.rights")}
          </p>
          <p className="font-editorial text-[10px]" style={{ color: 'var(--axt-text-faint)' }}>
            "Where decisions end."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
