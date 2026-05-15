# Roadmap

Onde o Conjunto está e para onde está indo.

---

## Onde estamos

**v0.1.0 lançada em 12 de maio de 2026.** CV0 (Tracer Bullet)
completo. Os sete fundadores podem entrar, ver os outros, abrir e ler
fios, navegar a biblioteca. O produto existe rodável, ainda só
localmente, ainda sem auth real, ainda sem pagamento.

Próxima entrega planejada: **CV0.E2 — Engajamento**, em curso.

## Estrutura

| Nível | Nome | O que é |
|-------|------|---------|
| **CV** | Community Value | Estágio de entrega com valor claro para os membros |
| **E** | Epic | Bloco coeso de trabalho com critério de "pronto" |
| **S** | Story | Entrega atômica do ponto de vista do membro |

---

## CV0 — Tracer Bullet

> **Objetivo:** o Conjunto existe como produto rodável, com os sete
> fundadores cadastrados, fios abertos, biblioteca em estado mínimo, e
> navegação básica funcional.

### [CV0.E1 — Tracer Bullet](cv0-foundation/cv0-e1-tracer-bullet/) ✅ `v0.1.0`

> **Status:** completo, lançado em 12/05/2026.
> **Critério de pronto:** rodar `npm run dev`, abrir o navegador, ver a
> home, navegar até um fio, ler as mensagens, navegar para o perfil de
> um membro, ler a biografia, abrir a documentação dentro do app.

| Código | Story | Status |
|--------|-------|--------|
| [`CV0.E1.S1`](cv0-foundation/cv0-e1-tracer-bullet/cv0-e1-s1-server-health/) | Tracer bullet servidor + health | ✅ |
| [`CV0.E1.S2`](cv0-foundation/cv0-e1-tracer-bullet/cv0-e1-s2-members/) | Membros listados e perfis lidos | ✅ |
| [`CV0.E1.S3`](cv0-foundation/cv0-e1-tracer-bullet/cv0-e1-s3-cookie-auth/) | Auth simulada por cookie | ✅ |
| [`CV0.E1.S4`](cv0-foundation/cv0-e1-tracer-bullet/cv0-e1-s4-threads/) | Fios e mensagens persistentes | ✅ |
| [`CV0.E1.S5`](cv0-foundation/cv0-e1-tracer-bullet/cv0-e1-s5-docs-inline/) | Documentação dentro do produto | ✅ |
| [`CV0.E1.S6`](cv0-foundation/cv0-e1-tracer-bullet/cv0-e1-s6-seed/) | Seed reprodutível dos fundadores | ✅ |

### [CV0.E2 — Engajamento](cv0-foundation/cv0-e2-engagement/) `v0.1.1` (em curso)

> **Objetivo:** os membros começam a ter pistas de quem está ativo,
> quem leu o quê, e como o grupo respira. Sem virar feed.
> **Critério de pronto:** ao abrir o perfil de um outro membro, vejo
> quando ele esteve online por último; ao abrir um fio, vejo quem leu
> a minha última mensagem.

| Código | Story | Status |
|--------|-------|--------|
| [`CV0.E2.S1`](cv0-foundation/cv0-e2-engagement/cv0-e2-s1-last-seen/) | Indicador de última vez online | 🔵 próxima |
| [`CV0.E2.S2`](cv0-foundation/cv0-e2-engagement/cv0-e2-s2-read-indicator/) | Indicador de leitura por mensagem | ⚪ planejada |
| [`CV0.E2.S3`](cv0-foundation/cv0-e2-engagement/cv0-e2-s3-active-members/) | Lista de membros ordenada por atividade | ⚪ planejada |

---

## CV1 — Encontros e biblioteca

> **Objetivo:** o produto digital sustenta o ritmo real de encontros e
> a curadoria de conteúdo.

(Detalhes serão escritos quando CV0 fechar.)

---

## CV2 — Abertura externa

> **Objetivo:** o Conjunto deixa de ser interno aos fundadores e abre
> para os primeiros assinantes externos.
> **Versões previstas:** v0.2.0 (auth real + pagamento), v0.2.1+
> (refinamentos).

(Detalhes serão escritos quando CV1 fechar.)

---

## v0.3.0 e além — Stack sofisticado

Quando houver mais de doze assinantes pagantes por mais de seis meses
contínuos, considero migrar o backend para Next.js + tRPC + Prisma. A
decisão é deliberadamente adiada (ver [D1](../briefing.md#d1-boring-stack-first)):
sem volume validado, sofisticação de stack é gasto sem retorno.

Sinais que vou observar para essa decisão:

- Latência da rota `/threads` passando de 200ms com >5000 mensagens.
- Necessidade de tipos compartilhados entre frontend e backend que o
  HTML server-rendered não cobre.
- Time crescendo (saio de solo).
