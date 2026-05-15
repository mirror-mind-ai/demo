# Test guide — S5

## Pré-requisitos

- Server rodando.
- Não precisa de seed (docs vêm do filesystem, não do banco).

## Caminho feliz

1. Abrir `http://localhost:3030/docs`.
2. Confirmar que aparece:
   - Botão "Ocultar índice / Mostrar índice" no canto superior
     esquerdo.
   - Sidebar à esquerda com a árvore de pastas (product, process,
     project, releases) e seus arquivos.
   - Conteúdo principal renderizando `docs/index.md`.
3. Clicar em "Ocultar índice" deve esconder a sidebar e expandir o
   conteúdo. Recarregar a página: estado permanece (persistido em
   `localStorage`).
4. Clicar em qualquer link da sidebar leva ao documento
   correspondente, e o sidebar persiste com o item ativo destacado.
5. Em uma página com links relativos (ex:
   `/docs/product/index.md` linka para `problem.md`), confirmar que
   o clique vai para `/docs/product/problem`, não tenta sair do
   produto.
6. Em uma página com frontmatter (`/docs/releases/v0.1.0`),
   confirmar que o `---` no topo do markdown NÃO aparece renderizado
   como heading; o título começa em "v0.1.0 — Tracer Bullet".

## Casos a verificar

- Acessar `/docs/nao-existe` deve retornar 404 com mensagem
  amigável, não erro 500.
- Acessar `/docs/../package.json` (tentativa de path traversal) deve
  retornar 404, NÃO o `package.json`.
- Editar um arquivo markdown em `docs/` enquanto o server roda em
  `npm run dev` deve aparecer imediatamente na próxima navegação
  (sem rebuild).
- Sidebar deve listar pastas com nome formatado (`process` → `Process`,
  `cv0-foundation` → `cv0 Foundation`).

## Testes automatizados

Cobertura em `tests/docs.test.ts`:

- `buildTree()` lista as pastas top-level esperadas.
- `resolveDocPath` resolve raiz, caminhos aninhados, e rejeita paths
  fora do `DOCS_ROOT`.
- `renderMarkdown` renderiza headings, ignora frontmatter, lida com
  links relativos.

`npm test` roda 8 testes.
