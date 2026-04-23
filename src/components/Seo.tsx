import { useEffect } from "react";

interface Props {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

const SITE = "https://axt.tech";
const BRAND = "AXT — Axiomera Technologies";
const MANAGED_ATTR = "data-seo-managed";

const setMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(MANAGED_ATTR, "");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"][${MANAGED_ATTR}]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    el.setAttribute(MANAGED_ATTR, "");
    document.head.appendChild(el);
  }
  el.href = href;
};

/**
 * Per-page SEO head manager. Imperatively syncs <title>, meta, canonical,
 * OG/Twitter, and JSON-LD. No provider needed; no extra React copies.
 */
const Seo = ({
  title,
  description,
  path,
  image = `${SITE}/og-image.jpg`,
  type = "website",
  jsonLd,
  noIndex = false,
}: Props) => {
  useEffect(() => {
    const fullTitle = title.includes(BRAND) ? title : `${title} | ${BRAND}`;
    const url = `${SITE}${path}`;
    document.title = fullTitle;

    setMeta(`meta[name="description"]`, { name: "description", content: description });
    setLink("canonical", url);

    // Robots
    const robots = document.head.querySelector<HTMLMetaElement>(`meta[name="robots"][${MANAGED_ATTR}]`);
    if (noIndex) {
      setMeta(`meta[name="robots"][${MANAGED_ATTR}]`, { name: "robots", content: "noindex, nofollow" });
    } else if (robots) {
      robots.remove();
    }

    setMeta(`meta[property="og:type"]`, { property: "og:type", content: type });
    setMeta(`meta[property="og:title"]`, { property: "og:title", content: fullTitle });
    setMeta(`meta[property="og:description"]`, { property: "og:description", content: description });
    setMeta(`meta[property="og:url"]`, { property: "og:url", content: url });
    setMeta(`meta[property="og:image"]`, { property: "og:image", content: image });
    setMeta(`meta[property="og:site_name"]`, { property: "og:site_name", content: BRAND });

    setMeta(`meta[name="twitter:card"]`, { name: "twitter:card", content: "summary_large_image" });
    setMeta(`meta[name="twitter:title"]`, { name: "twitter:title", content: fullTitle });
    setMeta(`meta[name="twitter:description"]`, { name: "twitter:description", content: description });
    setMeta(`meta[name="twitter:image"]`, { name: "twitter:image", content: image });

    // JSON-LD: clear managed scripts and re-add
    document.head.querySelectorAll(`script[type="application/ld+json"][${MANAGED_ATTR}]`).forEach((n) => n.remove());
    if (jsonLd) {
      const arr = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      arr.forEach((ld) => {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.setAttribute(MANAGED_ATTR, "");
        s.text = JSON.stringify(ld);
        document.head.appendChild(s);
      });
    }
  }, [title, description, path, image, type, noIndex, jsonLd]);

  return null;
};

export default Seo;
