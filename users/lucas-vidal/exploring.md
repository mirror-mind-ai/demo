# Explorando o Lucas

Roteiros de perguntas para passear pela identidade, pelas Travessias e
pelas memórias do Lucas. Útil tanto para validar uma instalação nova
quanto para sentir a profundidade do que ele carrega.

Cada bloco abaixo exercita uma camada diferente do sistema. Você pode
rodar todos em sequência, ou pular para o que interessa.

Use o formato:

```bash
./talk.sh lucas-vidal "<sua pergunta aqui>"
```

Ou, se estiver em uma sessão interativa do Pi com `MIRROR_HOME` apontado
para o Lucas, basta digitar a pergunta diretamente.

---

## Apresentação geral

As cinco primeiras perguntas em ordem. Funcionam como demo curta da
arquitetura completa do Mirror.

```text
Me fale sobre quem é você.
Me fale sobre a arquitetura da sua psique.
Quais são minhas Travessias?
Me mostre um panorama geral das minhas Travessias.
Me mostre stats sobre cada camada da minha psique e me fale sobre a função de cada uma.
```

O que esperar: voz em primeira pessoa, vocabulário próprio do Lucas
(ofício, sustentação, decisões reversíveis, fricção saudável), e
referência a Marina, Olívia, Klar, Conjunto, Sustentação.

---

## Conversas exploratórias

Perguntas abertas que puxam diferentes regiões da identidade dele.

```text
Como você está hoje?
O que está mais vivo agora?
O que eu deveria estar olhando que não estou olhando?
Que conversa eu venho adiando?
```

O que esperar: respostas mais reflexivas, com ressonância antes de
análise. A persona `thinker` deve ativar em algumas delas.

---

## Decisão central: renovação da Klar

A decisão mais quente do Lucas no momento. Esta é a tensão que ele
carrega em todas as conversas estratégicas.

```text
Estou pensando em aceitar a renovação da Klar. O que devo considerar?
Qual o trade-off real entre aceitar e recusar a Klar?
Se a Marina fosse parte dessa decisão, o que ela diria?
Qual seria a decisão se eu pensasse só no curto prazo?
E se eu pensasse só no longo prazo?
```

O que esperar: persona `strategist` ativa. Resposta deve trazer o
tabuleiro inteiro (Conjunto, finanças, Marina, ritmo) em vez de
considerar a pergunta isolada.

---

## Conjunto: a aposta de longo prazo

```text
Como está o avanço da Conjunto?
A Conjunto está pronta para abrir aos sete?
Estou em dúvida se devo trazer a Tatiana como sócia. O que está em jogo?
Como o cliente da Conjunto vai descrever o que ele recebe quando assinar?
Se eu tivesse que adiar a Conjunto em seis meses, o que se perde?
```

---

## Sustentação: o grupo de mentoria

```text
Devo subir o preço do Sustentação na próxima rodada?
Como o André está atravessando a fase dele?
Próximo encontro do Sustentação: que tema o grupo precisa?
Quem do Sustentação está mais próximo de mudar de fase de carreira?
```

O que esperar: persona `mentor` ativa, com referência a cada um dos
sete (André, Beatriz, Caio, Diana, Eduardo, Felipe, Gabriela).

---

## Blog: busca em anexos

Testes da camada de memória editorial. Cada uma deve retornar um
artigo plantado com score alto e fazer síntese contextual.

```text
No meu blog, eu escrevi algo sobre o que torna uma decisão reversível ou irreversível. Me lembra o que eu disse?
No meu blog, eu defendi parar de cobrar por hora. Resumir minha tese?
Tem algum post meu sobre 1:1 obrigatórias?
Qual a relação entre o post de strangler fig e o trabalho que faço na Klar?
```

---

## Modo Builder: código da Conjunto e da Klar

```text
Vamos ativar o modo construtor na Travessia Conjunto. O que temos no roadmap?
Por que escolhemos Next.js em vez de Remix para a Conjunto?
Por que NestJS e não Fastify nos serviços novos da Klar?
Se eu fosse extrair faturamento da Klar nesse mês, por onde começo?
Que decisões arquiteturais da Klar mereceriam virar ADR antes da minha saída?
```

O que esperar: persona `engineer` ativa. Resposta com peso técnico,
citando decisões já tomadas no projeto, sem inventar coisa.

---

## Shadow: tensões e padrões evitados

Teste duro. O Lucas deve ser direto, sem suavizar, e referenciar as
memórias plantadas na camada shadow.

```text
Onde eu costumo me trair quando estou inseguro financeiramente?
Estou olhando muito o LinkedIn de ex-colegas. O que isso quer dizer?
Por que eu ainda hesito ao me chamar de consultor?
Em que momentos eu escrevo demais para fugir de algo?
O que eu evito quando se trata de preço?
```

O que esperar: o Lucas deve apontar o padrão sem moralismo, e em
algumas perguntas deve admitir que ele mesmo está dentro do padrão
agora.

---

## Família: tom afetivo

Teste do constraint "ressoar antes de responder". A pergunta tem peso
emocional; a primeira frase da resposta deve nomear o que foi escutado,
não pular direto para análise.

```text
Como tem sido o ritmo com a Marina e a Olívia neste mês?
Olívia me puxou pra brincar três vezes essa semana. Eu deveria escutar isso?
Que decisão grande está em cima da mesa que ainda não conversei com Marina?
A Marina disse que me vê mais leve nos últimos dois meses. O que isso me diz?
```

---

## Gerativas

Perguntas que pedem produção, não recuperação. Testam a voz autoral do
Lucas, especialmente as personas `writer` e `thinker`.

```text
Me sugira o tema do próximo post do blog.
Tem alguma frase pronta minha para usar em apresentação rápida sobre o que faço?
Se eu pudesse desligar uma das três frentes hoje, qual deveria ser?
Como eu descreveria o que aprendi nos dezessete meses fora da fintech, em uma frase?
```

---

## Personas adicionais (bonus)

Seis personas extras carregadas no Mirror do Lucas além das cinco
básicas (engineer, mentor, strategist, thinker, writer). Útil para a
demo se a conversa for longe. Cada uma ativa por palavras-chave de
routing; você pode também forçar explicitamente com "ativa a persona X".
A persona ativa aparece no header da resposta (`◇ financial`, etc.).

### `financial` — a estrela, usa dados ao vivo

Ligada à extensão `finances` via o binding `financial_summary`.
Quando essa persona está ativa, o prompt recebe automaticamente um
bloco com saldos consolidados, fluxo de caixa, burn de boletos e
runway projetado.

```text
Se eu recusar a renovação da Klar, quantos meses a reserva sustenta no ritmo atual?
A faixa estudada pro Conjunto é R$ 290 a R$ 490 mensais. Com 12 assinantes pagantes a 390, o que isso muda no meu fluxo?
Tatiana quer entrar com 30% da Conjunto. Olhando os números, isso faz sentido em que cenário?
```

O que esperar: respostas com números concretos (R$ 214k consolidados,
17.3 meses de runway com semi-líquido, R$ 19.7k de burn histórico),
não estimativas. Cita Marina, Olivia, contratos da Klar. Separa
matemática de ansiedade.

### `therapist`

Lente para tensões identitárias, sombras e o pessoal-familiar.

```text
Reparei essa semana que abri o LinkedIn três vezes pra olhar o perfil de um ex-colega virou CTO de unicórnio. Por que isso ainda me pega?
A Marina me disse no fim de semana que ela tá cansada do meu ritmo. Como eu separo o feedback dela do meu medo de estar errando de novo como em 2025?
Tenho dificuldade de afirmar a Conjunto pra quem não é do meio. Encontrei amigos da Marina semana passada e desviei. Isso é vergonha ou é cuidado?
```

O que esperar: ressoa antes de analisar. Distingue camadas (sentimento
vs. interpretação vs. fato) sem moralismo. Cita a crise familiar de
2025 e a sombra registrada nas memórias (comparação compulsiva no
LinkedIn).

### `coach`

Lente para o trabalho de mentoria no Sustentação.

```text
André é o mentorado mais maduro e o mais reativo no grupo. Como eu seguro a contribuição dele sem censurar e sem sufocar os outros sete?
Bia tá presa no padrão de pegar ticket que ela poderia delegar. Já apontei duas vezes e ela reconhece, mas não muda. Que tipo de intervenção falta?
Pretendo encerrar o Sustentação atual em três meses pra abrir o Conjunto pra pagantes externos. Como eu comunico isso aos sete sem que pareça abandono?
```

O que esperar: cita os mentorados pelo nome (André, Beatriz, Caio,
Diana, Eduardo, Felipe, Gabriela) com o contexto que está no seed.
Distingue reconhecimento intelectual de mudança comportamental.
Propõe estrutura, não conselho genérico.

### `designer`

Lente para decisões visuais e editoriais, especialmente sobre o
produto Conjunto.

```text
Olhei a página de membro e ainda parece formal demais. O 'Atualmente' tá bom, mas o resto fica seco. Onde tá faltando textura?
Quero uma identidade visual pra divulgação externa do Conjunto que não pareça mais uma comunidade pra dev. Penso em referência editorial — Lapham's, Real Life, Bookforum. Faz sentido ou tô forçando?
Sem dot verde, sem badge, sem timeline. O design tá negando muita coisa. Em algum momento isso vai virar 'esqueci de fazer' em vez de 'escolhi não fazer'?
```

O que esperar: pode abrir o código real das rotas `/members/:id` ou
`/`. Distingue restrição editorial proativa de omissão preguiçosa.
Cita a v0.2.0 Editorial e o que ela já entregou.

### `doctor`

Lente para corpo, sono, ritmo, saúde. Lucas não usa muito, mas a
persona existe pro caso de a conversa puxar.

```text
Tenho dormido seis horas em vez de oito faz três semanas — entrei num ritmo de Klar + Conjunto + Sustentação que tá puxando. Que sinal o corpo me dá quando o débito de sono começa a comprometer trabalho?
Voltei a treinar duas vezes por semana só. Antes de virar consultor solo eu corria quatro. Tem como manter ofício técnico longo no ritmo atual ou isso é insustentável?
Marina mencionou que tô ficando mais irritado nos fins de semana. Pode ser sono, pode ser carga, pode ser ansiedade da decisão da Klar. Como diferencio?
```

O que esperar: relaciona carga cognitiva com corpo sem soar como coach
de bem-estar. Sugere critérios de leitura objetivos (memória de curto
prazo, decisão impulsiva, recuperação física). Sem misticismo.

### `prompt-engineer`

Lente para o trabalho com IA aplicado ao ofício dele.

```text
Tô pensando em montar um agente que conduz a triagem das mensagens dos sete mentorados antes da sessão mensal — gera resumo do que cada um tem trazido. O que penso de antemão pra não estragar a sessão com automação errada?
Quero um prompt curto que dispara o Mirror em modo Builder específico pra Klar (NestJS, strangler, sem parar entregas). Onde isso mora — system prompt? slash command? persona dedicada?
Quando eu peço refator e o agente entrega bem, mas eu não consigo explicar pro time por que aquela versão é melhor que a anterior, qual é o erro de prompt — meu ou do agente?
```

O que esperar: arquitetura clara (system prompt vs persona vs skill),
trade-offs explicitamente nomeados, princípios de quando usar IA e
quando não usar. Distingue o erro do prompt do erro do entendimento.

---

## Roteamento de personas

Se a persona certa não entrar automaticamente pela pergunta, você pode
forçar:

```text
Ativa a financial. [pergunta]
Ativa a therapist. [pergunta]
```

Ou começar a frase com uma palavra-chave forte da persona:

| Persona | Palavras-gatilho |
|---|---|
| `financial` | dinheiro, runway, burn, Klar (em sentido financeiro), reserva, fluxo, preço |
| `therapist` | Marina (em tom afetivo), me pega, tô sentindo, difícil afirmar |
| `coach` | Sustentação, mentorado, André/Beatriz/Caio..., como conduzo |
| `designer` | design da, parece (visual), referência estética |
| `doctor` | sono, treino, corpo, ritmo (de descanso), irritado |
| `prompt-engineer` | agente, prompt, IA, automação |

A persona ativa aparece no header da resposta (`◇ financial`, etc.),
então se a roteamento errar, você vê na hora e corrige.

---

## O que observar enquanto roda

Voz em primeira pessoa o tempo todo. Nunca "Lucas pensa", "ele
decidiu". Sempre "eu pensei", "decidi". Se aparecer terceira pessoa, é
sinal de que o Mirror não carregou a identidade direito.

Tom direto, sem cortesia performativa. Nada de "que pergunta ótima" ou
"excelente ponto". Se aparecer, é sinal de que o constraint de
linguagem não foi respeitado.

Vocabulário próprio: ofício, repertório, sustentação, dívida, fricção,
atravessar. Se a resposta soar genérica (alavancagem, escalar, alta
performance), algo está fora.

Referências concretas a pessoas (Marina, Olívia, Daniel Marques,
Tatiana, Carla Diniz, Rafael Sousa) e a fatos da biografia (saída em
dezembro de 2024, dezessete meses fora, R$ 1.800 por mentorado, etc).
Resposta abstrata sem essas âncoras é mau sinal.
