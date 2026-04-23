import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Soft cross-fade between routes. Keeps existing scroll-reveal animations
 * intact (those run inside the page); this only adds a brief opacity wash
 * on route changes so navigation feels less jarring.
 */
const RouteTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [stage, setStage] = useState<"in" | "out">("in");
  const [displayed, setDisplayed] = useState(children);
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname === key) return;
    setStage("out");
    const t = setTimeout(() => {
      setDisplayed(children);
      setKey(location.pathname);
      setStage("in");
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, 180);
    return () => clearTimeout(t);
  }, [location.pathname, children, key]);

  // Keep the displayed children in sync when the same route re-renders
  useEffect(() => {
    if (location.pathname === key) setDisplayed(children);
  }, [children, location.pathname, key]);

  return (
    <div
      style={{
        opacity: stage === "in" ? 1 : 0,
        transition: "opacity 220ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {displayed}
    </div>
  );
};

export default RouteTransition;
