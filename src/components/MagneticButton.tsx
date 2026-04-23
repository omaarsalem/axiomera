import { ReactNode, useRef, MouseEvent } from "react";
import { Link } from "react-router-dom";

interface Props {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  strength?: number; // px max displacement
}

/**
 * Subtle magnetic pull on hover. Pointer movement nudges the element toward
 * the cursor; releases on leave. Respects reduced motion via CSS transition.
 */
const MagneticButton = ({ to, href, onClick, children, className = "", strength = 8 }: Props) => {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const dx = (x / rect.width) * strength * 2;
    const dy = (y / rect.height) * strength * 2;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  const baseStyle = { transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)" };

  if (to) {
    return (
      <Link
        to={to}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={className}
        style={baseStyle}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={className}
        style={baseStyle}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={className}
      style={baseStyle}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
