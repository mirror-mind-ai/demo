# A tríade processo-projeto-produto

Este documento estabelece um dos dois substratos conceituais sobre os
quais o [`development-guide.md`](development-guide.md) é construído.
O outro é o ritmo [`expand/collapse`](expand-collapse.md): a tríade
diz *em que dimensões* o trabalho acontece; expand/collapse diz *em
que cadência* ele se move dentro dessas dimensões. Os dois são
complementares e precisam ser lidos juntos.

---

## O que é a tríade

Todo trabalho de software acontece simultaneamente em três
dimensões:

- **Processo** — *como* o trabalho é feito. O método, o ritmo, o
  ritual, as convenções, os critérios de pronto.
- **Projeto** — *o quê* será feito, e *por quê*. O mapa, o roadmap,
  o briefing, as decisões registradas, os planos das stories.
- **Produto** — *a coisa em si*, rodando, com seus usuários reais. O
  código, o schema, os assets, a infraestrutura, o comportamento
  observável.

Essas três dimensões não são fases nem camadas — são planos paralelos
que coexistem o tempo todo. Em qualquer momento do projeto, todas
estão presentes, mesmo quando uma delas está temporariamente parada.

---

## Por que três e não uma

A tradição de engenharia tende a colapsar a tríade em uma única
dimensão: o produto. "Trabalho é mexer no produto." Tudo o mais
vira *overhead*, burocracia, "documentação", "processo".

Esse colapso é a origem de várias patologias clássicas:

- **Decisões que ninguém lembra por quê foram tomadas** — porque o
  projeto não foi escrito.
- **Processo que muda sem ser nomeado** — porque ninguém percebeu
  que mudar a forma de trabalho também é trabalho.
- **Produto que entrega o que não foi decidido** — porque a
  realidade do código se descolou do mapa do projeto.

A tríade resolve esse colapso ao **nomear cada dimensão como um
locus legítimo de mudança**. Atualizar o `development-guide.md` não
é meta-trabalho — é trabalho em processo. Registrar uma decisão no
`decisions.md` não é documentação burocrática — é trabalho em
projeto. Implementar uma feature é trabalho em produto.

Toda Unidade de Trabalho (ver
[`development-guide.md` → Taxonomia](development-guide.md#3-unidade-de-trabalho))
atua em uma ou mais dessas três dimensões. Frequentemente, nas três
ao mesmo tempo.

---

## Coerência entre as três

A tríade só funciona quando as três dimensões permanecem coerentes
entre si. Coerência aqui significa:

- O **produto** faz o que o **projeto** diz que ele deve fazer.
- O **projeto** é construído seguindo o **processo** vigente.
- O **processo** está documentado de forma que reflete como o
  trabalho está de fato sendo feito.

Quando uma dimensão muda, as outras duas precisam ser revisitadas.
Se o produto adquire um comportamento que o projeto não previu, ou
o projeto é atualizado, ou o produto é corrigido. Se o processo
muda na prática, o `development-guide.md` muda também.

Essa revisita não é opcional. O **Check de coerência** (passo 6 do
ciclo de uma story) é o ritual que garante que ela aconteça. Sem
ele, a tríade se desalinha em silêncio, e o projeto começa a perder
o contato consigo mesmo.

---

## Documentos por dimensão

Cada dimensão tem documentos canônicos no repositório:

### Processo
- [`development-guide.md`](development-guide.md) — modelo de
  desenvolvimento, taxonomia, ciclo de uma story.
- [`triad.md`](triad.md) — este documento.
- [`worklog.md`](worklog.md) — registro temporal do que foi feito.

### Projeto
- [`briefing.md`](../project/briefing.md) — decisões arquiteturais
  e de escopo, premissas vivas.
- [`decisions.md`](../project/decisions.md) — decisões incrementais
  numeradas (D1, D2, ...).
- [`roadmap/`](../project/roadmap/) — CVs, epics e stories.
- `plan.md` dentro de cada story — design e racional da
  implementação.

### Produto
- [`product/index.md`](../product/index.md) — visão.
- [`product/principles.md`](../product/principles.md) — princípios
  de produto.
- [`product/problem.md`](../product/problem.md) — o problema que o
  produto resolve.
- [`product/solution.md`](../product/solution.md) — a forma da
  solução.
- O código, schema, assets e infraestrutura sob a raiz do
  repositório.

---

## Relação com a taxonomia de progresso

A tríade não substitui a taxonomia de progresso (Valor → Progresso →
Trabalho); ela está por baixo dela. A taxonomia diz **em que escala**
o trabalho está sendo medido. A tríade diz **em que dimensão** o
trabalho está agindo. Os dois eixos são ortogonais e funcionam
juntos:

| | Processo | Projeto | Produto |
|---|---|---|---|
| **Valor (CV/BV)** | (raro) | mapa do CV no roadmap | capacidade do ecossistema |
| **Progresso (Epic/Story)** | refinamento de método | plano e decisões da story | nova capacidade do usuário |
| **Trabalho (Task)** | edita este doc | edita decisions/plan | edita código/schema |

Toda Unidade de Trabalho pode ser localizada nessa matriz. Stories
que "só mexem em código" estão na coluna *Produto*; stories que
"só atualizam doc de decisão" estão na coluna *Projeto*; stories
que "ajustam o ciclo" estão na coluna *Processo*. A maioria das
stories importantes atravessa as três colunas.
