import { Hono } from "hono";
import { readFileSync } from "node:fs";
import { listMembers } from "../db.js";
import { getCurrentMember } from "../lib/auth.js";
import { buildBreadcrumbs, resolveDocPath, type Breadcrumb } from "../lib/docs-tree.js";
import { renderMarkdown } from "../lib/markdown.js";
import { escapeHtml, layout } from "../views/layout.js";

export const docs = new Hono();

docs.get("/", (c) => renderDoc(c, ""));
docs.get("/*", (c) => {
  const slug = c.req.path.replace(/^\/docs\//, "").replace(/\/$/, "");
  return renderDoc(c, slug);
});

function renderDoc(c: any, slug: string) {
  const current = getCurrentMember(c);
  const all = listMembers();
  const path = resolveDocPath(slug);

  if (!path) {
    c.status(404);
    return c.html(
      layout({
        title: "Documento não encontrado",
        currentMember: current ? { id: current.id, name: current.name } : null,
        allMembers: all.map((m) => ({ id: m.id, name: m.name })),
        wide: true,
        body: `<h1>Documento não encontrado</h1><p>O caminho <code>${escapeHtml(slug)}</code> não existe na documentação.</p><p><a href="/docs">Voltar para o índice</a></p>`,
      })
    );
  }

  const breadcrumbs = buildBreadcrumbs(slug);
  const md = readFileSync(path, "utf-8");
  const html = renderMarkdown(md, path);

  const body = /* html */ `
    ${renderBreadcrumbs(breadcrumbs)}
    <article class="markdown">${html}</article>
  `;

  return c.html(
    layout({
      title: titleFromSlug(slug),
      currentMember: current ? { id: current.id, name: current.name } : null,
      allMembers: all.map((m) => ({ id: m.id, name: m.name })),
      wide: true,
      body,
    })
  );
}

function renderBreadcrumbs(crumbs: Breadcrumb[]): string {
  if (crumbs.length === 0) return "";
  const parts = crumbs.map((c, i) => {
    const last = i === crumbs.length - 1;
    if (last || !c.url) {
      return `<span class="current">${escapeHtml(c.title)}</span>`;
    }
    return `<a href="${c.url}">${escapeHtml(c.title)}</a>`;
  });
  return `<nav class="breadcrumb" aria-label="Breadcrumb">${parts.join('<span class="sep">›</span>')}</nav>`;
}

function titleFromSlug(slug: string): string {
  if (!slug) return "Documentação";
  const last = slug.split("/").pop() ?? slug;
  return last
    .split("-")
    .map((part) => (part.length > 3 ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}
