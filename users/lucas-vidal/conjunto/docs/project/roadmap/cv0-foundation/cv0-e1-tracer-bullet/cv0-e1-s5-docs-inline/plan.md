# Plan — S5

## Resumo

Servir toda a documentação do Conjunto dentro do próprio produto, em
`/docs`. A árvore vem do filesystem em tempo real, cada arquivo
markdown vira HTML renderizado, e a navegação reflete a estrutura
de pastas.

## Alternativas consideradas

- **Astro / Docusaurus / MkDocs como site estático separado.** Cada
  uma dessas ferramentas resolve "publicar markdown como site".
  Recusadas por adicionar stack inteira (build pipeline, novo deploy,
  navegação separada do produto) para servir trinta arquivos. O ganho
  estético não compensa o custo cognitivo de manter dois mundos.
- **Pré-gerar HTML estático no build do servidor.** Cache até a
  próxima reinicialização. Adiciona complexidade (passo de build,
  invalidação) para um ganho marginal (a leitura do filesystem em
  cada request é desprezível no volume atual).

## Decisões

- Leitura do filesystem em tempo real. A função `buildTree()` em
  `lib/docs-tree.ts` lê a hierarquia de pastas e retorna a estrutura
  como nó. Cada request reconstrói. Em volume MVP (~30 arquivos), o
  custo é ~1ms.
- `marked` para renderizar markdown. Padrão estável, mantido, sem
  dependências transitivas pesadas.
- Reescrita de links relativos. Quando um documento markdown tem
  `[texto](outro.md)`, o link é reescrito para a rota interna
  `/docs/path/to/outro`. Funciona para `.md`, ignora `.md#anchor`,
  ignora URLs absolutas (http, mailto) e âncoras.
- Frontmatter YAML é descartado no render. Permite que release
  notes carreguem `digest:` no topo sem poluir a página.
- Resolução de slugs:
  - Pasta `foo/` com `index.md` → URL `/docs/foo` renderiza
    `foo/index.md`.
  - Arquivo `foo.md` → URL `/docs/foo` renderiza `foo.md`.
  - Pasta sem `index.md` ou arquivo inexistente → 404.

## Segurança

`resolveDocPath` rejeita qualquer slug que contenha `..` para
evitar escape do diretório `docs/`. Como a leitura é só sobre
arquivos `.md` dentro de `DOCS_ROOT`, e o conteúdo é parseado por
`marked` (não executado), o vetor de ataque é mínimo, mas a guarda
explícita é barata.

## Trade-offs aceitos

- Sem busca textual. Quando o volume passar de cinquenta arquivos,
  considero adicionar.
- Sem permalink por seção (`#secao`). `marked` gera ids
  automaticamente mas a navegação por scroll-to-anchor depende de
  o navegador respeitar o hash. Funciona em browsers modernos por
  default.
- Sem cache. A árvore inteira é reconstruída em cada request a
  `/docs/*`. Em volume MVP isso é gratuito; quando passar de
  duzentos arquivos vira problema. Aí cache com invalidação por
  mtime do filesystem.
