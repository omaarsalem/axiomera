import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <Seo title="Page not found (404)" description="The page you requested does not exist." path={location.pathname} noIndex />
      <section
        className="min-h-[80vh] flex items-center justify-center px-6 md:px-12"
        style={{ background: 'var(--axt-void)' }}
      >
        <div className="text-center">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-6"
            style={{ color: 'var(--axt-gold)' }}
          >
            Error
          </span>
          <h1 className="font-display text-8xl md:text-[12rem] leading-none mb-4" style={{ color: 'var(--axt-gold)' }}>
            404
          </h1>
          <p className="font-mono text-sm mb-8" style={{ color: 'var(--axt-text-dim)' }}>
            This route does not exist.
          </p>
          <Link to="/" className="btn-axt btn-axt-ghost">
            Return to Home
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
