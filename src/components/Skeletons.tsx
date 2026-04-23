/**
 * AXT-themed skeleton primitives. Sharp corners, divider tone, subtle pulse.
 */
const bar = (w: string, h = "h-3") => (
  <div
    className={`${h} ${w} animate-pulse`}
    style={{ background: "var(--axt-divider)" }}
  />
);

export const SkeletonLine = ({ width = "w-full", height = "h-3" }: { width?: string; height?: string }) =>
  bar(width, height);

export const SkeletonCard = () => (
  <div className="p-8 md:p-12 space-y-4" style={{ background: "var(--axt-obsidian)" }}>
    <div className="h-3 w-24 animate-pulse" style={{ background: "var(--axt-divider)" }} />
    <div className="h-6 w-3/4 animate-pulse" style={{ background: "var(--axt-divider)" }} />
    <div className="h-3 w-full animate-pulse" style={{ background: "var(--axt-divider)" }} />
    <div className="h-3 w-2/3 animate-pulse" style={{ background: "var(--axt-divider)" }} />
  </div>
);

export const SkeletonGrid = ({ count = 3, cols = 3 }: { count?: number; cols?: 2 | 3 }) => (
  <div
    className={`grid grid-cols-1 ${cols === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"} gap-[2px]`}
    style={{ background: "var(--axt-ghost-border)" }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const SkeletonPathRow = () => (
  <div className="p-6 space-y-3" style={{ background: "var(--axt-carbon)" }}>
    <div className="h-3 w-32 animate-pulse" style={{ background: "var(--axt-divider)" }} />
    <div className="h-5 w-2/3 animate-pulse" style={{ background: "var(--axt-divider)" }} />
    <div className="h-2 w-full animate-pulse" style={{ background: "var(--axt-divider)" }} />
  </div>
);
