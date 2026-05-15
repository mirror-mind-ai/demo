import { Hono } from "hono";
import { readFileSync } from "node:fs";
import { listMembers } from "../db.js";
import { getCurrentMember } from "../lib/auth.js";
import { buildTree, resolveDocPath, type TreeNode } from "../lib/docs-tree.js";
import { renderMarkdown } from "../lib/markdown.js";
import { layout } from "../views/layout.js";

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
        body: `<h1>Documento não encontrado</h1><p>O caminho <code>${escapeAttr(slug)}</code> não existe na documentação.</p><p><a href="/docs">Voltar para o índice</a></p>`,
      })
    );
  }

  const tree = buildTree();
  const md = readFileSync(path, "utf-8");
  const html = renderMarkdown(md, path);

  const body = /* html */ `
    <div class="docs">
      <nav class="tree">${renderTree(tree, slug)}</nav>
      <article class="markdown">${html}</article>
    </div>
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

function renderTree(node: TreeNode, currentSlug: string): string {
  if (!node.children || node.children.length === 0) return "";
  return /* html */ `
    <ul>
      ${node.children
        .map((child) => {
          if (child.isFolder) {
            const href = child.slug ? `/docs/${child.slug}` : "/docs";
            const isCurrent = child.slug === currentSlug;
            return `<li>
              <a href="${href}" class="folder${isCurrent ? " current" : ""}">${child.title}</a>
              ${renderTree(child, currentSlug)}
            </li>`;
          }
          const href = `/docs/${child.slug}`;
          const isCurrent = child.slug === currentSlug;
          return `<li><a href="${href}"${isCurrent ? ' class="current"' : ""}>${child.title}</a></li>`;
        })
        .join("")}
    </ul>
  `;
}

function titleFromSlug(slug: string): string {
  if (!slug) return "Documentação";
  const last = slug.split("/").pop() ?? slug;
  return last
    .split("-")
    .map((part) => (part.length > 3 ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
