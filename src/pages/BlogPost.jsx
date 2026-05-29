import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { loadPost } from "../utils/posts";

const DARK  = { bg: "#000000", surface: "#0a0a0a", border: "#1a2235", text: "rgba(241,237,230,0.92)", muted: "rgba(180,175,165,0.65)", accent: "#e8a45a", code: "#1a2235" };
const LIGHT = { bg: "#ffffff", surface: "#ffffff",  border: "#e0dbd0", text: "#1c1a17",               muted: "#6b6560",               accent: "#c27a2a", code: "#eae6df" };

export default function BlogPost() {
  const { slug }          = useParams();
  const navigate          = useNavigate();
  const [post, setPost]   = useState(null);
  const [error, setError] = useState(false);
  const [dark, setDark]   = useState(() => localStorage.getItem("theme") !== "light");
  const t = dark ? DARK : LIGHT;

  useEffect(() => {
    setError(false);
    loadPost(slug)
      .then(setPost)
      .catch(() => {
        setPost(null);
        setError(true);
      });
  }, [slug]);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.body.style.backgroundColor = t.bg;
  }, [dark, t.bg]);

  if (!post && !error) return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.muted, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
      loading…
    </div>
  );

  if (!post && error) return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Post not found</div>
        <button
          onClick={() => navigate("/blog")}
          style={{
            background: "none",
            border: `1px solid ${t.border}`,
            color: t.text,
            padding: "8px 14px",
            borderRadius: 999,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Back to blog
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: t.bg, color: t.text,
      fontFamily: "'Inter', sans-serif", transition: "background 0.4s, color 0.4s",
      position: "relative",
    }}>

      {/* ── Theme toggle (top-right) ─────────────────────────────── */}
      <button
        aria-label="Toggle theme"
        onClick={() => setDark(d => !d)}
        style={{
          position: "fixed",
          top: 24,
          right: 28,
          zIndex: 20,
          width: 64,
          height: 32,
          borderRadius: 999,
          border: `1px solid ${dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"}`,
          background: dark ? "#111" : "#eee",
          cursor: "pointer",
          padding: 3,
          transition: "all 0.25s ease",
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: dark ? "#fff" : "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: dark ? "translateX(0)" : "translateX(30px)",
            transition: "transform 0.25s ease",
            color: dark ? "#000" : "#fff",
          }}
        >
          {dark ? <Moon size={14} /> : <Sun size={14} />}
        </span>
      </button>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "220px 24px 100px" }}>

        {/* Back button placed above the post title */}
        <div style={{ position: 'absolute', left: 24, top: 160 }}>
          <button
            onClick={() => navigate("/blog")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "none", border: "none", cursor: "pointer",
              color: t.muted, fontSize: 13, fontFamily: "Inter, sans-serif",
              padding: 0, transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = t.text}
            onMouseLeave={e => e.currentTarget.style.color = t.muted}
          >
            <ArrowLeft size={15} /> back to blog
          </button>
        </div>

        {/* Post header */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{
            fontFamily: "'Lora', serif",
            fontStyle: "normal", fontWeight: 600,
            fontSize: "clamp(20px, 4.5vw, 40px)",
            lineHeight: 1.2, letterSpacing: "-0.01em", margin: "0 0 12px",
            color: dark ? "#f1ede6" : "#1c1a17",
          }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: t.muted }}>
            <span>{post.date}</span>
            {post.readTime && <span>· {post.readTime} min read</span>}
          </div>
        </div>

        {/* Markdown content */}
        {/* All styles for rendered markdown are in the <style> block below */}
        <div className="prose">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>

      <style>{`
        /* ── Markdown prose styles ─────────────────────────────────
           Edit these to change how your post content looks          */
        .prose { font-size: 16px; line-height: 1.85; color: ${t.text}; }

        .prose p   { margin: 0 0 20px; }
        .prose h1,
        .prose h2,
        .prose h3  { font-family: 'Lora', serif; font-style: normal;
               font-weight: 600; color: ${dark ? "#f1ede6" : "#1c1a17"};
               margin: 40px 0 16px; line-height: 1.2; }
        .prose h1  { font-size: 36px; }
        .prose h2  { font-size: 28px; }
        .prose h3  { font-size: 22px; }

        .prose a   { color: ${t.accent}; text-underline-offset: 4px; }
        .prose a:hover { opacity: 0.75; }

        .prose code {
          background: ${t.code}; padding: 2px 7px; border-radius: 4px;
          font-size: 13px; font-family: 'DM Mono', monospace;
          color: ${dark ? "#e8c97a" : "#9a3e00"};
        }

        .prose pre  {
          background: ${t.code}; border: 1px solid ${t.border};
          border-radius: 8px; padding: 20px 24px; overflow-x: auto;
          margin: 24px 0;
        }
        .prose pre code { background: none; padding: 0; color: ${dark ? "#c9d1e0" : "#2a2825"}; font-size: 13.5px; }

        .prose blockquote {
          border-left: 2px solid ${t.accent}; margin: 24px 0;
          padding: 4px 0 4px 20px; color: ${t.muted};
          font-style: italic;
        }

        .prose ul, .prose ol { padding-left: 24px; margin: 0 0 20px; }
        .prose li  { margin-bottom: 6px; }

        .prose hr  { border: none; border-top: 1px solid ${t.border}; margin: 40px 0; }

        .prose img { max-width: 100%; border-radius: 8px; margin: 24px 0; }

        .prose strong { font-weight: 700; color: ${dark ? "#f1ede6" : "#1c1a17"}; }
      `}</style>
    </div>
  );
}