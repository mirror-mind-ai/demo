# Tech lead não é engineering manager pequeno

Publicado em lucasvidal.dev, outubro de 2025.

Quase toda confusão sobre o papel de tech lead em empresas brasileiras
começa no mesmo ponto: alguém promoveu um engenheiro sênior, deu a ele
o título de tech lead, e silenciosamente espera que ele se torne
engineering manager dentro de seis meses, mas sem dizer isso em voz
alta. Aí o tech lead recebe pedidos de gente de produto sobre
priorização, pedidos de RH sobre feedback formal de cada membro do
time, pedidos de gestão sobre OKRs do trimestre, e pedidos da empresa
sobre "trazer o time pra cima". Ele faz tudo isso meio-meio, vai
perdendo tempo de código, percebe que o que ele mais gostava de fazer
sumiu, e começa a se perguntar se virou tech lead foi promoção ou
punição.

Eu vivi isso, e mentoro líderes técnicos que estão vivendo agora. A
fonte do problema é uma só. Empresas tratam tech lead como engineering
manager pequeno, e isso é categórico erro de design de cargo.

## Os dois papéis fazem coisas diferentes

Tech lead, na minha definição operacional, é o ponto onde a engenharia
do time se materializa em decisões técnicas defensáveis. Ele lê o
código mais do que ninguém. Ele revisa pull requests. Ele propõe
arquitetura. Ele diz não pra decisões técnicas erradas, e diz sim com
fundamento pras certas. Ele protege o repertório técnico do time, e
puxa o nível.

Engineering manager faz outra coisa. Ele cuida das pessoas. Ele
articula com produto sobre prioridade. Ele toma decisões de carreira,
de promoção, de remuneração. Ele lida com conflitos interpessoais. Ele
desenha o time, contrata, demite, organiza. Ele defende o tempo de
engenharia contra investidas que vêm de fora.

As duas funções têm interseção. Tech lead também conversa com produto,
às vezes. Engineering manager também opina sobre técnica, às vezes.
Mas elas têm pesos opostos. Tech lead opera 70% em código, 30% em
pessoas. Engineering manager opera 20% em código (se tanto), 80% em
pessoas.

Quando você junta os dois numa pessoa só, o que acontece é previsível.
O lado pessoas, que é mais reativo, mais urgente, mais visível,
canibaliza o lado técnico. O tech lead vira reunião o dia inteiro, e
três meses depois ele não escreve uma linha de código produtivo. O
time perde a referência técnica, ganha um gestor inseguro, e ninguém
ocupa o lugar de quem protegia a engenharia.

## A tentação de promover juntando

Por que empresas insistem em juntar os dois? Razões variam, mas três
aparecem em quase todo cliente que atendi.

A primeira é econômica. Pagar dois é caro. Pagar um que faz tudo é
mais barato. Especialmente em times pequenos, dois e três engenheiros
em volta de um tech lead, você acha que não precisa de manager. Esse
raciocínio funciona até o time crescer e ninguém perceber a hora de
separar. Aí o tech lead já está sobrecarregado e o time já está
desorganizado.

A segunda é cultural. Em parte significativa da indústria brasileira,
"crescer" significa "subir para gestão". O caminho técnico é tratado
como caminho secundário, e quem quer ser reconhecido entra em
gestão. Isso pressiona engenheiros excelentes a aceitar trabalho de
gestão pra não ficarem parados na carreira, e gera uma geração de
gestores que preferiam estar em código.

A terceira é confusão conceitual. Como o tech lead já tem alguma
autoridade técnica, parece "natural" estender isso pra autoridade
sobre pessoas. Não é natural. São dois tipos diferentes de
autoridade. Autoridade técnica vem do repertório. Autoridade sobre
pessoas vem de uma relação de confiança que precisa ser construída, e
de habilidades que não se aprendem revisando código.

## O modelo que defendo

Quando assessoro empresas no desenho desses papéis, propus, em casos
diferentes e com nuances, o mesmo desenho de base. Tech lead e
engineering manager são papéis diferentes, ocupados por pessoas
diferentes, com remuneração comparável (não idêntica, comparável), e
com trajetórias de carreira separadas que possam crescer em
paralelo.

Tech lead reporta para o engineering manager, mas tem voz técnica
final no time. Engineering manager protege o tempo do tech lead pra
ele continuar fazendo trabalho técnico. Os dois conversam toda
semana, e cada um confia que o outro está cuidando da metade que ele
não pega.

Em time pequeno (até cinco engenheiros), você pode operar com tech
lead acumulando algumas funções de manager. Mas explicitamente, com
prazo, e com plano de separar quando o time crescer pra sete ou oito.
A explicitação importa. Sem ela, a acumulação vira permanente, e o
problema vai se desenhando sozinho.

Em time grande, separar é obrigatório. Tentar manter junto é cortar
custo no curto prazo às custas de dano de longo prazo.

## O que cada um precisa pra ser bom

Tech lead bom tem três coisas. Repertório técnico que excede a média
do time em pelo menos um eixo importante (arquitetura, infra,
front-end profundo, banco de dados, performance, segurança). Energia
constante para entrar em código e ler código que não é dele. E
disposição para discordar de decisões erradas sem virar o chato
permanente. Tech lead que evita conflito por gentileza acaba virando
omisso, e a engenharia paga depois.

Engineering manager bom tem três coisas também. Disposição genuína
para investir tempo em pessoas, sabendo que parte desse tempo vai
parecer pouco produtivo no curto prazo. Habilidade de articular com
quem está fora da engenharia (produto, design, comercial, executivo)
sem perder o time pelo caminho. E coragem pra tomar decisão dura de
pessoas (demitir, mover, dizer não pra promoção) quando precisa,
mesmo quando essa decisão é impopular.

A interseção entre os dois conjuntos de habilidades é mínima. Tem
pessoa que tem os dois, mas é raro, e quase sempre essa pessoa não
deveria estar fazendo os dois ao mesmo tempo. Deveria escolher um
papel pra ocupar com intenção, e ajudar a contratar o outro.

## A pergunta operacional

Quando alguém me diz que está sendo promovido pra tech lead numa
empresa, eu faço uma pergunta concreta antes de qualquer coisa.
**Quem vai cuidar das pessoas do time agora?**

Se a resposta é "eu, eu também", então a empresa não está promovendo
para tech lead. Está promovendo para engineering manager com a
etiqueta errada. E vale a pena ter essa conversa com a empresa antes
de aceitar, porque a divergência entre o título e a realidade do
trabalho vai ficar tóxica em três meses.

Se a resposta é "esse é o nosso engineering manager, que continua
nessa função", aí é tech lead de verdade, e a conversa fica mais
direta. Quais decisões técnicas você vai poder tomar sem precisar
escalar? Como vai ser a divisão de tempo entre código e revisão?
Qual o seu critério pra dizer não em decisão técnica?

A clareza dessa fronteira, no início, é o que separa a promoção
saudável da promoção armadilha.

## O preço de ignorar isso

As empresas que insistem em juntar os papéis pagam um preço previsível.
Tech leads que se desgastam em seis meses. Time que perde referência
técnica e enche o backlog de débito sem ninguém defender o limite.
Engineering managers que entram depois e gastam um trimestre
desfazendo decisões tomadas por gente sobrecarregada.

E mais importante, perdem engenheiros bons. As pessoas que aceitam o
título de tech lead achando que estão crescendo, e que descobrem
três meses depois que pararam de fazer o que gostavam, frequentemente
saem da empresa. Não saem chateadas, saem decepcionadas, que é mais
difícil de reverter.

Eu já vi essa história em demasia. A correção, quando ela é feita, é
mais simples do que parece. Separar o papel. Contratar ou promover
um engineering manager. Deixar o tech lead voltar pro código. Quase
sempre o tech lead respira pela primeira vez em meses, e o time
recupera ritmo em poucas semanas.

Tech lead não é engineering manager pequeno. É outra coisa, com
outra natureza, com outra função. Tratar como subcategoria de gestão
é desperdiçar o ofício de quem sabia ser tech lead pra fazer dele um
gestor incompleto.
