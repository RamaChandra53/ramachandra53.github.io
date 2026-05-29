import { useEffect, useState } from "react";
import { Moon, Sun, MapPin } from "lucide-react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
// PersonalWebsite component defined below in this file
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
 

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"           element={<PersonalWebsite />} />
        <Route path="/blog"       element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </HashRouter>
  );
}
 

/* ============/>==========================================
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
      Hi, i'm ram, a 19 yr old building or breaking something for fun.          
    </>,
    <>
      When you're reading this, I might be doing one of these : hacking my college website, learning to code,
      reading books, watching anime, exploring new technologies or probably just sleeping.
            
    </>,
    <>
    I like to research what's underneath the hood of tech, how systems work, layers beneath them, integrations between them, 
    the level of abstraction those people build and make it simple to understand, view and use,   W for them.
    </>,

    // <>
    //   My projects are available on{" "}
    //   <BoldLink href="https://github.com/RamaChandra53/">GitHub</BoldLink>
    
    // </>,
    // <>
    //   Feel free to reach me at{" "}
    //   {/* ← change the email below */}
    //   <BoldLink href="mailto:vramachandra@proton.me">vramachandra@proton.me</BoldLink>.
    // </>,
   
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

function PersonalWebsite() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") !== "light");
  const [time, setTime]  = useState("");
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  



// Typing effect component: types words, appends a full stop, waits, then backspaces
function TypingEffect({ words = ["tech nerd", "engineer", "anime lover"], pause = 2000, style = {} }) {
  const [display, setDisplay] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let mounted = true;
    const indexRef = { current: 0 };
    const charRef = { current: 0 };
    const modeRef = { current: 'typing' }; // 'typing' | 'pause' | 'deleting'
    let timeout = null;

    function tick() {
      const word = words[indexRef.current];
      if (!mounted) return;

      if (modeRef.current === 'typing') {
        if (charRef.current <= word.length) {
          // show characters; add full stop when at end
          const text = word.slice(0, charRef.current) + (charRef.current === word.length ? '.' : '');
          setDisplay(text);
          charRef.current += 1;
          timeout = setTimeout(tick, 80);
        } else {
          modeRef.current = 'pause';
          timeout = setTimeout(() => {
            modeRef.current = 'deleting';
            tick();
          }, pause);
        }
      } else if (modeRef.current === 'deleting') {
        if (charRef.current >= 0) {
          // delete characters one by one (this will delete the dot first)
          const text = word.slice(0, charRef.current);
          setDisplay(text);
          charRef.current -= 1;
          timeout = setTimeout(tick, 50);
        } else {
          // move to next word
          indexRef.current = (indexRef.current + 1) % words.length;
          charRef.current = 0;
          modeRef.current = 'typing';
          timeout = setTimeout(tick, 200);
        }
      }
    }

    // start
    tick();

    // cursor blink
    const blink = setInterval(() => setCursorVisible(v => !v), 500);

    return () => {
      mounted = false;
      clearInterval(blink);
      if (timeout) clearTimeout(timeout);
    };
  }, [words, pause]);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0, lineHeight: '1.2', minHeight: '1.2em', verticalAlign: 'middle', overflow: 'visible', ...style }}>
      <span style={{ fontFamily: 'inherit', fontSize: 'inherit', lineHeight: '1.2' }}>{display}</span>
      <span style={{ width: 1, height: '1em', background: cursorVisible ? 'currentColor' : 'transparent', display: 'inline-block', marginLeft: 1, verticalAlign: 'baseline' }} />
    </div>
  );
}

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.body.style.backgroundColor = dark ? "#000000" : "#ffffff";
  }, [dark]);

  // ── Color themes ─────────────────────────────────────────────
  const bg = dark ? "#000000" : "#ffffff";
  const textMain  = dark ? "rgba(241,237,230,0.92)"  : "#1c1a17";
  const textMuted = dark ? "rgba(180,175,165,0.65)"  : "#6b6560";
  const nameFontSize = viewportWidth <= 640
    ? "clamp(28px, 11vw, 52px)"
    : "clamp(20px, 4.5vw, 40px)";
  

  return (
    <div style={{
      minHeight: "100dvh",
      width: "100%",
      background: bg, 
      color: textMain,
      fontFamily: "'Inter', sans-serif",
      fontSize: 16,
      lineHeight: 1.75,
      transition: "background 0.4s, color 0.4s",
      position: "relative",
      overflowX: "hidden",
    }}>

    
      {/* ── Theme toggle (bottom-right) ───────────────────────────── */}
              <button
          aria-label="Toggle theme"
          onClick={() => setDark(d => !d)}
          style={{
        position: "fixed",
        bottom: 24,
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
        maxWidth: 640, margin: "0 auto",
        padding: "220px 24px 80px",
        display: "flex", flexDirection: "column",
        alignItems: "center", minHeight: "100vh",
      }}>

        {/* Avatar removed as requested */}

        {/* ── Name ─────────────────────────────────────────────────
            Big italic serif — the main visual statement of the page */}
        <h1 style={{
          fontFamily: "'Silkscreen', 'Lora', serif",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: nameFontSize,
          lineHeight: 1.2,
          textAlign: "left",
          alignSelf: "flex-start",
          letterSpacing: "-0.01em",
          margin: "0 0 12px",
          color: dark ? "#f1ede6" : "#1c1a17",
          whiteSpace: "normal",
        }}>
          {PROFILE.name}
        </h1>

        {/* typing keywords effect: appears directly after the profile name */}
        <div style={{ alignSelf: 'flex-start', marginTop: 8 }}>
          <TypingEffect words={["tech nerd", "engineer", "anime lover"]} pause={2000} style={{ color: textMain, fontSize: 16 }} />
        </div>

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

        <div style={{ flex: 1, minHeight: 12 }} />

        {/* ── Nav links ────────────────────────────────────────────── */}
        <nav style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "center", gap: "8px 32px",
          marginTop: 24, marginBottom: 28,
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
    </div>
  );
}



// Plain text nav link with hover lift
function NavLink({ href, children, muted, main }) {
  const [hov, setHov] = useState(false);
  const isExternal = /^(https?:\/\/|mailto:)/.test(href);
  const commonStyle = {
    textDecoration: "none", fontSize: 17, fontWeight: 700,
    color: hov ? main : muted,
    display: "inline-block",
    transform: hov ? "translateY(-1px)" : "translateY(0)",
    transition: "color 0.2s, transform 0.2s",
  };
  const hoverProps = {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: commonStyle,
  };
  return (
    isExternal ? (
      <a href={href} {...hoverProps}>
        {children}
      </a>
    ) : (
      <Link to={href} {...hoverProps}>
        {children}
      </Link>
    )
  );
}