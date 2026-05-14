# Quatro meses convertendo um monólito Node em serviços tipados

Publicado em lucasvidal.dev, abril de 2026.

Esse texto é sobre uma coisa específica: levar uma aplicação Node grande,
escrita em JavaScript ao longo de sete anos, para uma arquitetura
modular em TypeScript, sem parar entregas e sem comprar uma nova
geração de problemas no meio do caminho. Já vivi essa migração em três
clientes diferentes, e estou no meio dela de novo agora. As lições aqui
são acumuladas desses casos, com nomes e detalhes alterados para
preservar quem confiou em mim para o serviço.

## O cenário típico

Sempre se parece. Aplicação Node nasceu em 2018 ou 2019, em Express,
com JavaScript puro. Cresceu rápido porque rápido era o que precisava
crescer. Hoje tem entre 200 mil e 500 mil linhas, atravessa toda a
operação do produto, e tem três regiões de domínio que viraram pesadelo
de manter. Faturamento, normalmente. Rota ou logística, se a empresa é
de operação física. Permissionamento, se cresceu por aquisição.

A equipe sabe que precisa migrar. A discussão é como. As propostas que
sempre aparecem: reescrever do zero em Go, reescrever em Rust, mover
para Deno, dividir em microsserviços, virar event-driven, migrar pra
serverless. Cada uma dessas é uma forma diferente de errar o problema.

O problema não é a linguagem nem o paradigma. O problema é que o código
não tem fronteiras, não tem tipos, e o time não consegue prever o efeito
das mudanças. A migração mais útil é a que ataca esses três pontos com a
menor disrupção possível. E essa migração tem nome chato: extrair
serviços em TypeScript usando NestJS, com strangler fig, por pelo menos
nove meses.

## Por que TypeScript, e não outra linguagem

A primeira tentação é trocar de linguagem. "Já que vamos migrar mesmo,
vamos fazer em Go." Eu costumo responder com uma pergunta. **Quantas
pessoas do seu time atual conseguem revisar Go com a mesma fluência que
revisam JavaScript hoje?**

A resposta, quase sempre, é "uma ou duas". E essas uma ou duas pessoas
viram gargalo arquitetural, gargalo de revisão, e candidatas a sair
porque ficaram com toda a responsabilidade técnica nas costas. Em seis
meses, você tem um pedaço novo do sistema que ninguém entende além
delas, e elas pediram demissão.

TypeScript ganha porque é o JavaScript com tipos. O time já sabe
JavaScript. O ecossistema é familiar, a infra é familiar, as ferramentas
são familiares. O que muda é a presença de uma camada que rejeita
inconsistências em compile time, e que torna explícito o que antes era
implícito.

A perda é estética. TypeScript não é elegante como Go nem como Rust.
Você vai escrever decorators, vai brigar com tipos genéricos, vai ter
casos em que o sistema de tipos vai te bater. Em compensação, você
mantém continuidade de time. Em migração, continuidade de time é mais
valioso do que elegância de stack.

## Por que NestJS, e não Express ou Fastify

A segunda tentação é manter Express e só adicionar TypeScript. Express é
familiar, é leve, parece simples. Por que não?

Porque Express não tem opinião sobre estrutura. Você acaba escrevendo
uma estrutura por convenção, e cada time escreve a sua. Em seis meses,
você tem três estilos diferentes de organizar o mesmo tipo de código,
porque três pessoas decidiram em momentos diferentes, e ninguém revisou
a decisão coletivamente.

NestJS impõe estrutura. Modules, controllers, providers, decorators. É
opinião explícita. O time não precisa inventar arquitetura interna em
cada serviço. Quando alguém entra novo, ele aprende uma estrutura, e
ela se repete em todos os serviços do mesmo sistema.

A familiaridade com Spring Boot e Rails ajuda muito, e a maior parte dos
desenvolvedores brasileiros tem essa familiaridade. Decorators são um
modelo mental conhecido. A curva de aprendizado para alguém que vem de
Express é menor do que parece.

Fastify é alternativa razoável se o time é menor e a senioridade é
maior. Mas em time grande, em migração longa, o custo de NestJS é
compensado pela uniformidade que ele impõe.

## A primeira extração, que define o resto

A escolha da primeira capacidade a extrair é a decisão técnica mais
importante do projeto inteiro. Se você escolhe a região mais crítica
porque "ela é a que mais incomoda", você quase sempre falha. Pula para
o cenário onde o serviço novo precisa estar 100% pronto antes de
substituir, e quando ele não está, a empresa cobra resultado, e o
projeto perde força.

A escolha melhor é uma região de baixa frequência de mudança, mas com
fronteira clara. Faturamento costuma ser bom candidato. Notificações
também. Permissionamento, se for relativamente estável, idem. A
intenção é provar o método com baixo risco, gerar confiança, e
desenvolver os músculos do time (testes de contrato, dual write,
sincronização de dados) num terreno onde o custo de errar é gerenciável.

A segunda extração já pode ser mais ambiciosa. A terceira, ainda mais.
Quando você chega na quarta, o time já sabe o caminho e a velocidade
acelera.

## Os pontos de fricção que sempre aparecem

Três coisas vão pegar você de surpresa, mesmo que você esteja avisado.

**Tipos compartilhados.** Em algum momento, vai aparecer a tentação de
ter uma biblioteca de tipos compartilhada entre o monólito e os serviços
novos. Resista. Compartilhar tipos significa compartilhar acoplamento.
Cada serviço deve ter o próprio modelo, com o próprio versionamento,
com tradução explícita na fronteira. É mais código, mas é menos
acoplamento, e em migração, menos acoplamento ganha sempre.

**Compatibilidade de comportamento.** Você vai descobrir que o
monólito velho tinha comportamentos não documentados que clientes
externos passaram a depender. Vai aparecer um cliente reclamando que
"o endpoint X mudou", e você vai jurar que ele não mudou. Vai ter
mudado, e ninguém sabia, porque ninguém testava aquele caso. Isso
sempre acontece. Reserve tempo para investigar, reproduzir, decidir se
preserva o comportamento estranho ou se anuncia mudança.

**Banco compartilhado.** A tentação de extrair só o código e deixar o
banco compartilhado vai aparecer toda semana. Cada vez que aparecer,
recuse. Banco compartilhado é o que faz a migração não terminar. O
serviço novo precisa de banco próprio, e a migração dos dados precisa
de plano explícito, com janelas de dual write e cutover.

## Métricas que faço questão de manter

Em todos os projetos onde fiz esse tipo de migração, eu carrego três
métricas em painel visível, atualizadas semanalmente.

A primeira é proporção de tráfego entre velho e novo. No início, 100%
no velho. A linha do novo precisa subir, e a do velho precisa descer.
Quando as duas se cruzam, é marco. Quando uma para de se mover por
muitas semanas, é alerta.

A segunda é número de pull requests no monólito velho versus pull
requests no código novo. Esta métrica revela cultura. Se PRs novos no
velho continuam altos depois de seis meses de migração, alguma coisa
no processo está incentivando o time a continuar escrevendo no lugar
errado.

A terceira é tempo médio para uma feature nova chegar em produção,
separado por região (velho versus novo). Quando o tempo no novo ficar
menor que o tempo no velho, o time vai parar de resistir à migração
sem precisar de discurso.

## O que esse trabalho não resolve

Vou ser honesto sobre o que essa migração não faz.

Não conserta time mal estruturado. Se a engenharia tem problema de
gestão, de prioridade, de relação com produto, a migração arquitetural
vai expor esses problemas, não resolver. Em alguns clientes, a maior
contribuição que eu dei não foi técnica, foi diagnosticar que a
migração estava sendo usada como desculpa para evitar conversas mais
difíceis sobre liderança.

Não conserta product que não sabe priorizar. Se o time de produto
joga features novas em cima da migração, a migração vai se arrastar.

E não substitui a conversa que precisa acontecer entre engenharia e
liderança sobre quanto tempo, quanto investimento, e quanto risco a
empresa quer alocar. Migração desse tamanho é decisão estratégica, não
só técnica. Tratar como puramente técnica é fingir que a engenharia
opera no vácuo.

## Para quem está nesse problema agora

Se o time está olhando para o monólito Node e considerando reescrita,
o caminho é mais simples do que parece. Não é mais barato, não é mais
rápido. Mas é mais previsível, e mais sustentável.

Comece pela menor coisa que tem fronteira clara. Construa o ferramental
de migração (proxy, testes de contrato, sincronização) no caminho da
primeira extração. Resista à tentação de pausar features. Aceite que
vai levar pelo menos nove meses, provavelmente quinze.

E principalmente, decida cedo que o time inteiro é o time da migração,
não uma squad separada. O dia em que isso fica claro é o dia em que a
migração começa a funcionar.
