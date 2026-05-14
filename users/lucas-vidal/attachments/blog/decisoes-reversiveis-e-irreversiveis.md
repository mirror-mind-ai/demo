# Decisões reversíveis e decisões irreversíveis

Publicado em lucasvidal.dev, agosto de 2025.

Numa reunião de arquitetura há alguns anos, um colega muito sênior tomou
uma decisão em dois minutos. Era escolher entre dois formatos de mensagem
para uma API interna. Saiu com a primeira opção sem hesitar. Quando outro
engenheiro reclamou que ele estava sendo apressado, ele respondeu:
"podemos mudar isso na próxima sprint se der errado". E foi pra próxima
pauta.

A pauta seguinte era sobre escolher o banco principal para um novo
serviço. Postgres ou DynamoDB. Mesmo colega. Dessa vez, ele puxou uma
folha em branco, começou a fazer pergunta. Quanto vai crescer. Que tipo
de query domina. Quanto de manutenção operacional vamos engolir. O quê
ele já viu dar errado. A discussão durou três dias.

Saí daquela reunião com o que viraria a régua mais útil que aprendi em
quinze anos de engenharia. **A pressa adequada de uma decisão é função do
custo de revertê-la, não da importância dela.**

A frase parece óbvia até você notar quantas decisões a gente toma com a
pressa errada.

## O ponto sem volta

Existem decisões que você toma uma vez e carrega para sempre. Escolher o
banco principal de um sistema que vai crescer é uma delas. Migrar entre
bancos depois é um projeto inteiro, com risco, com downtime, com custo
operacional, com janela política. Cada decisão dessas, na prática, define
o terreno onde tudo o que vem depois vai pisar.

Já formatos de mensagem entre serviços, padrões de retry, naming
conventions, frameworks de teste, escolha entre Jest e Vitest, isso quase
sempre é decisão reversível. Custa algum trabalho mudar, claro. Mas
mudar não exige que você reescreva o sistema; exige que você atualize um
trecho, rode os testes, faça o deploy. O custo de errar é pequeno e
contido.

A diferença entre as duas categorias não está na complexidade técnica.
Está no número de outras decisões que dependem desta. Decisão
irreversível é decisão da qual outras decisões vão derivar e cristalizar.
Decisão reversível é decisão que vive sozinha o suficiente pra ser
trocada sem efeito dominó.

Quando você não distingue as duas, dois erros acontecem em sentidos
opostos. Você gasta semanas debatendo decisão reversível como se fosse
irreversível, e você toma decisão irreversível com a leveza de quem está
escolhendo cor de botão.

Vi os dois erros tantas vezes que perdi a conta. Times que passam um
mês discutindo qual ferramenta de logging usar, e tomam em meia hora a
decisão de qual cloud usar. Squads que escolhem padrão de comunicação
entre microsserviços no almoço, depois descobrem dois anos depois que
metade dos problemas operacionais vêm dessa escolha.

## A folha em branco do colega

O que aquele colega fazia, sem nomear, era separar as duas categorias na
hora.

Quando a decisão era reversível, ele aplicava a heurística do "primeiro
suficiente". Algum critério de qualidade mínima, e o resto era execução.
Não significava que ele não tinha opinião, ou que a opção escolhida fosse
arbitrária. Significava que o custo de errar era contido, e que o tempo
gasto em mais análise não ia melhorar a decisão mais do que melhoraria o
sistema gastar esse tempo em outra coisa.

Quando a decisão era irreversível, ele desacelerava. Trazia mais gente.
Pegava papel. Listava o que cada caminho cristaliza. Perguntava o que dá
errado em cada um. Procurava o cenário onde o caminho escolhido era
claramente o pior, e via se conseguia conviver com esse cenário caso ele
acontecesse.

A virada não era na quantidade de pensamento. Era na alocação dele.
Pensar muito sobre tudo é caro e ineficaz. Pensar muito sobre o que
importa muito, e pouco sobre o que importa pouco, é o que separa o time
ágil do time que finge agilidade.

## Por que erramos

A causa mais comum do erro, na minha experiência, é a vaidade técnica.
Decisões reversíveis são mais visíveis. Escolher framework, escolher
estilo de teste, escolher convenção de naming, são decisões que aparecem
no código todo dia. Cada engenheiro tem opinião forte. Cada opinião é
fácil de defender. A discussão é prazerosa, todo mundo sente que está
contribuindo, e ninguém nota que estão gastando tempo em algo que
poderia ser revertido na próxima sexta sem trauma.

Decisões irreversíveis, em compensação, são frequentemente menos
glamourosas. A escolha de modelo de domínio que ninguém vai lembrar de
ter feito daqui a três anos. A decisão de não ter um endpoint que
ninguém imaginaria precisar. O default que vai escapar da revisão de
quase todo mundo. Essas escolhas têm impacto cumulativo grande, mas não
geram opinião imediata.

Times com pouca senioridade tendem a errar nas reversíveis (debatem
muito) e a passar batido nas irreversíveis (decidem sem perceber).
Tech leads com algum cabelo branco sabem ler em que coluna a decisão
cai, e ajustam a profundidade da conversa em função disso.

## Em vida, não só em código

Conheci a versão estendida desse pensamento fora da engenharia. A
decisão de aceitar um convite para uma palestra é reversível: você fala,
ou não fala, e na semana seguinte a vida continua. A decisão de aceitar
um cargo executivo numa empresa é semi-reversível: você sai, mas a saída
tem custo. A decisão de mudar de cidade com a família é mais próxima de
irreversível: dá pra desfazer, mas o custo é alto, o tempo é longo, e
muitas outras decisões já cristalizaram em cima.

Aplicando a mesma régua, eu paro de tratar todas as decisões grandes
como se fossem iguais. A oferta de cliente nova é reversível. Eu posso
fechar e sair em três meses se o contrato permitir saída, e nenhum
contrato sério proíbe. A decisão de virar consultor independente, por
outro lado, é semi-reversível. Voltar dá, mas é mais difícil, e o
mercado já te etiquetou. A decisão de ter filhos é irreversível, e a
gente toma com uma fração do cuidado que dedica a discussões sobre
TypeScript.

Eu não estou propondo que decisão irreversível precise de medo. Estou
propondo que ela precisa de tempo, de papel em branco, de mais de uma
voz no quarto, e de uma simulação honesta do pior cenário.

## A pergunta de calibragem

A pergunta que carrego para qualquer decisão técnica que chega na
minha mesa, hoje, é uma só. **Qual o custo de reverter isso em três
meses, se eu errar?**

Se a resposta é "rodo um script de migração e atualizo a doc", é
reversível. Decide com agilidade. Documenta a decisão pra alguém poder
reverter no futuro. Segue.

Se a resposta é "preciso reescrever cinco serviços, parar deploy por
duas semanas, e contratar consultor externo", é irreversível. Sai do
formato de reunião e vai pra outro modo. Não decide hoje. Decide com
mais gente, com simulação de cenários, com pelo menos uma noite de
sono entre a discussão e a conclusão.

A maior parte das decisões que eu vi grupos tomarem mal, eles tomaram
no formato errado. Levaram dias na escolha pequena, e meia hora na
escolha grande. Quando você inverte essa proporção, sua engenharia
respira melhor, e seu time também.

Tem um efeito secundário curioso. Decisões reversíveis tomadas com
agilidade soltam carga mental do time. Decisões irreversíveis tomadas
com cuidado liberam o time pra confiar nelas. Os dois efeitos juntos
mudam a velocidade real do trabalho, e a relação com o erro.

Não tem decisão sem erro. Tem decisão tomada no ritmo certo, e decisão
tomada no ritmo errado. A primeira você sustenta. A segunda você só
sobrevive.
