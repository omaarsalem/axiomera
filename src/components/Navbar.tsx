import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Services", path: "/services" },
  { label: "About", path: "/#about" },
  { label: "Fellowship", path: "/fellowship" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9998] backdrop-blur-md"
      style={{ background: 'rgba(6,6,10,0.85)', borderBottom: '1px solid var(--axt-divider)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wider" style={{ color: 'var(--axt-gold)' }}>
            AXT
          </span>
          <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.4em]" style={{ color: 'var(--axt-text-dim)' }}>
            Axiomera Technologies
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-mono text-[10px] uppercase tracking-[0.35em] transition-colors duration-200"
              style={{
                color: location.pathname === item.path ? 'var(--axt-gold)' : 'var(--axt-text-dim)',
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-axt btn-axt-gold !py-3 !px-8">
            Brief Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
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
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-[11px] uppercase tracking-[0.35em] py-2 transition-colors"
              style={{
                color: location.pathname === item.path ? 'var(--axt-gold)' : 'var(--axt-text-dim)',
                borderBottom: '1px solid var(--axt-divider)',
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn-axt btn-axt-gold text-center mt-2"
          >
            Brief Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
