// utils/posts.js
// This file reads all .md files from src/posts/ automatically.
// You never need to register a new post — just drop a .md file in
// the folder and it appears on the blog list.

// Vite's import.meta.glob reads all .md files at build time
const modules = import.meta.glob("../posts/*.md", { query: "?raw", import: "default" });

// ── Frontmatter parser ───────────────────────────────────────
// Reads the --- block at the top of each .md file
// Supported fields: title, date, description
//
// Example frontmatter:
// ---
// title: My Post Title
// date: 2025-05-01
// description: A short summary shown on the blog list
// ---
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  match[1].split("\n").forEach(line => {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();
    if (key) data[key] = val;
  });

  return { data, content: match[2].trim() };
}

// ── Slug from filename ───────────────────────────────────────
// "src/posts/2025-05-01-my-post.md" → "2025-05-01-my-post"
function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

// ── Estimate read time ───────────────────────────────────────
function readTime(content) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// ── Load all posts (for the blog list page) ──────────────────
export async function loadAllPosts() {
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, load]) => {
      const raw              = await load();
      const { data, content } = parseFrontmatter(raw);
      const timestamp = Date.parse(data.date || "");
      return {
        slug:        slugFromPath(path),
        title:       data.title       || slugFromPath(path),
        date:        data.date        || "",
        description: data.description || "",
        readTime:    readTime(content),
        timestamp:   Number.isNaN(timestamp) ? 0 : timestamp,
      };
    })
  );

  // Sort by date descending (newest first)
  return entries
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(({ timestamp, ...rest }) => rest);
}

// ── Load a single post (for the post page) ───────────────────
export async function loadPost(slug) {
  // Find the matching module by slug
  const entry = Object.entries(modules).find(
    ([path]) => slugFromPath(path) === slug
  );
  if (!entry) throw new Error(`Post not found: ${slug}`);

  const raw               = await entry[1]();
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    title:    data.title    || slug,
    date:     data.date     || "",
    readTime: readTime(content),
    content,
  };
}