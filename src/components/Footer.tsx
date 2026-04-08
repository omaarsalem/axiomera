import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{ background: 'var(--axt-void)', borderTop: '1px solid var(--axt-divider)' }}>
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <span className="font-display text-3xl tracking-wider" style={{ color: 'var(--axt-gold)' }}>AXT</span>
          <p className="font-editorial text-lg mt-4" style={{ color: 'var(--axt-text-dim)' }}>
            "Built to be your only call."
          </p>
          <p className="font-mono text-xs mt-4 leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
            Axiomera Technologies — IT Infrastructure, Cybersecurity, and Governance. Cairo-based, UK-educated, internationally minded.
          </p>
        </div>

        {/* Services */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
            Services
          </span>
          {[
            { label: "AXT Infrastructure", path: "/services" },
            { label: "AXT Cyber", path: "/services" },
            { label: "AXT Governance", path: "/services" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="block font-mono text-xs mb-2 transition-colors hover:text-axt-gold"
              style={{ color: 'var(--axt-text-dim)' }}
            >
              {item.label}
            </Link>
          ))}

          <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4 mt-8" style={{ color: 'var(--axt-gold)' }}>
            Company
          </span>
          {[
            { label: "About AXT", path: "/#about" },
            { label: "Fellowship", path: "/fellowship" },
            { label: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="block font-mono text-xs mb-2 transition-colors hover:text-axt-gold"
              style={{ color: 'var(--axt-text-dim)' }}
            >
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
            <p key={loc} className="font-mono text-xs mb-2" style={{ color: 'var(--axt-text-dim)' }}>
              {loc}
            </p>
          ))}
        </div>
      </div>

      <div className="axt-divider mt-12 mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="font-mono text-[10px]" style={{ color: 'var(--axt-text-faint)' }}>
          © {new Date().getFullYear()} Axiomera Technologies · All Rights Reserved
        </p>
        <p className="font-editorial text-[10px]" style={{ color: 'var(--axt-text-faint)' }}>
          "Where decisions end."
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
