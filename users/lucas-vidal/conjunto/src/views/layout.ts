/**
 * Layout HTML compartilhado. Server-rendered, sem framework de front-end.
 *
 * Estética editorial: serif emprestada (Source Serif 4) para corpo,
 * sans humanista (Inter Tight) para chrome e títulos. Servidas por
 * fonts.bunny.net (sem Google, GDPR-friendly).
 */

const FONT_LINK =
  '<link rel="stylesheet" href="https://fonts.bunny.net/css?family=source-serif-4:400,400i,600,700|inter-tight:400,500,600,700&display=swap">';

const CSS = /* css */ `
  :root {
    --bg: #faf7f2;
    --surface: #ffffff;
    --ink: #1a1815;
    --ink-soft: #5a544a;
    --rule: #ddd4c6;
    --accent: #8a3324;
    --link: #8a3324;
    --max-width: 760px;
    --serif: "Source Serif 4", "Iowan Old Style", Georgia, serif;
    --sans: "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: var(--serif);
    font-size: 18px;
    line-height: 1.6;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  header.site {
    border-bottom: 1px solid var(--rule);
    background: var(--surface);
    padding: 0.9rem 1.5rem;
    font-family: var(--sans);
  }
  header.site .inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  header.site a.brand {
    color: var(--ink);
    text-decoration: none;
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.01em;
  }
  header.site nav a {
    color: var(--ink-soft);
    text-decoration: none;
    margin-left: 1.4rem;
    font-size: 0.95rem;
  }
  header.site nav a:hover { color: var(--ink); }

  main {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 3.2rem 1.5rem 5rem;
  }
  main.wide { max-width: 980px; }

  h1, h2, h3 {
    font-family: var(--sans);
    line-height: 1.2;
    letter-spacing: -0.02em;
    font-weight: 600;
  }
  h1 {
    font-size: 2.4rem;
    margin: 0 0 1.25rem;
    letter-spacing: -0.03em;
  }
  h2 {
    font-size: 1.05rem;
    margin: 3rem 0 1rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-soft);
    font-weight: 600;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--rule);
  }
  h3 {
    font-size: 1.15rem;
    margin: 1.6rem 0 0.4rem;
    font-weight: 600;
  }

  a { color: var(--link); }
  a:hover { color: var(--ink); }

  .lede {
    color: var(--ink-soft);
    font-size: 1.15rem;
    line-height: 1.55;
    margin: 0 0 2.4rem;
    font-style: italic;
    border-left: 2px solid var(--accent);
    padding-left: 1rem;
  }

  /* Entries: no card chrome. The page is the canvas; rule lines do the
     separating, not borders + drop-shadows. The .card class is kept as
     a hook for backwards compatibility, but renders flat. */
  .card,
  .entry {
    background: transparent;
    border: 0;
    border-radius: 0;
    padding: 1.4rem 0 1.6rem;
    margin: 0;
    border-bottom: 1px solid var(--rule);
  }
  .card:last-child,
  .entry:last-child {
    border-bottom: 0;
  }
  .card h3,
  .entry h3 { margin-top: 0; }

  /* Message blocks keep some interior breathing room but no border. */
  .message {
    padding: 1.8rem 0 2rem;
  }

  /* Member timeline: a single column of past contributions, each
     entry showing date, thread title, and an excerpt. No avatars,
     no reactions — the writing is the surface. */
  .timeline-entry .when {
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-soft);
    font-family: var(--sans);
  }
  .timeline-entry h3 {
    margin: 0 0 0.45rem;
    font-size: 1.05rem;
  }
  .timeline-entry .excerpt {
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.95rem;
  }

  /* Inline citation of another thread. Rendered as a sober block,
     not a button or a chip: small-caps label, title in serif, author,
     and the opening line in italic. Hovering tints the rule. */
  a.citation {
    display: block;
    text-decoration: none;
    color: var(--ink);
    border-left: 2px solid var(--rule);
    padding: 0.7rem 1rem;
    margin: 1.4rem 0;
    background: transparent;
    transition: border-color 120ms ease, background 120ms ease;
  }
  a.citation:hover {
    border-left-color: var(--accent);
    background: rgba(138, 51, 36, 0.03);
  }
  a.citation .citation-label {
    display: block;
    font-family: var(--sans);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--ink-soft);
    margin-bottom: 0.25rem;
  }
  a.citation .citation-title {
    display: block;
    font-family: var(--sans);
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.1rem;
  }
  a.citation .citation-author {
    display: block;
    font-family: var(--sans);
    font-size: 0.85rem;
    color: var(--ink-soft);
    margin-bottom: 0.4rem;
  }
  a.citation .citation-opener {
    display: block;
    font-style: italic;
    color: var(--ink-soft);
    font-size: 0.95rem;
    line-height: 1.45;
  }
  p.citation.broken {
    color: var(--ink-soft);
    font-style: italic;
    font-size: 0.9rem;
  }

  /* Read marker: a hairline rule across the column with a short note
     centered on it. Soft ink, sans, small caps. Never a badge or a
     counter — the principle is 'helps resume, not compete'. */
  .read-marker {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin: 1.5rem 0 0.5rem;
    color: var(--ink-soft);
    font-family: var(--sans);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  .read-marker::before,
  .read-marker::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--rule);
  }

  /* Thin section separator usable inline. */
  hr.rule {
    border: 0;
    border-top: 1px solid var(--rule);
    margin: 2.4rem 0;
  }

  .meta {
    color: var(--ink-soft);
    font-size: 0.9rem;
    font-family: var(--sans);
  }

  .who {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    padding: 0.55rem 0.85rem;
    background: var(--surface);
    border: 1px solid var(--rule);
    border-radius: 4px;
    font-family: var(--sans);
    font-size: 0.9rem;
  }
  .who select { font-size: 0.9rem; padding: 0.2rem 0.4rem; }

  .breadcrumb {
    font-family: var(--sans);
    font-size: 0.85rem;
    color: var(--ink-soft);
    margin: 0 0 1.5rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid var(--rule);
  }
  .breadcrumb a {
    color: var(--ink-soft);
    text-decoration: none;
  }
  .breadcrumb a:hover { color: var(--ink); }
  .breadcrumb .sep {
    margin: 0 0.45rem;
    opacity: 0.5;
  }
  .breadcrumb .current {
    color: var(--ink);
    font-weight: 600;
  }

  article.markdown pre {
    background: #f3eee5;
    padding: 0.9rem 1.1rem;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 0.85rem;
  }
  article.markdown code {
    background: #f3eee5;
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    font-size: 0.85em;
  }
  article.markdown pre code {
    background: transparent;
    padding: 0;
    font-size: inherit;
  }
  article.markdown blockquote {
    border-left: 3px solid var(--rule);
    margin: 1rem 0;
    padding: 0.2rem 1rem;
    color: var(--ink-soft);
  }
  article.markdown table {
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 0.95em;
  }
  article.markdown th, article.markdown td {
    border: 1px solid var(--rule);
    padding: 0.45rem 0.7rem;
    text-align: left;
  }

  /* Message timestamp sits small above the body, like a dateline. */
  .message .when {
    margin-bottom: 0.4rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* Author signature lives at the foot of each post, like a column
     byline: name in small-caps, role/company in soft ink. */
  .message .signature {
    margin-top: 1.4rem;
    padding-top: 0.7rem;
    border-top: 1px solid var(--rule);
    font-family: var(--sans);
    font-size: 0.85rem;
    line-height: 1.4;
  }
  .message .signature .name {
    display: block;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    color: var(--ink);
  }
  .message .signature .role {
    display: block;
    color: var(--ink-soft);
    font-style: italic;
  }

  /* Lead message of a thread: editorial drop cap on the very first
     paragraph, à la livro. Applied only to the opening message so it
     marks the entry, not every reply. */
  .message.lead .body > p:first-of-type::first-letter {
    font-family: var(--sans);
    font-weight: 600;
    float: left;
    font-size: 3.6em;
    line-height: 0.9;
    padding: 0.35rem 0.6rem 0 0;
    margin-top: 0.1rem;
    color: var(--accent);
  }

  .last-seen {
    font-size: 0.85rem;
    color: var(--ink-soft);
    font-family: var(--sans);
  }
`;

export interface LayoutOpts {
  title: string;
  currentMember?: { id: number; name: string } | null;
  allMembers?: { id: number; name: string }[];
  wide?: boolean;
  body: string;
}

export function layout(opts: LayoutOpts): string {
  const whoBar = opts.allMembers
    ? `
      <div class="who">
        Você está vendo o Conjunto como
        <form method="post" action="/auth/switch" style="display:inline">
          <select name="member_id" onchange="this.form.submit()">
            ${opts.allMembers
              .map(
                (m) =>
                  `<option value="${m.id}"${m.id === opts.currentMember?.id ? " selected" : ""}>${escapeHtml(m.name)}</option>`
              )
              .join("")}
          </select>
        </form>
      </div>
    `
    : "";

  return /* html */ `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(opts.title)} · Conjunto</title>
  ${FONT_LINK}
  <style>${CSS}</style>
</head>
<body>
  <header class="site">
    <div class="inner">
      <a class="brand" href="/">Conjunto</a>
      <nav>
        <a href="/members">Membros</a>
        <a href="/threads">Fios</a>
        <a href="/docs">Docs</a>
      </nav>
    </div>
  </header>
  <main${opts.wide ? ' class="wide"' : ""}>
    ${whoBar}
    ${opts.body}
  </main>
</body>
</html>`;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
