# Versionamento

Este documento estabelece como atribuímos versões a releases e como
essas versões se relacionam com a taxonomia de progresso definida em
[`development-guide.md`](development-guide.md). É um dos eixos
operacionais do método, ao lado da [tríade](triad.md) e do
[expand/collapse](expand-collapse.md).

---

## A regra

Formato `vMAJOR.MINOR.PATCH`, com leitura semântica ancorada na
taxonomia de progresso:

| Componente | Incrementa quando… | Unidade taxonômica |
|---|---|---|
| **MAJOR** | **qualquer** Unidade de Valor (CV/BV) é alcançada e o ecossistema muda de estado de forma visível | Valor |
| **MINOR** | **qualquer** Unidade de Progresso (Epic) fecha, de **qualquer** CV em curso | Progresso |
| **PATCH** | uma Story sai isoladamente, sem fechar um Epic | Progresso (exceção) |

A regra é estrita. O bump de cada componente corresponde a um
collapse de nível diferente (ver
[`expand-collapse.md`](expand-collapse.md)):

- MAJOR bump = collapse de Valor.
- MINOR bump = collapse de Progresso.
- PATCH bump = collapse de Trabalho com valor mínimo direto ao
  usuário (caso raro).

**Os três componentes são eventos independentes em escalas
independentes.** Ver [Trabalho em paralelo entre CVs](#trabalho-em-paralelo-entre-cvs)
adiante para o ponto crítico que evita a leitura linear errada.

---

## Leitura semântica de `v0.x.y`

O `0.` inicial honra a convenção semver de "ainda não estável" e
ganha aqui sentido próprio: **o ecossistema ainda não cruzou o
limiar do primeiro valor entregue**. Nenhuma Unidade de Valor
fechou — mesmo que múltiplos CVs já estejam em curso, com epics
deles avançando. O produto pode estar rodando, fundadores podem
estar usando, epics podem ter fechado em CVs distintos: enquanto
nenhum CV completou, ainda é `v0.x.y`.

Quando **qualquer** CV fecha (não necessariamente CV0; não
necessariamente o de menor índice em curso), o salto
`v0.x.y → v1.0.0` carrega significado real. Não é cosmético. É o
atravessamento do primeiro valor entregue — narrativamente forte,
e que merece release note à altura.

A partir daí, cada novo CV que fecha produz um novo MAJOR bump.
Eventos raros, densos, ritualizados. **O número em MAJOR é a
contagem de CVs entregues, não o índice de qual CV está em curso.**

---

## Aplicação à `v0.1.0` real

Releitura concreta da release atual do Conjunto:

- Nenhum CV foi entregue ainda → **MAJOR = 0**
- Um Epic fechou (CV0.E1 — Tracer Bullet) → **MINOR = 1**
- Nenhuma story isolada extra → **PATCH = 0**
- Resultado: `v0.1.0` ✅

A release narra o fechamento de um epic. Acontece que esse epic
pertence a CV0, mas a versão não codifica isso — o `1` em MINOR
significa "um epic fechou desde o único CV não ainda entregue".
Qual epic, de qual CV, está na narrativa do release note, não no
número.

---

## Trajetórias possíveis

A regra não assume sequencialidade entre CVs. Para mostrar isso,
duas trajetórias plausíveis a partir de `v0.1.0`:

### Trajetória A — foco em um CV de cada vez

| Evento | Versão |
|---|---|
| CV0.E2 (Engagement) fecha | `v0.2.0` |
| Hotfix de uma story isolada entre epics | `v0.2.1` |
| CV0.E3 fecha | `v0.3.0` |
| **CV0 inteiro entregue** | **`v1.0.0`** |
| CV1.E1 fecha | `v1.1.0` |
| CV1 inteiro entregue | `v2.0.0` |

### Trajetória B — trabalho intercalado entre CVs

| Evento | Versão |
|---|---|
| CV0.E2 fecha | `v0.2.0` |
| CV1.E1 fecha (CV0 ainda incompleto) | `v0.3.0` |
| CV2.E1 fecha | `v0.4.0` |
| CV0.E3 fecha | `v0.5.0` |
| **CV1 inteiro entregue** (antes de CV0) | **`v1.0.0`** |
| CV0.E4 fecha | `v1.1.0` |
| **CV0 inteiro entregue** | **`v2.0.0`** |

O ponto-chave da Trajetória B: o `1` em `v1.0.0` não significa
"chegamos a CV1". Significa **"um CV foi entregue"** — nesse
cenário, CV1 entregou antes de CV0. O número codifica contagem,
não identidade. A narrativa do release note é quem diz qual CV
cruzou o limiar.

O salto para MAJOR é sempre o evento mais importante do
versionamento. Marca a entrega de um valor real ao ecossistema.
Toda release que carrega um MAJOR bump merece tratamento narrativo
especial.

---

## Trabalho em paralelo entre CVs

O método não exige nem prefere que um CV seja concluído antes do
próximo começar. Múltiplos CVs podem estar em curso
simultaneamente, e seus epics podem fechar em ordem qualquer. Três
consequências para o versionamento:

1. **MINOR é agnóstico à identidade do CV.** Qualquer epic que
   feche, de qualquer CV em curso, incrementa MINOR. O número MINOR
   conta epics fechados *desde o último CV entregue* (ou desde o
   início, no caso de `v0.x.y`), sem distinguir a qual CV cada
   epic pertence.
2. **MAJOR é contagem, não índice.** O `N` em `vN.x.y` é quantos
   CVs já foram entregues no total, não qual CV está em curso.
   Pode ser que CV2 entregue antes de CV0 — nesse caso, o primeiro
   MAJOR bump (`v0.x.y → v1.0.0`) marca a entrega de CV2, e CV0
   continua incompleto em `v1.x.y`.
3. **A versão não codifica o roadmap.** O roadmap mostra a
   estrutura de CVs/Epics/Stories e seu estado. A versão mostra
   *quanto valor já foi colapsado em entrega*. São leituras
   distintas. Quem quer saber "em que estámos" lê o roadmap; quem
   quer saber "o que já entregamos" lê a sequência de releases.

Isso desacopla deliberadamente o número da release da posição no
roadmap. O acoplamento entre os dois mora **na narrativa do release
note**, não no número.

---

## Por que essa regra é elegante

Quatro propriedades que justificam o desenho:

1. **Honra semver sem distorcer.** A convenção `0.x` = "em busca
   de estabilidade fundadora" se mantém. Quem leu semver entende
   imediatamente.
2. **MAJOR bumps são eventos, não contagem.** Cada um é um
   atravessamento real, não um número arbitrário que sobe.
3. **MINOR é a granularidade canônica de release.** Casa com a
   regra de push preferencialmente por epic
   ([dev-guide passo 8](development-guide.md#8-commit--push-collapse-nomeado)).
4. **PATCH é exceção, não default.** Casa com "push por story é
   caso justificado". O versionamento desencoraja fragmentação.
5. **Desacopla versão de roadmap.** Permite trabalho real em
   paralelo entre CVs sem que a numeração fique presa a um único
   eixo de progresso.

---

## Alternativas consideradas e rejeitadas

**Alternativa 1: MAJOR como índice do CV ativo** (v0.x = trabalhando
em CV0, v1.x = trabalhando em CV1, etc.).

Rejeitada porque perde o sentido de **bump como atravessamento**.
Em semver, bump de MAJOR é evento; nessa alternativa viraria mera
contagem de qual CV está em curso, e quebraria assim que se quisesse
trabalhar em múltiplos CVs em paralelo.

**Alternativa 2: MINOR aninhado por CV** (ex.: `v0.cv0-e1.0`,
`v0.cv1-e2.0`), tentando codificar a identidade do CV no número.

Rejeitada porque destrói a leitura semver e não resolve o
problema: o número precisaria carregar todo o roadmap dentro de
si para ser informativo. A solução correta é deixar o número
genérico e pôr a identidade na narrativa do release note.

A regra adotada preserva o caráter performativo do bump (o número
sobe quando algo realmente aconteceu) e mantém a numeração
legível mesmo com múltiplos CVs em paralelo.

---

## Casos de borda

Algumas situações que merecem nota:

- **Trabalho fora do roadmap** (sob `docs/project/maintenance/`):
  pode justificar PATCH bump quando muda comportamento observável
  do produto para usuários; caso contrário, não gera release.
- **Release apenas com mudanças de processo ou projeto** (sem
  alteração no produto): não gera versão de release. Vive no
  worklog e nos próprios docs de processo/projeto.
- **Múltiplos epics fechando juntos** (raro, mas possível): cada
  epic incrementa MINOR de uma vez. Uma única release pode levar
  de `v0.1.0` direto para `v0.3.0` se dois epics fecharam
  simultaneamente — mas é melhor evitar, porque a narrativa fica
  embolada.
- **Hotfix que precede um CV bump**: a versão sobe normalmente
  como PATCH; o CV bump vem depois e zera MINOR e PATCH como de
  costume (`v0.2.1` + CV0 entregue → `v1.0.0`, não `v1.0.1`).
