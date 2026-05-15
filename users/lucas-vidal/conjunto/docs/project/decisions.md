# Decisions Log

Decisões pequenas e incrementais que não couberam no briefing. Cada
entrada é uma decisão tomada, com o contexto que importava na hora.

---

## D1 — Boring stack first

**Data:** 25 de abril de 2026
**Status:** firme

Stack do MVP: TypeScript + Hono + better-sqlite3 + HTML server-rendered.
Sem Next.js, sem tRPC, sem Prisma, sem framework de front-end.

Considerei Next.js + tRPC + Prisma porque é o que está no plano que
desenhei para v0.3.0. Recusei para o MVP porque construtor solo paga
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
**Status:** firme (revisita em v0.2.0)

Cookie `conjunto_member` com o id do membro ativo. Troca aberta na
home. Sem login, sem senha, sem session table.

Aceitável para sete pessoas que se conhecem fora do produto.
Intolerável quando abrir externamente. Magic link via email entra em
v0.2.0 junto com o pagamento.

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

A entrada de novos membros vai exigir cadastro real em v0.2.0. Por
enquanto, o seed é o "estado canônico" da comunidade, e isso vale para
testes, demos, e qualquer reset.

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
