# Refactoring — S5

## Applied

**Reescrita de links relativos refatorada após o primeiro draft.** A
primeira versão usava `path.resolve` que normalizava de forma estranha
em alguns casos (`./index.md` virava `/Users/...`). Trocado por
`path.join` + `path.normalize` + `path.relative(DOCS_ROOT, target)`,
o que dá o slug correto. Detectado durante a escrita do teste
`rewrites relative .md links to /docs/ routes`.

**Frontmatter YAML originalmente vazava no render.** Quando a
release note começava com `---\ndigest: |\n...\n---`, o `marked`
interpretava como headings. Adicionado strip explícito antes do
render. Detectado durante o uso, não na escrita inicial.

## Evaluated, not done

**Cache da `buildTree()`.** O filesystem é lido em cada request a
`/docs/*`. Em volume atual (~30 arquivos) o custo é ~1ms. Adicionar
cache com invalidação por mtime poupa esse 1ms. Sem benefício
tangível enquanto o volume não cresce.

**Geração de ToC por documento.** Páginas longas como `briefing.md`
ficariam mais navegáveis com uma table-of-contents no topo, gerada
das próprias headings. Não vale construir agora; quando dois leitores
diferentes reclamarem de "achar a parte X", entra.

**Highlighting de código.** Blocos ``` ``` rendem como `<pre>` sem
coloração. `marked` aceita um highlighter (Shiki, Prism). Adia até
ter blocos de código em volume e situações que peçam clareza
sintática.
