/**
 * Renderiza markdown em HTML usando marked, e reescreve links
 * relativos para o esquema interno do app (/docs/...).
 *
 * Regras de reescrita de link:
 *   - [texto](./outro.md) → /docs/<base>/outro
 *   - [texto](../outro/index.md) → /docs/<base-pai>/outro
 *   - [texto](outro.md) → /docs/<base>/outro
 *   - Links absolutos (http://...) e âncoras (#secao) ficam intactos.
 */

import { marked } from "marked";
import { dirname, join, normalize, relative } from "node:path";
import { DOCS_ROOT } from "./docs-tree.js";

export interface TocEntry {
  level: number;
  text: string;
  slug: string;
}

export interface RenderedMarkdown {
  html: string;
  toc: TocEntry[];
}

/**
 * Backwards-compatible: returns just the HTML.
 */
export function renderMarkdown(md: string, absFilePath: string): string {
  return renderMarkdownWithToc(md, absFilePath).html;
}

/**
 * Render markdown and also extract a table of contents from h2/h3.
 * Heading ids are injected into the output so the TOC can link to them.
 */
export function renderMarkdownWithToc(md: string, absFilePath: string): RenderedMarkdown {
  const html = renderInternal(md, absFilePath);
  const toc: TocEntry[] = [];
  const used = new Map<string, number>();

  const withIds = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_full, lvl: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let slug = slugify(text);
    const seen = used.get(slug) ?? 0;
    used.set(slug, seen + 1);
    if (seen > 0) slug = `${slug}-${seen}`;
    toc.push({ level: parseInt(lvl, 10), text, slug });
    return `<h${lvl} id="${slug}">${inner}</h${lvl}>`;
  });

  return { html: withIds, toc };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "section";
}

function renderInternal(md: string, absFilePath: string): string {
  // Strip YAML frontmatter if present (used by release notes for digest).
  const stripped = md.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "");

  // First pass: rewrite relative .md links to internal /docs/ routes.
  const fileDir = dirname(absFilePath);
  const rewritten = stripped.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (full, label: string, target: string) => {
      if (/^https?:|^mailto:|^\/|^#/.test(target)) return full;
      if (!target.endsWith(".md") && !target.includes(".md#")) return full;

      const [pathPart, anchor] = target.split("#");
      const absTarget = normalize(join(fileDir, pathPart));
      const relFromRoot = relative(DOCS_ROOT, absTarget);
      if (relFromRoot.startsWith("..")) return full;

      let slug = relFromRoot.replace(/\\/g, "/").replace(/\.md$/, "");
      if (slug.endsWith("/index")) slug = slug.slice(0, -"/index".length);
      const url = slug ? `/docs/${slug}` : "/docs";
      return `[${label}](${url}${anchor ? "#" + anchor : ""})`;
    }
  );

  return marked.parse(rewritten, { async: false }) as string;
}
