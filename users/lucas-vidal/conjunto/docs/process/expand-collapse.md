# Expand e collapse

Este documento estabelece o **ritmo operacional** sobre o qual todo o
[`development-guide.md`](development-guide.md) é construído.
Complementa a [`triad.md`](triad.md): a tríade diz *em que dimensões*
o trabalho acontece; expand/collapse diz *em que ritmo* o trabalho
se move dentro dessas dimensões.

---

## O padrão

Toda construção significativa segue o mesmo arco:

> Unidade → fragmentação vivida → unidade reconquistada em um nível
> mais alto.

A unidade do fim não é a mesma do início. É o que emerge depois de
se atravessar a multiplicidade. Indivíduo é o que não se divide —
mas só se torna indivíduo quem se divide primeiro.

Esse arco se executa em dois movimentos que se alternam:

- **Expand** — diferencia, nomeia, separa, reduz ambiguidade.
- **Collapse** — reintegra, relaciona, sintetiza, gera valor.

Nenhum dos dois é "melhor". Eles são complementares e mutuamente
dependentes:

> Uma parte sem conexão com o todo vira ruído.
> Um todo sem partes não se manifesta.
> Valor nasce quando os dois movimentos ficam conscientes e
> intencionais.

---

## Os dois movimentos em detalhe

### Expand

Movimento de diferenciação. Toma uma unidade ambígua e a separa em
partes nomeadas com fronteiras explícitas. Para conduzir um expand,
três elementos precisam estar à mesa:

- **O que está para se dividir** — a unidade-fonte, ainda indistinta.
- **As partes emergentes nomeadas** — cada uma com nome próprio,
  fronteira clara, critério de distinção em relação às irmãs.
- **A tensão que justifica** — por que essa divisão precisa
  acontecer agora. Sem tensão, expand é fragmentação gratuita.

### Collapse

Movimento de reintegração. Toma um conjunto de partes diferenciadas
e as reúne em uma unidade superior, portadora de valor emergente.
Também três elementos:

- **Unificação** — o ato de reconhecer que as partes pertencem juntas.
- **As partes sendo reunidas** — explicitar quais partes entram no
  todo (não todas as partes existentes, necessariamente).
- **O nome do todo e o valor emergente** — o todo precisa ser
  nomeado, e o valor que emerge dele precisa ser dito.

Collapse sem nome é integração silenciosa que ninguém vê. Por isso
o ato de **nomear o todo** é constitutivo, não cosmético.

---

## Por que isso é meta-design operacional

O que esse padrão cristaliza é raro: **separar atenção por eixos sem
perder unidade de valor**. Quatro propriedades fortes:

- **Semântica como mecanismo de controle** — nomear não é descrever,
  é controlar. Nomes definem o que é uma parte legítima e o que é
  ruído.
- **Expand/collapse com critério explícito** — toda divisão carrega
  a tensão que a justifica; toda reintegração carrega o valor que
  emerge dela.
- **Nomeação → distinção → especialização** como pipeline de
  raciocínio — primeiro nomeia, depois distingue, depois aprofunda
  cada parte.
- **Reintegração orientada a valor** — collapse não é só "juntar
  partes"; é juntar partes *em torno de um valor* que justifica o
  todo.

Em termos operacionais:

- **Objetivo:** eliminar ambiguidade sob demanda.
- **Mecânica:** *expand* (diferencia) ↔ *collapse* (reintegra).
- **Critério de qualidade:** nenhuma parte solta, nenhum todo vazio.
- **Resultado:** hierarquia semântica + regras de trânsito entre
  níveis de conceito.

A palavra-chave é **"sob demanda"**. Não é sempre-expandir nem
sempre-colapsar. É responsivo: quando ambiguidade trava o trabalho,
expand. Quando fragmentação destrói sentido, collapse. Maturidade
do método é saber qual movimento o momento pede.

---

## Onde o padrão opera neste método

Expand/collapse não é um conceito acoplado ao processo — ele é o
ritmo que estrutura o processo. Três lugares onde isso fica
explícito:

### Na taxonomia de progresso

A hierarquia Valor → Progresso → Trabalho **é expand/collapse
cristalizado em estrutura**:

- Valor *expande* em Progresso (CV se diferencia em Epics/Stories).
- Progresso *expande* em Trabalho (Story se diferencia em Tasks).
- Trabalho *colapsa* em Progresso (Tasks executadas → Story pronta).
- Progresso *colapsa* em Valor (Epics completos → CV alcançado).

A taxonomia não é arbitrária — é o ritmo congelado em forma.

### Na tríade processo-projeto-produto

A tríade é, ela própria, um expand. "Trabalho" era unidade
indiferenciada; foi expandido em três dimensões com fronteiras
explícitas. O [Check de coerência](development-guide.md#6-check-de-coer\u00eancia)
é o collapse correspondente: verifica que as três dimensões se
reintegram em um todo coerente. Sem o collapse, o expand vira
fragmentação morta.

### No ciclo de uma story

O ciclo de uma story alterna expand e collapse passo a passo:

| Passo | Movimento dominante |
|---|---|
| 1. Plano | expand — alternativas emergem, fronteiras são desenhadas |
| 2. Implementação | expand — o código materializa as partes |
| 3. Teste | proto-collapse — as partes precisam funcionar juntas |
| 4. Documentação | collapse narrativo — o que aconteceu vira história |
| 5. Ritual de Review | re-expand — blocos selecionados, racional explicitado |
| 6. Check de coerência | collapse estrutural — o todo se sustenta? |
| 7. Status | collapse reconhecido — a hierarquia é atualizada |
| 8. Release | **collapse nomeado** — o valor emergente recebe nome |

A release note não é cosmética. É **o artefato linguístico do
collapse**: é onde o valor emergente recebe nome, fechando o arco.
Sem o nome, o collapse não fecha.

---

## Como decidir entre expand e collapse no fluxo

A decisão se materializa em um ritual concreto:
o [Ritual de abertura](development-guide.md#ritual-de-abertura), feito
no começo de cada sessão de trabalho. Ele faz três perguntas que
mapeiam diretamente para os movimentos:

- **"Estou travado por ambiguidade?"** → expand. Falta diferenciar,
  nomear, separar.
- **"Estou perdido em fragmentos?"** → collapse. Falta reintegrar,
  relacionar, nomear o todo.
- **"Está fluindo?"** → nenhum movimento forçado. O ritmo natural
  basta.

A pior patologia é o movimento errado no momento errado: expandir
quando o trabalho pede integração, ou colapsar quando o trabalho
ainda pede diferenciação. Ambos produzem a aparência de progresso
sem o progresso real. O Ritual de abertura existe exatamente para
evitar essa patologia.

---

## Resumo

> O método é um processo de construção por alternância entre
> *expand* e *collapse*: no expand, uma unidade é diferenciada em
> partes nomeadas com fronteiras e critérios explícitos de
> distinção; no collapse, as partes são reintegradas em uma unidade
> superior com propósito e valor emergente. Seu objetivo é eliminar
> ambiguidade sob demanda, preservando a relação parte–todo por meio
> de hierarquia semântica e regras de trânsito entre níveis
> conceituais.
