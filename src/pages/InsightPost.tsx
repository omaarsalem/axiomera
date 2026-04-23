import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import useReveal from "@/hooks/useReveal";
import { supabase } from "@/integrations/supabase/client";

interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  author_name: string;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

const InsightPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const heroRef = useReveal();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("blog_posts")
      .select("id,title,excerpt,content,author_name,cover_image_url,published_at,created_at")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) setNotFound(true);
        else setPost(data as Post);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex items-center justify-center" style={{ background: "var(--axt-void)" }}>
          <p className="font-mono text-xs" style={{ color: "var(--axt-text-dim)" }}>Loading article…</p>
        </section>
      </Layout>
    );
  }

  if (notFound || !post) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center" style={{ background: "var(--axt-void)" }}>
          <h1 className="font-display text-5xl mb-4" style={{ color: "var(--axt-ivory)" }}>Article Not Found.</h1>
          <Link to="/insights" className="btn-axt btn-axt-ghost mt-6">← Back to Insights</Link>
        </section>
      </Layout>
    );
  }

  const date = new Date(post.published_at || post.created_at).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <Layout>
      <article>
        <section ref={heroRef} className="px-6 md:px-12 py-[120px] md:py-[160px]" style={{ background: "var(--axt-void)" }}>
          <div className="max-w-3xl mx-auto">
            <Link to="/insights" className="reveal-target font-mono text-[9px] uppercase tracking-[0.5em] inline-block mb-8" style={{ color: "var(--axt-gold)" }}>
              ← Insights
            </Link>
            <h1 className="reveal-target font-display text-5xl md:text-7xl leading-none mb-6" style={{ color: "var(--axt-ivory)" }}>
              {post.title}
            </h1>
            <p className="reveal-target font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--axt-text-faint)" }}>
              {post.author_name} · {date}
            </p>
          </div>
        </section>

        {post.cover_image_url && (
          <section className="px-6 md:px-12" style={{ background: "var(--axt-void)" }}>
            <div className="max-w-4xl mx-auto">
              <img src={post.cover_image_url} alt={post.title} className="w-full h-auto" loading="lazy" />
            </div>
          </section>
        )}

        <section className="px-6 md:px-12 py-[80px] md:py-[120px]" style={{ background: "var(--axt-obsidian)" }}>
          <div
            className="max-w-3xl mx-auto prose prose-invert font-mono text-sm leading-relaxed axt-article"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ color: "var(--axt-text-dim)" }}
          />
        </section>

        <section className="px-6 md:px-12 py-[80px]" style={{ background: "var(--axt-carbon)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <Link to="/contact" className="btn-axt btn-axt-gold inline-block">Talk to Our Team</Link>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default InsightPost;
