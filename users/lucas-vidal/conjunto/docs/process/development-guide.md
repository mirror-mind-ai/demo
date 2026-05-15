# Development Guide

Como construo o Conjunto. Esse documento captura o modelo de
desenvolvimento herdado de XP e adaptado para um construtor solo
trabalhando com Mirror Mind. É vivo, atualizado a cada ciclo.

---

## Princípios

### Design antes de código

Nenhuma linha de código sem decisão registrada e plano alinhado.
Trabalho não-trivial entra em modo plano: exploro o codebase, desenho a
abordagem, escrevo. O plano vira o `plan.md` da story. Só então abro o
editor.

### Histórias pequenas, validação imediata

Cada story termina com um "funciona" concreto. Pode ser um curl que
responde, um teste que passa, uma página que carrega, uma mensagem que
aparece no produto. Sem validação visível, não está pronto.

### Refatoração no ciclo

Logo depois de implementar e testar, avalio refatoração. Não acumulo
dívida. Documento o que refatorei e o que avaliei e deixei para depois,
com critério de revisita.

### Testes verdes em todo commit

Sem exceções. Unit tests com `:memory:` SQLite (sem mocks). Smoke
tests para CLI quando houver. Cada commit deixa todos os testes
passando.

### Documentação viva

Docs são o mapa, não burocracia. São atualizadas em cada ciclo, não
depois. Se alguém abrir o repo amanhã, ele entende o que foi feito,
por quê, e o que vem a seguir, sem precisar perguntar.

---

## Hierarquia do roadmap

| Nível | Nome | O que é |
|-------|------|---------|
| **CV** | Community Value | Estágio de entrega com valor claro para os membros |
| **E** | Epic | Bloco coeso de trabalho com critério de "pronto" |
| **S** | Story | Entrega atômica do ponto de vista do membro |

Cada nível tem uma pasta sob `docs/project/roadmap/` com um
`index.md` para navegação.

---

## Ciclo de uma story

### 1. Plano

Para stories não-triviais, entro em modo plano. Exploro o código,
desenho a abordagem, documento o porquê das escolhas. O plano vai
para o `plan.md` da story. Não é um documento curto: tem que ser
suficiente para outra pessoa entender a decisão sem perguntar.

### 2. Implementação

Escrevo o código seguindo o plano. Commits em chunks lógicos. Cada
commit deixa os testes passando.

### 3. Teste

Rodo os testes automatizados (`npm test`). Faço a verificação manual
descrita no `test-guide.md`. Confirmo que funciona antes de marcar
como pronto.

### 4. Documentação

Toda story precisa ter docs antes de ser marcada como pronta. O
conteúdo mínimo é o `index.md`:

- **`index.md`** — sempre. Visão geral: problema, solução, status.
- **`plan.md`** — quando há design vale registrar. Alternativas
  consideradas, schema changes, trade-offs.
- **`test-guide.md`** — quando precisar guiar um validador humano
  através de passos manuais.
- **`refactoring.md`** — produzido pela passada de revisão (passo 5)
  quando ela produz commits ou items parqueados.

### 5. Passada de revisão

Antes de marcar como pronto, leio os artefatos produzidos como um
todo. Não é checklist, é leitura. Procuro deriva (docs que não
batem com o código), código morto, duplicação, naming ou escopo
inconsistente que escapou na implementação.

### 6. Status

Quando a revisão fecha:

- Marco a story ✅ no roadmap.
- Atualizo o status do epic.
- Atualizo o `worklog.md`.

### 7. Commit + push

Uma story = um push, mesmo quando contém vários commits.

---

## Stack escolhido

**Backend e frontend:**
- TypeScript em todo lugar.
- Hono como framework HTTP (server-rendered HTML, sem SPA).
- better-sqlite3 como banco.
- marked para renderizar markdown da documentação dentro do app.
- vitest para testes.

**Decisão registrada em [D1](../project/decisions.md#d1).** Esse é o
stack do MVP. Quando houver tração validada (receita recorrente de
mais de doze membros pagantes por seis meses), considero a migração
para Next.js + tRPC + Prisma como plano [v0.3.0](../project/roadmap/index.md).
Antes disso, qualquer sofisticação de stack é prematura.

---

## Convenções de Git

- Commits em **português ou inglês**, descritivos, focados em "por quê"
  mais do que "o quê".
- Sem force push em main.
- Push acontece no final da story, não a cada commit.

---

## Estrutura de documentação

```
docs/
├── index.md                  ← entrada principal
├── product/
│   └── principles.md         ← princípios de produto
├── process/
│   ├── development-guide.md  ← este documento
│   └── worklog.md            ← o que foi feito por dia
├── project/
│   ├── briefing.md           ← decisões arquiteturais
│   ├── decisions.md          ← decisões incrementais
│   └── roadmap/              ← CVs, epics, stories
└── releases/                 ← release notes narrativas
```
