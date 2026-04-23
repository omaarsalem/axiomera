import { Helmet } from "react-helmet-async";

interface Props {
  title: string;            // page title (will be suffixed with brand)
  description: string;      // <160 chars
  path: string;             // e.g. "/services"
  image?: string;           // absolute URL
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

const SITE = "https://axt.tech";
const BRAND = "AXT — Axiomera Technologies";

/**
 * Per-page SEO head: title, meta description, canonical, OG/Twitter, JSON-LD.
 * Uses react-helmet-async; HelmetProvider wraps the app in main.tsx.
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
  const fullTitle = title.includes(BRAND) ? title : `${title} | ${BRAND}`;
  const url = `${SITE}${path}`;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={BRAND} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
