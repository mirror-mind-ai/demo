# Development Guide

Esse documento captura o modelo de desenvolvimento no projeto
Conjunto, que deve ser utilizado na implementação de qualquer
alteração no seu produto principal ou na criação de novos produtos.

O ponto de partida conceitual são dois conceitos que sustentam tudo
o que vem depois:

- A **tríade processo-projeto-produto** — o substrato *em que
  dimensões* o trabalho acontece. Detalhada em
  [`triad.md`](triad.md).
- O ritmo **expand/collapse** — *em que cadência* o trabalho se
  move dentro dessas dimensões. Detalhado em
  [`expand-collapse.md`](expand-collapse.md).

As seções seguintes assumem essas duas leituras. Antes de
continuar, leia os dois documentos.

---

## Ritmo: expand e collapse

Todo trabalho neste método segue o mesmo arco: **unidade →
fragmentação vivida → unidade reconquistada em nível mais alto**.
A unidade do fim não é a mesma do início — é o que emerge depois
de se atravessar a multiplicidade.

Esse arco se executa em dois movimentos alternados:

- **Expand** — diferencia, nomeia, separa, reduz ambiguidade.
- **Collapse** — reintegra, relaciona, sintetiza, gera valor.

Nenhum dos dois é melhor que o outro. Eles são complementares e
mutuamente dependentes: uma parte sem conexão com o todo vira
ruído; um todo sem partes não se manifesta. **Valor nasce quando os
dois movimentos ficam conscientes e intencionais.**

O objetivo operacional é **eliminar ambiguidade sob demanda**.
Quando ambiguidade trava o trabalho, expand. Quando fragmentação
destrói sentido, collapse. Maturidade do método é saber qual
movimento o momento pede.

A próxima seção (Taxonomia) é expand/collapse cristalizado em
estrutura. O Ciclo de uma story (adiante) é expand/collapse
executado no tempo. Os dois são leituras do mesmo ritmo.

Ver [`expand-collapse.md`](expand-collapse.md) para o tratamento
conceitual completo.

---

## Taxonomia: três níveis de progresso

Antes dos princípios, antes do ciclo, antes da estrutura de pastas:
precisa estar claro o que conta como progresso e em que nível.
Trabalho de software acontece em três escalas distintas. Os três
níveis são, em ordem ascendente de concretude e descendente de
escopo:

### 1. Unidade de Valor

Um incremento de capacidade para o **ecossistema** que o projeto
serve. Quando uma Unidade de Valor é alcançada ou melhorada, o
ecossistema como um todo ganha — não um usuário individual, mas o
tecido coletivo que o produto sustenta.

O nome muda conforme a natureza do ecossistema:

- **CV — Community Value**: para projetos que servem uma comunidade.
  É o caso do Conjunto.
- **BV — Business Value**: para projetos que servem um negócio.
- Outras famílias seguem o mesmo padrão (sigla de duas letras
  terminando em V, conforme a natureza do ecossistema).

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

No nosso vocabulário, Unidades de Progresso aparecem como **Epic** e
**Story**. Epic é apenas uma história grande — existe porque
contém várias histórias menores, e cada uma dessas histórias menores
é também uma Unidade de Progresso. A regra prática: um Epic só
existe quando há várias Stories nele. Stories sem Epic existem como
caso raro: é uma história sozinha, sem irmãs, que entrega valor por
si só.

**O roadmap só vai até este nível.** Tudo o que aparece no roadmap
é Valor ou Progresso. Trabalho não está no roadmap.

### 3. Unidade de Trabalho

Uma ação real de mudança em uma ou mais dimensões da **tríade
processo-projeto-produto**. É o nível mais concreto, o único onde
algo de fato é alterado em um arquivo, em um banco, em um documento,
em uma convenção.

A tríade é a chave para entender por que esse nível existe como
categoria própria. Toda mudança acontece em uma ou mais dessas três
dimensões, e cada uma tem seus documentos canônicos:

- **Processo** — como o trabalho é feito.
  [`development-guide.md`](development-guide.md) (este documento),
  [`triad.md`](triad.md), [`worklog.md`](worklog.md),
  e as convenções de Git mais adiante.
- **Projeto** — o mapa do que será feito e por quê.
  [`briefing.md`](../project/briefing.md),
  [`decisions.md`](../project/decisions.md),
  [`roadmap/`](../project/roadmap/), e os `plan.md` dentro de cada
  story.
- **Produto** — a coisa em si rodando para usuários reais.
  [`product/index.md`](../product/index.md),
  [`principles.md`](../product/principles.md),
  [`problem.md`](../product/problem.md),
  [`solution.md`](../product/solution.md), e o código, schema, assets
  e infraestrutura que os realizam.

Toda Unidade de Trabalho atua em **uma ou mais** dessas três
dimensões. Implementar a coluna `last_seen_at`: trabalho em produto.
Registrar a decisão de não usar Next.js no MVP: trabalho em projeto.
Reescrever este parágrafo: trabalho em processo. Uma mesma mudança
frequentemente toca as três.

No nosso vocabulário, Unidade de Trabalho aparece como **Task**. Task
é o fragmento operacional — não pretende narrar nada, não pretende
entregar valor sozinha. É pura mutação da tríade. Tasks vivem
dentro de uma Story, não como pastas próprias no roadmap.

### Relação entre os três níveis

```
Unidade de Valor       (CV / BV)
  └── Unidade de Progresso  (Epic)
        └── Unidade de Progresso  (Story)
              └── Unidade de Trabalho  (Task)
```

Lida de cima para baixo, essa hierarquia é uma cadeia de **expands**:
Valor se diferencia em Epics, Epics em Stories, Stories em Tasks.
Lida de baixo para cima, é uma cadeia de **collapses**: Tasks
executadas colapsam em Story pronta, Stories prontas colapsam em
Epic concluído, Epics concluídos colapsam em CV alcançado. A
hierarquia não é arbitrária — é o ritmo de expand/collapse
congelado em forma.

A hierarquia é **orientada, não estrita**:

- Toda Unidade de Progresso pertence a uma Unidade de Valor.
- Um Epic só existe quando contém várias Stories. Stories podem,
  excepcionalmente, viver sem Epic.
- A maior parte das Tasks pertence a uma Story. Mas existe Trabalho
  legítimo que não escala para Progresso: manutenção, refator
  interno, ajuste de processo, fix de tipagem, atualização desta
  documentação. Esse Trabalho é reconhecido como categoria própria
  — não é Progresso disfarçado, não é dívida, é o tecido vivo da
  tríade. Vive sob `docs/project/maintenance/`, fora do mapa
  narrativo do roadmap, mas dentro do registro do projeto.

### Estrutura física no repositório

A taxonomia se materializa na árvore de docs sob
`docs/project/roadmap/`:

| Nível | Pasta | Convenção de nome |
|-------|-------|-------------------|
| Unidade de Valor | `cvN-<slug>/` | `cv0-foundation`, `cv1-...` |
| Unidade de Progresso (Epic) | `cvN-eM-<slug>/` | `cv0-e2-engagement` |
| Unidade de Progresso (Story) | `cvN-eM-sK-<slug>/` | `cv0-e2-s1-last-seen` |

Cada nível tem um `index.md` para navegação. Tasks **não** viram
pastas — são listadas dentro do `index.md` (ou de um `tasks.md`) da
Story a que pertencem. Trabalho fora do roadmap vive sob
`docs/project/maintenance/`.

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

Refatoração não é fase separada — é consequência do Ritual de Review.
É lá que descubro o que precisa ser refatorado, e refatoro dentro do
mesmo ciclo da story. Não acumulo dívida. Documento o que refatorei
e o que avaliei e deixei para depois, com critério de revisita.

### Testes verdes em todo commit

Sem exceções. Unit tests com `:memory:` SQLite (sem mocks). Smoke
tests para CLI quando houver. Cada commit deixa todos os testes
passando.

### Documentação viva

Docs são o mapa, não burocracia. São atualizadas em cada ciclo, não
depois. Se alguém abrir o repo amanhã, ele entende o que foi feito,
por quê, e o que vem a seguir, sem precisar perguntar.

---

## Ritual de abertura

No começo de cada sessão de trabalho — antes de abrir editor, antes
de voltar ao plano, antes de qualquer movimento — faço três
perguntas a mim mesmo. É rápido, mas não pode ser pulado. O ritual
existe para não cometer o pior erro do método: **fazer o movimento
errado no momento errado** (expandir quando o trabalho pede
integração, ou colapsar quando ainda pede diferenciação).

As três perguntas:

1. **"Estou travado por ambiguidade?"**
   Sintomas: não sei por onde começar, opções se misturam, parece
   que tudo é a mesma coisa, ou tudo é coisa diferente sem nome.
   Movimento indicado: **expand** — diferenciar, nomear, separar.

2. **"Estou perdido em fragmentos?"**
   Sintomas: tenho muitas partes prontas mas não vejo o todo,
   sensação de que nada se conecta, valor invisível, cansaço sem
   progresso.
   Movimento indicado: **collapse** — reintegrar, relacionar,
   nomear o todo.

3. **"Está fluindo?"**
   Sintomas: o próximo passo é óbvio, há cadência, não há atrito.
   Movimento indicado: **nenhum movimento forçado**. Continuar no
   passo do ciclo onde estou. O ritmo natural basta.

A resposta à pergunta determina o tipo de trabalho da sessão, não
necessariamente em qual passo do ciclo estou. Posso estar no passo
2 (Implementação) e perceber que o que falta não é mais código, é
collapse — então a sessão é de leitura, doc, ou pausa, não de
implementação forçada.

### Intenção de release

Junto às três perguntas, o ritual pode registrar a **intenção de
release**: "o que eu gostaria que entrasse no próximo lançamento?".

Essa intenção não é obrigatória nem definitiva. Ela existe em dois
modos legítimos (ver [Release notes](#release-notes) adiante):

- **Modo a priori** — já sei o contorno do próximo release ("v0.2.0
  abre o produto externamente: auth real, magic link, pagamento").
  A intenção vira âncora para as sessões seguintes.
- **Modo a posteriori** — ainda não sei o que o próximo release
  vai ser. Trabalho prossegue; em algum momento, olhando para trás,
  reconheço que uma unidade coerente emergiu, e aí nomeio. A
  intencionalidade vem da escuta, não do planejamento.

Nenhum dos modos é melhor. Modo a priori funciona quando há um
horizonte claro e tensão de entrega. Modo a posteriori funciona
quando estou em território exploratório e forçar nome cedo
empobreceria o que vai emergir.

Ver [`expand-collapse.md`](expand-collapse.md) para a base
conceitual.

---

## Ciclo de uma story

Cada passo é anotado com seu movimento dominante de expand/collapse
(ver [`expand-collapse.md`](expand-collapse.md)).

### 1. Plano *(expand)*

Para stories não-triviais, entro em modo plano. Exploro o código,
desenho a abordagem, documento o porquê das escolhas. O plano vai
para o `plan.md` da story. Não é um documento curto: tem que ser
suficiente para outra pessoa entender a decisão sem perguntar.
Aqui as alternativas emergem e fronteiras são desenhadas.

### 2. Implementação *(expand)*

Escrevo o código seguindo o plano. Commits em chunks lógicos. Cada
commit deixa os testes passando. O código materializa as partes
desenhadas no plano.

### 3. Teste *(proto-collapse)*

Depois da implementação, gero o `test-guide.md` da story. Ele
resume:

- **Testes automatizados** criados nesta story: o que cada um cobre,
  como rodá-los, e o resultado da última execução.
- **Roteiro de teste manual**: os passos que um humano segue para
  validar que a story funciona no produto rodando.

Rodo os testes automatizados e executo o roteiro manual. Só depois
de confirmar que o teste manual funciona, avanço para o próximo
estágio. Sem essa confirmação, a story volta para implementação.

### 4. Documentação *(collapse narrativo)*

Toda story precisa ter docs antes de ser marcada como pronta. O
conteúdo mínimo é o `index.md`:

- **`index.md`** — sempre. Visão geral: problema, solução, status,
  lista de tasks executadas.
- **`plan.md`** — quando há design que vale registrar. Alternativas
  consideradas, schema changes, trade-offs.
- **`test-guide.md`** — produzido no passo 3.
- **`refactoring.md`** — produzido pelo Ritual de Review (passo 5)
  quando ele gera commits ou itens parqueados.

### 5. Ritual de Review *(re-expand)*

Antes de fechar a story, conduzo o Ritual de Review. Não é
checklist, é leitura encenada. Seleciono blocos do que foi produzido
— trechos de código, mudanças de schema, parágrafos de doc — e os
revejo acompanhados do **racional das decisões** que levou a cada
um. Cada bloco entra na revisão com seu "por quê" ao lado.

É no Review que descubro a necessidade de refatoração. O que sair
daqui como refator vai para o mesmo ciclo da story (não fica para
depois) e é registrado no `refactoring.md`. O que for parqueado
para depois entra no mesmo arquivo, com critério de revisita.

### 6. Check de coerência *(collapse estrutural)*

Última fase antes de marcar como pronto. Responde a uma única
pergunta: **"será que esquecemos alguma coisa?"**

Não é o mesmo que o Review. O Review olha o que foi feito; o Check
olha o que pode estar faltando. Áreas que sempre passam por essa
leitura:

- **Docs derivados atualizados.** README, briefing, decisions,
  `docs/index.md`, todos os índices de roadmap (CV, Epic, Story),
  worklog.
- **Status em todos os níveis.** Story marcada ✅, epic com a story
  tirada da lista de pendentes, CV com a contagem certa.
- **Disciplina de citação de releases.** Toda menção a uma versão
  `v0.X.Y` em qualquer doc é um link markdown para o arquivo de
  release note. Quando uma story fecha e gera uma nova release,
  esse passo verifica que cada citação da nova versão ficou linkada.
  Regra completa em [`release-notes.md`](release-notes.md#disciplina-de-citação-e-links).
- **Consistência código ↔ plano.** O que foi implementado bate com
  o `plan.md`. Onde divergiu, a divergeria está nomeada no
  `refactoring.md` ou na release note.
- **Links internos são reais.** Cada link relativo em docs novos
  ou modificados aponta para um arquivo que existe.
- **`test-guide.md` realmente suficiente.** Alguém com acesso ao repo
  consegue validar a story só com o guide na mão.
- **Páginas visíveis do produto.** Se a story muda algo que aparece
  ao usuário (home, rodapé, página de membro), confirmar que essa
  superfície foi atualizada — doc atualizada não substitui produto
  atualizado.
- **Sweep semantico quando uma decisão muda significado de versões.**
  Se a story registrou uma decisão que reescreve o que um número
  significa (ex: D8 ressignificou v0.2.0 como Editorial em vez de
  Abertura externa), **toda menção a versões no projeto inteiro**
  precisa ser revisitada. Não basta atualizar a doc da story atual.
  Comando prático:

  ```bash
  grep -rn 'v[0-9]\+\.[0-9]\+\.[0-9]\+\|v[0-9]\+\.[0-9]\+' \
    docs/ identity/ README.md --include='*.md' --include='*.yaml'
  ```

  Cada match é lido com a nova semantica em mente. Referências que
  promet[em] feature para um número específico v[i]ram referências
  a **CV/Epic** (ou a evento, como "quando houver tração"), seguindo
  o princípio de
  [`versioning.md` § Trabalho em paralelo entre CVs](versioning.md#trabalho-em-paralelo-entre-cvs):
  *a versão não codifica o roadmap*. Referências históricas
  ("lançada como v0.X.Y") ficam.

  Saltar este sweep é a falha de coerência mais comum, e ela é
  silenciosa: doc passa a mentir aos poucos, sessões futuras herdam
  a mentira, agente carregando o briefing detecta a contradição e
  questiona. O sweep cura na origem.

Se algo aparecer, volta para o passo correspondente. Só quando o
Check fecha sem pendências é que a story pode ser marcada como
pronta.

### 7. Status *(collapse reconhecido)*

Quando o Check de coerência fecha:

- Marco a story ✅ no roadmap.
- Atualizo o status do epic.
- Atualizo o `worklog.md`.

### 8. Commit + push *(collapse nomeado)*

Commits acontecem ao longo do ciclo, em chunks lógicos. Push
acontece **preferencialmente por epic** — quando o conjunto de
stories que forma o epic está fechado, faço o push do epic inteiro.
Em casos justificados (urgência, story sem epic, bloqueio
externo), o push pode ser por story. A release note associada é o
artefato linguístico do collapse: é onde o valor emergente recebe
nome. Estrutura e convenções na próxima seção.

---

## Disciplina de pausa

O ciclo de 8 passos não se executa em sequência ininterrupta. Story
é trabalho colaborativo, não autopilot. Existem **quatro checkpoints
obrigatórios**, e em cada um o trabalho para de verdade e espera sinal
explícito de quem decide antes de continuar:

1. **Após o passo 1 (Plano).** O plano é apresentado em resumo —
   alternativas consideradas, decisões, trade-offs aceitos, versão
   pretendida. Código só começa depois da confirmação.
2. **Após o passo 3 (Teste verde + smoke test).** Antes da
   documentação e do review, a funcionalidade é validada manualmente.
   Não se avança com testes verdes apenas; o critério é humano viu
   funcionando.
3. **Após o passo 5 (Ritual de Review + `refactoring.md`).** O que
   saiu do review — decisões novas, refator feito, itens parqueados
   — é apresentado antes do Check de Coerência. É a última janela
   limpa para mudar de direção antes de fechar a story.
4. **Antes do passo 8 (Commit + push).** A mensagem de commit é
   apresentada e revisada antes de virar histórico.

Entre checkpoints, o trabalho flui sem pedir confirmação a cada
arquivo. **Nos checkpoints, para de verdade**. "Segue" ou "vá em
frente" libera até o próximo checkpoint, não até o fim.

### Por que pausar

A pausa não é fricção, é onde o valor humano entra. No checkpoint 1,
o plano pode estar tecnicamente correto e narrativamente errado para
o produto. No checkpoint 2, o teste pode estar verde e a experiência
ainda parecer um campo de formulário. No checkpoint 3, o review pode
revelar que uma decisõo de design pede repensar antes de comitar. No
checkpoint 4, a mensagem de commit consolida a narrativa do que
foi feito.

Pular pausa transforma o método em execução automática, e o agente
em operador. O trabalho que importa acontece **na conversa entre
passos**, não dentro deles.

---

## Release notes

Uma release note, para nós, não é changelog. É **storytelling +
versionamento**: a narrativa curta e bem feita de um arco de
trabalho que se fechou, ancorada em uma versão nomeada. Ela é o
artefato linguístico do collapse final do ciclo — onde o valor
emergente recebe nome público.

Dois eixos governam a release note, e cada um tem documento
próprio:

- **Narrativa** — como a história é escrita, princípios de
  storytelling, estrutura canônica das seções, modo a priori vs a
  posteriori, anti-padrões. Em
  [`release-notes.md`](release-notes.md).
- **Versionamento** — como o número é atribuído, relação com a
  taxonomia, trajetórias paralelas, casos de borda. Em
  [`versioning.md`](versioning.md).

Os dois são complementares e devem ser lidos juntos. A `v0.1.0.md`
é a referência viva de ambos.

---

## Convenções de Git

- Commits em **português ou inglês**, descritivos, focados em "por quê"
  mais do que "o quê".
- Sem force push em main.
- Push preferencialmente por epic (ver passo 8 acima).

---

## Estrutura de documentação

```
docs/
├── index.md                  ← entrada principal
├── product/
│   ├── index.md
│   ├── principles.md         ← princípios de produto
│   ├── problem.md
│   └── solution.md
├── process/
│   ├── development-guide.md  ← este documento
│   ├── triad.md              ← tríade processo-projeto-produto
│   ├── expand-collapse.md    ← ritmo operacional do método
│   ├── release-notes.md      ← storytelling de releases
│   ├── versioning.md         ← versionamento e relação com a taxonomia
│   └── worklog.md            ← o que foi feito por dia
├── project/
│   ├── briefing.md           ← decisões arquiteturais (inclui stack — D1)
│   ├── decisions.md          ← decisões incrementais
│   ├── roadmap/              ← CVs, epics, stories
│   └── maintenance/          ← trabalho fora do roadmap
└── releases/                 ← release notes narrativas
```

**Coerência é obrigação, não cortesia.** Cada mudança feita na
tríade processo-projeto-produto tem que se refletir nos documentos
desta árvore. Se mudei o stack, briefing e decisions mudam. Se
mudei o ciclo de uma story, este documento muda. Se mudei o que o
produto faz, `product/` muda. O Check de coerência (passo 6 do
ciclo) existe para garantir isso a cada story — mas o princípio é
geral: docs derivam da realidade, não a precedem nem a contradizem.

> **Stack técnico:** registrado em
> [`briefing.md` → D1](../project/briefing.md#d1-boring-stack-first)
> e em [`decisions.md` → D1](../project/decisions.md#d1--boring-stack-first).
> Este documento não duplica essa decisão.
