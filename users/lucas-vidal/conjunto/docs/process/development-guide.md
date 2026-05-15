# Development Guide

Como construo o Conjunto. Esse documento captura o modelo de
desenvolvimento herdado de XP e adaptado para um construtor solo
trabalhando com Mirror Mind. É vivo, atualizado a cada ciclo.

A mesma estrutura vale para qualquer projeto que adote essa
conceitualização — o Conjunto é a primeira encarnação concreta, não
uma exceção. Onde o texto fala de "Conjunto", leia "o projeto em
questão"; onde fala de "membros", leia "o ecossistema que o projeto
serve".

---

## Taxonomia: três níveis de progresso

Antes dos princípios, antes do ciclo, antes da estrutura de pastas:
precisa estar claro o que conta como progresso e em que nível.
Trabalho de software acontece em três escalas distintas, e
confundi-las é a causa raiz da maior parte da confusão de roadmap que
eu já vi. Os três níveis são, em ordem ascendente de concretude e
descendente de escopo:

### 1. Unidade de Valor

Um incremento de capacidade para o **ecossistema** que o projeto
serve. Quando uma Unidade de Valor é alcançada ou melhorada, o
ecossistema como um todo ganha — não um usuário individual, mas o
tecido coletivo que o produto sustenta.

O nome muda conforme a natureza do ecossistema:

- **CV — Community Value**: para projetos que servem uma comunidade.
  É o caso do Conjunto.
- **BV — Business Value**: para projetos que servem um negócio.
- Outras famílias são possíveis (OV — Organizational Value, PV —
  Public Value) e seguem o mesmo padrão.

Unidade de Valor responde à pergunta: *"o ecossistema mudou de
estado?"*. Se a resposta for não, não foi uma Unidade de Valor — foi
Progresso ou Trabalho. Exemplo no Conjunto: **"Membros conseguem
encontrar uns aos outros e iniciar conversas no ritmo certo"** é um
CV. **"O perfil mostra last seen"** não é — é Progresso dentro desse
CV.

### 2. Unidade de Progresso

Um bloco que entrega valor ao **usuário individual** do produto e
move o sistema em direção a uma Unidade de Valor. Conclusão de uma
Unidade de Progresso significa duas coisas simultaneamente: (a) um
usuário pode fazer algo novo ou melhor; (b) o projeto está mais
perto da próxima Unidade de Valor.

Unidades de Progresso estão **hierarquicamente associadas a uma
Unidade de Valor**. Toda Unidade de Progresso pertence a um e
apenas um CV/BV.

No vocabulário herdado de XP, a Unidade de Progresso costuma se
chamar **Epic**. Mas o rótulo é menos importante que a função: às
vezes uma Story isolada já é uma Unidade de Progresso, quando ela
sozinha entrega valor visível ao usuário sem precisar de um épico
envolvente. A taxonomia é **por função, não por rótulo**.

### 3. Unidade de Trabalho

Uma ação real de mudança em uma ou mais dimensões da **tríade
processo-projeto-produto**. É o nível mais concreto, o único onde
algo de fato é alterado em um arquivo, em um banco, em um documento,
em uma convenção.

A tríade é a chave para entender por que esse nível existe como
categoria própria:

- **Processo** — como o trabalho é feito. Este `development-guide.md`
  é processo. O `worklog.md` é processo. As convenções de Git são
  processo.
- **Projeto** — o mapa do que será feito e por quê. O roadmap, o
  briefing, o `decisions.md`, os `plan.md` de cada story são projeto.
- **Produto** — a coisa em si rodando para usuários reais. O código,
  o schema, os assets, a infraestrutura.

Toda Unidade de Trabalho atua em **uma ou mais** dessas três
dimensões. Implementar a coluna `last_seen_at`: trabalho em produto.
Registrar a decisão de não usar Next.js no MVP: trabalho em projeto.
Reescrever este parágrafo: trabalho em processo. Uma mesma story
frequentemente toca as três.

No vocabulário herdado, Unidade de Trabalho aparece como **Story** ou
**Task**. Story quando há narrativa de mudança; Task quando é
fragmento sub-story sem pretensão narrativa.

### Relação entre os três níveis

```
Unidade de Valor (CV / BV)
  └── Unidade de Progresso (Epic, às vezes Story)
        └── Unidade de Trabalho (Story, Task)
```

A hierarquia é **orientada, não estrita**:

- Toda Unidade de Progresso pertence a uma Unidade de Valor.
- A maior parte das Unidades de Trabalho pertence a uma Unidade de
  Progresso. Mas existe Trabalho legítimo que não escala para
  Progresso: manutenção, refator interno, ajuste de processo, fix
  de tipagem, atualização desta documentação. Esse Trabalho é
  reconhecido como categoria própria — não é Progresso disfarçado,
  não é dívida, é o tecido vivo da tríade.
- Uma Story pode aparecer em dois níveis dependendo do que carrega.
  Se entrega valor ao usuário direto, é Progresso *e* Trabalho ao
  mesmo tempo. Se é puramente interna, é só Trabalho.

### Estrutura física no repositório

A taxonomia se materializa na árvore de docs sob
`docs/project/roadmap/`:

| Nível | Pasta | Convenção de nome |
|-------|-------|-------------------|
| Unidade de Valor | `cvN-<slug>/` | `cv0-foundation`, `cv1-...` |
| Unidade de Progresso | `cvN-eM-<slug>/` | `cv0-e2-engagement` |
| Unidade de Trabalho | `cvN-eM-sK-<slug>/` | `cv0-e2-s1-last-seen` |

Cada nível tem um `index.md` para navegação. Unidades de Trabalho
que não pertencem a uma Unidade de Progresso vivem sob
`docs/project/maintenance/` — explicitamente fora do mapa narrativo
do roadmap, mas dentro do registro do projeto.

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
