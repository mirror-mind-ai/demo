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
