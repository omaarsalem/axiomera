import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-[9998] p-3 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: 'var(--axt-gold)',
        color: 'var(--axt-void)',
        border: 'none',
        borderRadius: 0,
      }}
      aria-label="Back to top"
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default BackToTop;
