# Refatorar arquitetura sem parar de entregar

Publicado em lucasvidal.dev, março de 2026.

A frase mais comum que ouço quando entro num cliente para discutir
migração arquitetural é alguma variação de "queremos fazer essa
reescrita, mas precisamos pausar features por uns três meses". É quase
sempre o sinal de que o projeto não vai dar certo. Em quinze anos de
engenharia, eu vi exatamente uma reescrita big bang dar certo. E ainda
assim, ela quase quebrou o time no caminho.

A boa notícia é que dá pra fazer arquitetura nova ao lado da arquitetura
velha, sem parar entregas, sem freezar produto, sem ter uma "sprint da
plataforma" disfarçada. A má é que a maior parte dos times não acredita
que dá, e por isso não experimenta. Quero contar como funciona quando
funciona.

## O sintoma

Um sistema chega ao ponto onde uma região do código se tornou difícil de
mexer. Cada feature ali leva o dobro do tempo. Os engenheiros novos
demoram seis semanas pra começar a entregar nessa região. As pessoas
sêniores já evitam a região quando podem. Surge um vocabulário interno
para se referir a ela: "aquela parte legada", "o monstro do
faturamento", "o módulo do João".

Aí alguém propõe a solução épica. Reescrever do zero. Modernizar.
Migrar pra microsserviços. Trocar de banco. Adotar evento. Os candidatos
a salvador variam. O que não varia é a expectativa de que, para a
solução grande, é preciso parar.

Não é preciso. E parar geralmente significa não chegar.

## O padrão que funciona

O padrão tem nome bem antigo. Strangler fig pattern, proposto pelo Fowler
em 2004. A metáfora é da figueira-estranguladora, planta da floresta
tropical que cresce em volta de uma árvore hospedeira, vai se enraizando,
e quando a hospedeira morre, a figueira já está ali, viva, ocupando o
mesmo espaço.

Em código, a ideia é simples. Você não substitui o sistema antigo de uma
vez. Você cria o sistema novo ao lado, e vai movendo capacidades, uma
por uma, do antigo pro novo, até que o antigo possa ser desligado.
Enquanto isso, o sistema continua entregando. A operação não para. A
empresa não enxerga uma pausa.

Em prática, isso significa três coisas concretas.

**Primeiro, um proxy ou gateway que decide quem responde por cada rota.**
Toda chamada que entra passa por uma camada que sabe se aquela rota já
foi migrada pro novo serviço, ou se ainda mora no monólito velho. No
começo, todas as rotas vão pro velho. Conforme migramos, vamos
chaveando rota por rota. O cliente da API não percebe nada.

**Segundo, uma fronteira de dados explícita.** Quando você extrai um
serviço novo, ele precisa ter o próprio modelo de dados. Talvez o
próprio banco. Não dá pra dois serviços escreverem na mesma tabela e
fingir que estão isolados. Isso exige sincronização nos dois sentidos
durante o período de transição. É a parte mais cara do processo, e a
mais comumente subestimada.

**Terceiro, testes de contrato.** Quando o cliente da API depende de um
comportamento, e você troca a engine por trás daquele comportamento, a
única forma de não quebrar nada é ter um teste que descreva o contrato
externo e que rode contra os dois lados (o velho e o novo) durante a
transição. Sem isso, você está fazendo migração no escuro.

## Onde quase todo mundo trava

Na minha experiência, três coisas matam o projeto se você não estiver
atento.

A primeira é tratar a migração como projeto à parte. Quando a migração
vira "iniciativa estratégica" com squad dedicada, separada do trabalho
de feature, dois mundos se formam. O time de feature continua
entregando no monólito, criando código novo em cima do velho. O time de
migração tenta mover capacidades que estão sendo expandidas ao mesmo
tempo. É como reformar a casa enquanto outra equipe está construindo
puxadinhos novos no telhado.

A solução é simples mas exigente: migração não é projeto separado, é
critério de aceitação das features. Toda feature que toca a região
sendo migrada precisa contribuir pra migração de algum jeito. Pode ser
escrevendo no formato novo, pode ser não escrevendo no velho, pode ser
movendo uma função antes de adicionar a nova. Mas não tem espaço pra
"vou só fazer isso aqui rápido no jeito velho".

A segunda é faltar com a fronteira de dados. Times tendem a achar que
podem extrair um serviço sem extrair o banco. Logam ambos no mesmo
postgres, criam constraints entre as tabelas, e dizem que isolaram. Não
isolaram. Isolaram o código, mas as escritas estão acopladas. Quando o
serviço novo precisa evoluir o modelo de dados, ele esbarra no velho.

O custo de extrair o banco junto é alto. É bidirecional sync por meses,
é dual write, é eventos pra propagar mudança. Mas o custo de não fazer
é maior. Você fica com a aparência de microsserviços e a realidade de
um monólito disfarçado.

A terceira é não medir progresso. Migração strangler precisa de métrica
visível e compartilhada. Quantas rotas já foram migradas. Quantos
caminhos de código no velho ainda recebem tráfego. Quanto do volume de
operação já vive no novo. Sem essa métrica, ninguém sabe se a migração
está avançando ou só consumindo tempo.

Eu costumo colocar um painel no lugar mais visível possível, com duas
linhas. Tráfego na arquitetura nova, em verde, subindo. Tráfego na
arquitetura velha, em cinza, descendo. Quando os dois se cruzam, o
projeto está vivo. Quando ficam paralelos por muitas semanas, tem algo
errado, e é hora de parar e perguntar.

## Quanto tempo isso leva

A pergunta sempre vem. "Em quanto tempo um sistema desse tamanho
migra?" A resposta honesta é que depende menos do tamanho do código e
mais da disciplina do time em não voltar a escrever no monólito durante
a migração.

Times bem disciplinados conseguem reduzir o monólito a uma sombra em
seis a doze meses. Times com disciplina média levam dois anos pra
chegar à metade. Times sem disciplina ficam três anos com migração na
roadmap sem nunca terminar. A diferença não está em quão complexo é o
sistema; está em quantos caminhos novos foram abertos no velho durante
o processo.

Os clientes que mais avançam aceitam uma regra dura. Toda feature nova
que entra precisa ter resposta para uma pergunta única: ela contribui
ou pelo menos não atrapalha a migração? Se atrapalha, e atrapalha o
suficiente, ela espera, ou é redesenhada.

Essa regra parece autoritária. Na prática, ela protege o investimento
do time. Sem ela, o monólito cresce mais rápido do que a migração
extrai, e o projeto morre engasgado.

## O ganho real

Quando uma migração strangler funciona, o ganho não é só técnico. O
time recupera relação saudável com a região que era difícil de mexer.
O custo cognitivo de manter o sistema cai. Engenheiros novos entram em
seis dias, não em seis semanas. Decisões arquiteturais novas podem ser
tomadas no terreno extraído sem afetar o resto.

E mais importante, a empresa nunca enxerga a pausa. Para o produto, a
migração é invisível. Features continuam saindo. Receita continua
entrando. A engenharia muda por baixo, e o negócio segue por cima.

Esse é o tipo de trabalho que distingue o time que pensa em produto do
time que pensa em "limpar o código". O resultado, no fim, é o mesmo
sistema mais simples. Mas o caminho é completamente diferente.

Reescrita parece corajosa. Strangler parece chato. Na minha leitura,
quem topa o chato é quem entrega o sistema novo no final.
