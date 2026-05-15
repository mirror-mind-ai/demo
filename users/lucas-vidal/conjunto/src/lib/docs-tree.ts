/**
 * Navegação da árvore de docs/. Lê o filesystem na hora (sem cache) para
 * que edição em docs/ apareça imediatamente no /docs sem restart. Em
 * produção, dado o volume pequeno (~30 arquivos), o custo é desprezível.
 *
 * Convenções:
 *   - Cada pasta com subconteúdo precisa de um index.md.
 *   - Slugs de URL preservam a estrutura do filesystem (sem .md).
 *   - A entrada raiz é docs/index.md, acessível em /docs.
 */

import { readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DOCS_ROOT = join(__dirname, "..", "..", "docs");

export interface TreeNode {
  slug: string;            // relative URL after /docs (e.g. "project/briefing")
  title: string;           // display title
  isFolder: boolean;
  children?: TreeNode[];
}

export function buildTree(): TreeNode {
  return readDir(DOCS_ROOT, "");
}

function readDir(absDir: string, slugPrefix: string): TreeNode {
  const entries = readdirSync(absDir, { withFileTypes: true });
  const children: TreeNode[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = join(absDir, entry.name);
    const childSlug = slugPrefix ? `${slugPrefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      children.push(readDir(fullPath, childSlug));
    } else if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "index.md") {
      const slug = childSlug.replace(/\.md$/, "");
      children.push({
        slug,
        title: prettify(entry.name.replace(/\.md$/, "")),
        isFolder: false,
      });
    }
  }

  // Sort: folders first (by name), then files by slug-derived order.
  children.sort((a, b) => {
    if (a.isFolder && !b.isFolder) return -1;
    if (!a.isFolder && b.isFolder) return 1;
    return a.slug.localeCompare(b.slug);
  });

  return {
    slug: slugPrefix,
    title: slugPrefix ? prettify(slugPrefix.split("/").pop() ?? slugPrefix) : "Documentação",
    isFolder: true,
    children,
  };
}

function prettify(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part.length > 3 ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

/**
 * Resolve a URL slug to an absolute filesystem path. Returns null if
 * the path escapes DOCS_ROOT or doesn't exist as either a directory
 * (with index.md) or a .md file.
 */
export function resolveDocPath(slug: string): string | null {
  const safe = slug.replace(/\.\./g, "");
  const candidate = join(DOCS_ROOT, safe);
  if (!candidate.startsWith(DOCS_ROOT)) return null;

  try {
    const stat = statSync(candidate);
    if (stat.isDirectory()) {
      const indexPath = join(candidate, "index.md");
      statSync(indexPath);
      return indexPath;
    }
  } catch {
    // Not a directory; try as file.
  }

  try {
    const filePath = candidate.endsWith(".md") ? candidate : `${candidate}.md`;
    statSync(filePath);
    return filePath;
  } catch {
    return null;
  }
}
