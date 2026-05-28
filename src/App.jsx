import { useEffect, useState } from "react";
import { Moon, Sun, MapPin } from "lucide-react";

/* ============================================================
   👤 EDIT YOUR PROFILE HERE — change only this section
   ============================================================ */
const PROFILE = {
  name: "Rama Chandra",                          // ← your name
  title: "",     // ← your tagline
  avatar: "/avatar.jpg",                 // ← put your photo in /public/avatar.jpg
  email: "vramachandra@proton.me",             // ← your email
  location: "Hyderabad, India",          // ← your city
  timezone: "Asia/Kolkata",             // ← your timezone (don't change if India)

  // ── Bio paragraphs ──────────────────────────────────────────
  // Each string = one paragraph. Add or remove as needed.
  bio: [
    <>
      Hi, I'm a 19 yr old techbreaker, engineer, anime/movie lover, curious, 
      deeply interested in defensive security and digital investigations.      
    </>,
    <>
      When you're reading this, I might be doing one of these : hacking my college website, learning to code,
      reading books, exploring new technologies or just sleeping.
            
    </>,
    <>
      My projects are available on{" "}
      <BoldLink href="https://github.com/RamaChandra53/">GitHub</BoldLink>
    
    </>,
    <>
      Feel free to reach me at{" "}
      {/* ← change the email below */}
      <BoldLink href="mailto:vramachandra@proton.me">vramachandra@proton.me</BoldLink>.
    </>,
   
  ],

  // ── Nav links at the bottom ──────────────────────────────────
  // Add, remove, or rename any of these
  links: [
    { label: "blog",    href: "/blog" },
    { label: "github",  href: "https://github.com/RamaChandra53" },
    { label: "twitter", href: "https://x.com/not_ramachandra" },
    { label: "email",   href: "mailto:vramachandra@proton.me" },
  ],
};
/* ============================================================
   ✅ Done editing profile — don't touch below unless you want
      to change the actual design / layout
   ============================================================ */


// Bold underlined inline link used inside bio paragraphs
function BoldLink({ href, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontWeight: 700,
        color: "inherit",
        textDecoration: "underline",
        textDecorationColor: "rgba(255,255,255,0.35)",
        textUnderlineOffset: 4,
        opacity: hov ? 0.6 : 1,
        transition: "opacity 0.2s",
      }}
    >
      {children}
    </a>
  );
}

export default function PersonalWebsite() {
  const [dark, setDark] = useState(true);
  const [time, setTime]  = useState("");

  // ── Live clock ──────────────────────────────────────────────
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: PROFILE.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZoneName: "short",
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // ── Load Google Fonts ────────────────────────────────────────
  useEffect(() => {
    if (document.getElementById("gf")) return;
    const l = document.createElement("link");
    l.id = "gf";
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,600&family=Inter:wght@400;500;700&display=swap";
    document.head.appendChild(l);
  }, []);

  // ── Color themes ─────────────────────────────────────────────
  const bg = dark ? "#000000" : "#ffffff";
  const textMain  = dark ? "rgba(241,237,230,0.92)"  : "#1c1a17";
  const textMuted = dark ? "rgba(180,175,165,0.65)"  : "#6b6560";
  const blobLeft  = dark ? "rgba(59,130,246,0.28)"   : "rgba(59,130,246,0.12)";
  const blobRight = dark ? "rgba(99,102,241,0.28)"   : "rgba(99,102,241,0.12)";

  return (
    <div style={{
      minHeight: "100dvh",
      width: "100vw",
      background: bg, 
      color: textMain,
      fontFamily: "'Inter', sans-serif",
      fontSize: 16,
      lineHeight: 1.75,
      transition: "background 0.4s, color 0.4s",
      position: "relative",
      overflowX: "hidden",
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

      {/* ── Page content ─────────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 560, margin: "0 auto",
        padding: "60px 24px 80px",
        display: "flex", flexDirection: "column",
        alignItems: "center", minHeight: "100vh",
      }}>

        {/* ── Avatar ───────────────────────────────────────────────
            • Put your photo at /public/avatar.jpg in your project
            • If the image is missing it shows your first initial   */}
        <div style={{
          width: 88, height: 88, borderRadius: "50%",
          overflow: "hidden",
          border: `2px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}`,
          marginBottom: 28,
          boxShadow: dark ? "0 0 0 4px rgba(59,130,246,0.12)" : "none",
          flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img
            src={PROFILE.avatar}
            alt={PROFILE.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => {
              e.target.style.display = "none";
              e.target.parentNode.style.background = "linear-gradient(135deg,#3b82f6,#6366f1)";
              e.target.parentNode.style.fontFamily = "Cormorant Garamond, serif";
              e.target.parentNode.style.fontSize = "36px";
              e.target.parentNode.style.fontStyle = "italic";
              e.target.parentNode.style.color = "#fff";
              e.target.parentNode.innerHTML = PROFILE.name[0];
            }}
          />
        </div>

        {/* ── Name ─────────────────────────────────────────────────
            Big italic serif — the main visual statement of the page */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: "clamp(48px, 8vw, 72px)",
          lineHeight: 1.05,
          textAlign: "center",
          letterSpacing: "-0.01em",
          margin: "0 0 12px",
          color: dark ? "#f1ede6" : "#1c1a17",
        }}>
          {PROFILE.name}
        </h1>

        {/* ── Tagline ──────────────────────────────────────────────── */}
        <p style={{
          fontSize: 14, letterSpacing: "0.06em",
          color: textMuted, textAlign: "center",
          margin: "0 0 44px", fontWeight: 500,
        }}>
          {PROFILE.title}
        </p>

        {/* ── Bio ──────────────────────────────────────────────────── */}
        <div style={{ width: "100%", fontSize: 16, color: textMain, lineHeight: 1.8, textAlign: "left" }}>
          {PROFILE.bio.map((para, i) => (
            <p key={i} style={{ marginBottom: i < PROFILE.bio.length - 1 ? 20 : 0 }}>
              {para}
            </p>
          ))}
        </div>

        <div style={{ flex: 1, minHeight: 48 }} />

        {/* ── Nav links ────────────────────────────────────────────── */}
        <nav style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "center", gap: "8px 32px",
          marginTop: 48, marginBottom: 28,
        }}>
          {PROFILE.links.map(link => (
            <NavLink key={link.label} href={link.href} muted={textMuted} main={textMain}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Location + live time ─────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          fontSize: 14, fontWeight: 600, color: textMain,
        }}>
          <MapPin size={15} style={{ color: "#ec4899", flexShrink: 0 }} />
          <span>{PROFILE.location}</span>
          <span style={{ color: textMuted, margin: "0 2px" }}>—</span>
          <span>{time}</span>
        </div>

      </div>

       <style>{`
        * { box-sizing: border-box; }

        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-width: 100%;
          min-height: 100%;
          background: #000 !important;
        }

        body {
          min-height: 100dvh;
          overflow-x: hidden;
        }

        a { cursor: pointer; }
`}</style>
    </div>
  );
}

// Plain text nav link with hover lift
function NavLink({ href, children, muted, main }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: "none", fontSize: 17, fontWeight: 700,
        color: hov ? main : muted,
        display: "inline-block",
        transform: hov ? "translateY(-1px)" : "translateY(0)",
        transition: "color 0.2s, transform 0.2s",
      }}
    >
      {children}
    </a>
  );
}