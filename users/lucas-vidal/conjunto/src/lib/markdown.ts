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

export function renderMarkdown(md: string, absFilePath: string): string {
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
