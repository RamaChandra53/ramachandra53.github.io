import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { loadAllPosts } from "../utils/posts";

// ── Theme (matches PersonalWebsite.jsx) ──────────────────────
const DARK  = { bg: "#000000", surface: "#0a0a0a", border: "#1a2235", text: "rgba(241,237,230,0.92)", muted: "rgba(180,175,165,0.65)", accent: "#e8a45a" };
const LIGHT = { bg: "#ffffff", surface: "#ffffff",  border: "#e0dbd0", text: "#1c1a17",               muted: "#6b6560",               accent: "#c27a2a" };

export default function Blog() {
  const [posts, setPosts]   = useState([]);
  const [dark, setDark]     = useState(() => localStorage.getItem("theme") !== "light");
  const [hover, setHover]   = useState(null);
  const navigate            = useNavigate();
  const t = dark ? DARK : LIGHT;

  useEffect(() => {
    loadAllPosts().then(setPosts);
  }, []);

  // Sync theme preference with homepage toggle
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.body.style.backgroundColor = t.bg;
  }, [dark, t.bg]);

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

        {/* Back button placed above the heading */}
        <div style={{ position: 'absolute', left: 24, top: 160 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "none", border: "none", cursor: "pointer",
              color: t.muted, fontSize: 13, fontFamily: "'Inter', sans-serif",
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = t.text}
            onMouseLeave={e => e.currentTarget.style.color = t.muted}
          >
            <ArrowLeft size={15} /> back home
          </button>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Lora', serif",
          fontStyle: "normal", fontWeight: 600,
          fontSize: "clamp(20px, 4.5vw, 40px)",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          margin: "0 0 12px", color: dark ? "#f1ede6" : "#1c1a17",
        }}>Blog</h1>
        <p style={{ fontSize: 16, color: t.text, margin: "0 0 12px" }}>
          Thoughts on computer science, psychology and whatever else on my mind
        </p>
        <p style={{ fontSize: 13, color: t.muted, margin: "0 0 12px" }}>
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>

        {/* Post list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {posts.map((post, i) => {
            const dateObj = new Date(post.date);
            const dateStr = !isNaN(dateObj) 
              ? dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase()
              : post.date;

            return (
              <div
                key={post.slug}
                onClick={() => navigate(`/blog/${post.slug}`)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  padding: "12px 0", cursor: "pointer",
                  borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)"}`,
                }}
              >
                <div style={{ 
                  fontSize: 13, letterSpacing: "0.05em", color: t.muted, 
                  marginBottom: 12, fontWeight: 500 
                }}>
                  <hr style={{ border: "none", height: 1, background: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)", margin: "0 0 12px" }} />
                  {dateStr}
                </div>
                <h2 style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "clamp(18px, 3vw, 22px)", /* reduced title size */
                  margin: 0,
                  fontWeight: 500,
                  lineHeight: 1.25,
                  color: dark ? (hover === i ? "#fff" : "#a8cbeb") : (hover === i ? "#000" : "#1d3d63"),
                  transition: "color 0.2s",
                }}>
                  {post.title}
                </h2>
              </div>
            );
          })}

          {posts.length === 0 && (
            <p style={{ color: t.muted, fontSize: 14 }}>No posts yet. Add a .md file to src/posts/</p>
          )}
        </div>
      </div>
    </div>
  );
}