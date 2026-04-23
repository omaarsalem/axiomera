import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import NewsletterSignup from "@/components/NewsletterSignup";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author_name: string;
  published_at: string | null;
  created_at: string;
}

const Insights = () => {
  const heroRef = useReveal();
  const gridRef = useReveal();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, author_name, published_at, created_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <Seo
        title="Insights — Field notes from AXT"
        description="Practitioner-grade analysis on cybersecurity, governance, and IT infrastructure from the AXT team."
        path="/insights"
      />
      {/* Hero */}
      <section ref={heroRef} className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <span className="reveal-target font-mono text-[9px] uppercase tracking-[0.5em] block mb-6" style={{ color: 'var(--axt-gold)' }}>
            Insights
          </span>
          <h1 className="reveal-target font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
            Thinking<br />
            <span style={{ color: 'var(--axt-gold)' }}>Out Loud.</span>
          </h1>
          <p className="reveal-target font-editorial text-xl md:text-2xl max-w-2xl" style={{ color: 'var(--axt-text-dim)', lineHeight: '1.5' }}>
            Advisories, analysis, and perspectives from the AXT team — on cybersecurity, governance, and the evolving IT landscape.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section ref={gridRef} className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-obsidian)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal-target">
            <SectionLabel number="01" label="Latest Articles" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]" style={{ background: 'var(--axt-ghost-border)' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-8 md:p-12" style={{ background: 'var(--axt-obsidian)' }}>
                  <div className="h-3 w-24 mb-6 animate-pulse" style={{ background: 'var(--axt-divider)' }} />
                  <div className="h-6 w-full mb-4 animate-pulse" style={{ background: 'var(--axt-divider)' }} />
                  <div className="h-3 w-3/4 mb-2 animate-pulse" style={{ background: 'var(--axt-divider)' }} />
                  <div className="h-3 w-1/2 animate-pulse" style={{ background: 'var(--axt-divider)' }} />
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]" style={{ background: 'var(--axt-ghost-border)' }}>
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/insights/${post.slug}`}
                  className="block p-8 md:p-12 transition-colors duration-300 hover:bg-[var(--axt-gold-subtle)]"
                  style={{ background: 'var(--axt-obsidian)' }}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-4" style={{ color: 'var(--axt-gold)' }}>
                    {post.author_name} · {new Date(post.published_at || post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl tracking-wider mb-4" style={{ color: 'var(--axt-ivory)' }}>
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--axt-text-dim)' }}>
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="reveal-target text-center py-24" style={{ border: '1px solid var(--axt-divider)' }}>
              <h3 className="font-display text-3xl mb-4" style={{ color: 'var(--axt-ivory)' }}>
                Coming Soon.
              </h3>
              <p className="font-mono text-xs" style={{ color: 'var(--axt-text-dim)' }}>
                Our first articles are being written. Check back soon for cybersecurity advisories, governance insights, and IT strategy thinking.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-void)' }}>
        <div className="max-w-[1400px] mx-auto">
          <NewsletterSignup source="insights" />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: 'var(--axt-carbon)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            Need Expert<br /><span style={{ color: 'var(--axt-gold)' }}>Advice?</span>
          </h2>
          <p className="font-editorial text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--axt-text-dim)' }}>
            Articles are a start — but every situation is unique. Talk to our team directly.
          </p>
          <Link to="/contact" className="btn-axt btn-axt-gold inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Insights;
