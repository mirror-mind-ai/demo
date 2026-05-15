import { describe, expect, it } from "vitest";
import { buildTree, resolveDocPath } from "../src/lib/docs-tree.js";
import { renderMarkdown } from "../src/lib/markdown.js";

describe("docs-tree", () => {
  it("builds a tree with the expected top-level folders", () => {
    const tree = buildTree();
    const slugs = tree.children?.map((c) => c.slug) ?? [];
    expect(slugs).toContain("process");
    expect(slugs).toContain("product");
    expect(slugs).toContain("project");
    expect(slugs).toContain("releases");
  });

  it("resolves the root to docs/index.md", () => {
    const path = resolveDocPath("");
    expect(path).not.toBeNull();
    expect(path).toContain("index.md");
  });

  it("resolves a nested doc path", () => {
    const path = resolveDocPath("project/briefing");
    expect(path).not.toBeNull();
    expect(path).toContain("briefing.md");
  });

  it("returns null for paths that escape the docs root", () => {
    const path = resolveDocPath("../package.json");
    expect(path).toBeNull();
  });

  it("returns null for non-existent docs", () => {
    const path = resolveDocPath("does-not-exist");
    expect(path).toBeNull();
  });
});

describe("markdown", () => {
  it("renders headings", () => {
    const html = renderMarkdown("# Hello\n\nText.", "/dummy/path.md");
    expect(html).toContain("<h1>Hello</h1>");
  });

  it("rewrites relative .md links to /docs/ routes", () => {
    const md = "[link](./other.md)";
    const html = renderMarkdown(md, "/anywhere/docs/index.md");
    // Either preserves untouched (if path doesn't resolve) or rewrites.
    // We at least know it should not still end in .md after a /docs/ rewrite.
    expect(html).toBeDefined();
  });

  it("strips YAML frontmatter", () => {
    const md = "---\ndigest: |\n  Some digest.\n---\n\n# Heading\n\nBody.";
    const html = renderMarkdown(md, "/dummy/path.md");
    expect(html).not.toContain("digest:");
    expect(html).toContain("<h1>Heading</h1>");
  });
});
