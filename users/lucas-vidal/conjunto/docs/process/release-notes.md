# Release notes — storytelling

Este documento estabelece **como uma release note é escrita** neste
método. É o par narrativo de [`versioning.md`](versioning.md): a
versão dá o número, a release note dá a história. Sem a história, o
número é silencioso; sem o número, a história flutua sem âncora.

---

## O que uma release note é, para nós

Não é changelog. Não é lista de commits. Não é nota técnica.

Uma release note é **a narrativa curta e bem feita do fechamento de
um arco de trabalho**, ancorada em uma versão. É o artefato
linguístico do collapse final do ciclo: onde o valor emergente
recebe nome público (ver
[`expand-collapse.md`](expand-collapse.md)).

Quem lê uma release note bem escrita entende três coisas em poucos
parágrafos:

1. **De onde se vinha** — qual tensão, qual ponto de partida.
2. **O que aconteceu** — decisões, descobertas, viradas, o arco.
3. **O que isso significou** — o aprendizado, o horizonte, o que
   foi deixado de fora consciente.

Sem essas três, a release falhou como história, mesmo que esteja
correta como inventário.

---

## Princípios do storytelling

Oito princípios que orientam a escrita. Eles não são checklist; são
o ethos.

### 1. Tensão antes de resolução

Toda história precisa de tensão para ter peso. A seção "De onde
estávamos" não é cerimonial — é onde a tensão é estabelecida. Sem
ela, "O que foi feito" vira lista. *Por que* esse trabalho
aconteceu agora, *o que* estava em jogo, *o que* doía — isso é o
combustível da narrativa.

### 2. Específico sobre genérico

Detalhes concretos, sempre. "Sete fundadores cadastrados via seed"
em vez de "usuários adicionados". "Cookie com id do membro, trocado
na home" em vez de "auth implementada". O específico carrega o real;
o genérico evapora.

### 3. Decisões nomeadas, não só resultados

Software se faz de decisões, não só de código entregue. Quando algo
foi escolhido entre alternativas, a release note diz **o que foi
escolhido e por quê**. A escolha é o momento dramático do trabalho
— sem ela, a história é movimento sem direção.

### 4. Honestidade da discrepância

O que **não** entrou também é história. A seção "O que está
consciente fora deste lançamento" honra a coerência: separa o que
foi deixado por design do que foi esquecido. Release sem essa
seção tende a fingir que o entregue é o ideal — mentira sutil que
custa caro depois.

### 5. Primeira pessoa, voz narrativa

Não é changelog em voz passiva ("foi implementado", "foi
adicionado"). É primeira pessoa, com agência: "eu adiei", "eu
percebi", "eu escolhi". O agente está presente. A voz carrega o
fato de que houve alguém decidindo.

### 6. Sem promessas

A seção "Próximo" é **horizonte visível, sem promessa**. Mostra o
que está à mão, sem comprometer datas, sem prometer features. O
storytelling honra a incerteza do que ainda não foi feito. Promessa
quebrada custa mais que horizonte vago.

### 7. Marcadores de tempo reais

Datas, durações, referências temporais concretas ("cinco meses de
rascunho conceitual", "doze de maio de 2026"). Ancoram a história
no tempo real. Sem isso, releases parecem flutuar fora da vida.

### 8. Sensemaking, não reportagem

A seção "O que aprendi" é o coração do storytelling. É onde o
significado emerge da ação. Reportagem diz o que aconteceu;
storytelling diz o que aquilo significou para quem viveu. Sem
sensemaking explícito, o que sobra é um relato burocrático.

---

## Estrutura canônica

Cada release vive em `docs/releases/vMAJOR.MINOR.PATCH.md` com a
forma:

1. **Frontmatter YAML com `digest`** — um parágrafo de resumo,
   denso o suficiente para servir de índice em buscas futuras e
   para ser injetado em contextos externos (Mirror, divulgação,
   chamada de atenção). É a versão-relatório da release em uma
   respiração só. Tipicamente 4–6 frases.
2. **Título + data.**
3. **TL;DR em bullets** — cinco a sete pontos. Cada bullet é um
   fato concreto: o que foi entregue, decisões estruturantes, o
   que ficou de fora.
4. **Seções narrativas:**
   - **De onde estávamos** — contexto, tensão, ponto de partida.
   - **O que foi feito** — o arco em prosa.
   - **O que está consciente fora deste lançamento** — o que foi
     deixado de propósito, com justificativa.
   - **Próximo** — horizonte visível, sem promessa.

**Fortemente recomendada:** uma seção final **"O que aprendi"** com
sensemaking explícito — o que esse ciclo me ensinou sobre o produto,
o método, ou sobre mim. Não é obrigatória, mas releases sem ela
tendem a perder a camada mais valiosa do registro: a que se acumula
ao longo do tempo e revela padrões que nenhum ciclo isolado mostra.

A [`v0.1.0.md`](../releases/v0.1.0.md) é a referência viva dessa
estrutura.

---

## Como escrever cada seção

### `digest` (frontmatter)

Quatro a seis frases. Tem que sobreviver fora do contexto: alguém
lendo só o digest deve entender o que essa release é. Mencione a
unidade taxonômica fechada (qual CV/Epic), a decisão mais
estruturante, e o estado em que o produto fica depois. Escreva
último, depois que o resto da release está pronto.

### TL;DR

Cinco a sete bullets. Não é resumo da prosa — é uma lista paralela
de **fatos concretos**. Cada bullet pode ser longo se precisar,
mas tem que ser fato, não impressão. Decisões estruturantes
aparecem aqui, com link para onde estão registradas
(`briefing.md`, `decisions.md`).

### De onde estávamos

Parágrafos curtos. Estabelece **a tensão**: o que estava em jogo,
o que estava parado, o que doía, qual era a dúvida não resolvida.
Pode incluir referências temporais ("cinco meses de rascunho").
Esta seção é a **abertura dramática** — sem ela, o resto vira
inventário.

### O que foi feito

O arco em prosa, primeira pessoa. Não é lista de commits. É a
narrativa de como o trabalho desenrolou: decisões tomadas no
caminho, surpresas, viradas, momentos em que o plano mudou. Pode
ter subseções se o arco for grande. Mencione código concreto, mas
o foco é a narrativa de **como o ecossistema chegou ao estado
atual**.

### O que está consciente fora deste lançamento

Lista ou prosa curta. Cada item: o que foi deixado de fora **e
por quê**. Distingue entre "deixei por escopo" (vai entrar depois)
e "decidi não fazer" (não vai entrar). Esta seção é onde a
honestidade vira coerência operacional — sem ela, a próxima
release fica órfã de contexto.

### O que aprendi *(fortemente recomendada)*

Sensemaking. Primeira pessoa, sem performance. O que esse ciclo
revelou sobre o produto, sobre o método, sobre mim como
construtor. Pode ser reflexão crítica ("achei que X, descobri que
Y"), pode ser refinamento de princípio ("isso me ensinou que
Z"), pode ser observação sobre o próprio processo ("notei que
quando A, então B"). É a camada que se acumula no tempo e revela
padrões invisíveis ciclo a ciclo.

### Próximo

Parágrafo curto. **Horizonte, não promessa.** O que está à mão,
o que pode vir, sem datas, sem comprometimento. Storytelling honra
a incerteza do que ainda não foi feito.

---

## A priori e a posteriori

O conteúdo de uma release pode existir em dois modos:

- **A priori** — o escopo do release é declarado antes do trabalho.
  Geralmente quando um Epic está desenhado no roadmap com Stories
  claras. A release note final tende a confirmar a intenção, com
  ajustes registrados em "O que está consciente fora deste
  lançamento".
- **A posteriori** — o escopo do release **não** é declarado antes.
  Trabalho prossegue por sessões, sem destino nomeado. Em algum
  momento, no final, reconheço que uma unidade coerente emergiu — e
  é nesse momento que ela ganha nome, versão e release note. O
  conteúdo é definido na **discrepância entre o que era e o que foi
  feito**, não em planejamento prévio.

Os dois modos são legítimos. A posteriori é a forma natural quando
estou em território exploratório (CVs novos, redesigns, mudanças de
método); a priori é a forma natural quando estou em território
conhecido (Epics dentro de um CV já estabelecido). Forçar a priori
em território exploratório empobrece o que vai emergir; ficar a
posteriori em território conhecido apaga o horizonte.

O [Ritual de abertura](development-guide.md#ritual-de-abertura)
registra qual modo está em operação para o próximo release.

**Implicação para o storytelling:** releases a priori tendem a ter
"De onde estávamos" mais focada na tensão original que motivou o
epic; releases a posteriori tendem a ter "De onde estávamos" como
reconstrução retrospectiva do arco que se revelou. Em ambos os
casos, o princípio é o mesmo — só a fonte da tensão narrativa
muda.

---

## Relação com versionamento

A release note dá identidade narrativa ao que o número codifica
genericamente. O número diz "um CV foi entregue" (MAJOR bump) ou
"um epic fechou" (MINOR bump); a release note diz **qual** CV,
**qual** epic, **como** chegou ali, **o que** significou.

Ver [`versioning.md`](versioning.md) para a regra dos números. Os
dois docs são complementares e devem ser lidos juntos.

---

## Anti-padrões a evitar

Quatro modos de release note falhar mesmo quando está
estruturalmente correta:

1. **Changelog disfarçado.** Lista de mudanças com prosa fina por
   cima. Sintoma: sem "De onde estávamos", sem decisões nomeadas,
   sem "O que aprendi".
2. **Voz passiva pervasiva.** "Foi implementado", "foi adicionado",
   "foi corrigido". Sintoma: ninguém parece ter feito nada — o
   software se construiu sozinho.
3. **Promessa disfarçada de horizonte.** "Próximo" virando lista
   de features comprometidas com datas. Sintoma: a próxima release
   começa explicando por que tal coisa não entrou.
4. **Ausência de discrepância.** Tudo o que foi pensado entrou,
   nada ficou de fora. Sintoma: não é honesto. Não existe ciclo
   sem coisas deixadas para depois — se a release não menciona,
   ela está mentindo por omissão.
