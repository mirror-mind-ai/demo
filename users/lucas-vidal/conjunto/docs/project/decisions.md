# Decisions Log

Decisões pequenas e incrementais que não couberam no briefing. Cada
entrada é uma decisão tomada, com o contexto que importava na hora.

---

## D1 — Boring stack first

**Data:** 25 de abril de 2026
**Status:** firme

Stack do MVP: TypeScript + Hono + better-sqlite3 + HTML server-rendered.
Sem Next.js, sem tRPC, sem Prisma, sem framework de front-end.

Considerei Next.js + tRPC + Prisma porque é o que está no plano
futuro de migração (quando houver tração validada — ver
[roadmap](../project/roadmap/index.md#migração-de-stack--release-futura-sem-número-fixo)).
Recusei para o MVP porque construtor solo paga
caro por stack sofisticado. O custo é cognitivo (toda decisão técnica
em estágio inicial multiplica), e o benefício só aparece quando há
escala (que não tem ainda).

Detalhe completo em [briefing.md → D1](briefing.md#d1-boring-stack-first).

## D2 — Sem ORM

**Data:** 27 de abril de 2026
**Status:** firme

`better-sqlite3` puro, com prepared statements. Sem Drizzle, sem
Kysely, sem Knex.

Drizzle me chamou atenção pelo TypeScript-first. Acabei recusando
porque o produto tem cinco tabelas, dezesseis queries no total. ORM
para esse volume é mais cerimônia do que ganho. Helpers em `src/db.ts`
encapsulam o SQL; trocar de banco é uma sessão de trabalho se for
necessário.

## D3 — Auth como cookie de demo

**Data:** 28 de abril de 2026
**Status:** firme (revisita no [CV2 — Abertura externa](../project/roadmap/index.md#cv2--abertura-externa))

Cookie `conjunto_member` com o id do membro ativo. Troca aberta na
home. Sem login, sem senha, sem session table.

Aceitável para sete pessoas que se conhecem fora do produto.
Intolerável quando abrir externamente. Magic link via email entra
no [CV2](../project/roadmap/index.md#cv2--abertura-externa) junto
com o pagamento.

## D4 — Documentação dentro do produto

**Data:** 30 de abril de 2026
**Status:** firme

A rota `/docs` lê e renderiza a árvore `docs/` ao vivo. Sidebar com a
estrutura de pastas, markdown convertido em HTML, links relativos
reescritos para rotas internas.

Considerei usar um site estático separado (Astro, MkDocs, Docusaurus).
Recusei porque adiciona uma stack inteira para servir 30 arquivos
markdown. ~80 linhas de código resolvem com folga.

## D5 — Seed como verdade do MVP

**Data:** 5 de maio de 2026
**Status:** firme

No MVP, o estado da comunidade vem do script de seed, não de cadastro
real. Cada `npm run seed` reseta o banco e popula com sete membros e
cinco fios.

A entrada de novos membros vai exigir cadastro real no
[CV2 — Abertura externa](../project/roadmap/index.md#cv2--abertura-externa).
Por enquanto, o seed é o "estado canônico" da comunidade, e isso vale
para testes, demos, e qualquer reset.

## D6 — Português no produto, inglês no código

**Data:** 6 de maio de 2026
**Status:** firme

Texto visível ao membro em português brasileiro. Código, comentários,
nomes de tabelas e colunas, mensagens de commit em inglês ou português,
indistintamente.

A inconsistência aparente é deliberada. Inglês no schema reduz
ambiguidade no código; português no produto respeita o público. O
custo de mapear `members` para "membros" no template é nulo.

## D7 — Refatoração no mesmo ciclo

**Data:** 8 de maio de 2026
**Status:** firme

Toda story termina com uma passada de refatoração. Não tem story sem
refatoração registrada (ou explicitamente declarada "nada a
refatorar").

Recusei o padrão "refatora quando incomodar" porque ele empurra dívida
indefinidamente. Refatorar no ciclo custa minutos; refatorar depois
custa horas e contexto perdido.

## D8 — v0.2.0 reconhecida como anomalia de versionamento

**Data:** 15 de maio de 2026
**Status:** firme

A `v0.2.0` (Editorial) saiu como MINOR bump para uma série de
refinos editoriais que **não fecharam epic algum** no roadmap. Pela
regra estrita de [`versioning.md`](../process/versioning.md), isso
era trabalho fora de roadmap mudando comportamento observável do
produto — ou seja, PATCH bump. A versão correta teria sido `v0.1.1`.

Considerei reescrever a release. Recusei porque o histórico já está
publicado, fundadores já leram a release note, e reescrever história
custa mais do que reconhecer a anomalia.

Decisão: manter `v0.2.0` como está no histórico, registrar esta
decisão como marco de coerência, e **voltar à regra a partir daqui**.

Consequências concretas para a sequência:

- A próxima entrega é a **CV0.E2.S1 — last-seen**, saindo isolada
  entre epics → **`v0.2.1` (PATCH)**.
- Se S2 sair antes do fechamento do epic → **`v0.2.2` (PATCH)**.
- Quando o epic **CV0.E2 fechar** (S1+S2+S3 prontas) → **`v0.3.0`
  (MINOR)**, conforme a regra.

O custo desta anomalia é puramente cognitivo: alguém lendo a
sequência de releases vai precisar abrir esta decisão para entender
por que o `0.2.0` não corresponde a um fechamento de epic. É um custo
baixo e localizado. Preço justo pela honestidade do registro.

## D9 — Versão atual exibida no colófon, sempre linkada

**Data:** 16 de maio de 2026
**Status:** firme

O produto exibe a versão atual em um colófon discreto (`footer.version`)
em todas as páginas, com o número da versão linkado para a release
note correspondente dentro de `/docs/releases/`. Tipografia pequena,
ink-soft, cor sutil, sem competir com nada visualmente.

A motivação não é "informar o usuário sobre o número da versão". O
número por si só não significa nada para um membro do Conjunto. A
motivação é dar ao produto uma **âncora física** para a disciplina
de citação declarada em
[`release-notes.md`](../process/release-notes.md#disciplina-de-citação-e-links).
Enquanto a regra existia só nos docs, não havia onde aplicá-la na
superfície visível do produto; agora há.

Consequência operacional: o passo 6 do ciclo (Check de Coerência)
passa a verificar que `CURRENT_VERSION` em `src/views/layout.ts` está
sincronizado com a release mais recente sempre que uma story fecha
uma versão nova. Isso integra o próprio produto ao ciclo editorial
— doc atualizada não substitui produto atualizado.

Colófon vem de tipografia editorial: é o bloco no final de um livro
que registra dados de impressão (edição, tiragem, gráfica). Coerente
com o tom do Conjunto como residência editorial.
