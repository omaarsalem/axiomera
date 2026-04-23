import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;            // raw value (e.g. "3", "100%", "∞", "24")
  duration?: number;        // ms
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Counts numeric values up from 0 once they enter the viewport. Non-numeric
 * values (e.g. "∞") render statically. Preserves any prefix/suffix around
 * the numeric portion (e.g. "100%", "£0", "v2").
 */
const AnimatedCounter = ({ value, duration = 1200, className, style }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const startedRef = useRef(false);

  // Parse "100%" → prefix "", num 100, suffix "%"
  const match = value.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  const isNumeric = !!match;

  useEffect(() => {
    if (!isNumeric) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match![2]);
    const prefix = match![1];
    const suffix = match![3];
    setDisplay(`${prefix}0${suffix}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const current = target * eased;
              const formatted = Number.isInteger(target)
                ? Math.round(current).toString()
                : current.toFixed(1);
              setDisplay(`${prefix}${formatted}${suffix}`);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, isNumeric, match]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
};

export default AnimatedCounter;
