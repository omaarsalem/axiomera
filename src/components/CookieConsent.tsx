import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("axt-cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("axt-cookie-consent", "accepted");
    setShow(false);
  };

  const dismiss = () => {
    localStorage.setItem("axt-cookie-consent", "dismissed");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9997] px-6 py-4"
      style={{ background: 'var(--axt-carbon)', borderTop: '1px solid var(--axt-divider)' }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono text-[10px] leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
          This site uses essential cookies to ensure functionality. No tracking or marketing cookies are used.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={dismiss} className="btn-axt btn-axt-ghost !py-2 !px-6 !text-[9px]">
            Dismiss
          </button>
          <button onClick={accept} className="btn-axt btn-axt-gold !py-2 !px-6 !text-[9px]">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
