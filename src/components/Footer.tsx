import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{ background: 'var(--axt-void)', borderTop: '1px solid var(--axt-divider)' }}>
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <span className="font-display text-3xl tracking-wider" style={{ color: 'var(--axt-gold)' }}>AXT</span>
          <p className="font-editorial text-lg mt-4" style={{ color: 'var(--axt-text-dim)' }}>
            Precision-built infrastructure.<br />Institutional-grade security.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
            Navigation
          </span>
          {[
            { label: "Home", path: "/" },
            { label: "Services", path: "/services" },
            { label: "Fellowship", path: "/fellowship" },
            { label: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block font-mono text-xs mb-2 transition-colors hover:text-axt-gold"
              style={{ color: 'var(--axt-text-dim)' }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Offices */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
            Offices
          </span>
          {["Cairo, Egypt", "Leeds, United Kingdom", "London, United Kingdom"].map((loc) => (
            <p key={loc} className="font-mono text-xs mb-2" style={{ color: 'var(--axt-text-dim)' }}>
              {loc}
            </p>
          ))}
        </div>
      </div>

      <div className="axt-divider mt-12 mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="font-mono text-[10px]" style={{ color: 'var(--axt-text-faint)' }}>
          © {new Date().getFullYear()} Axiomera Technologies Ltd. All rights reserved.
        </p>
        <p className="font-mono text-[10px]" style={{ color: 'var(--axt-text-faint)' }}>
          AXT-REF-2026
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
