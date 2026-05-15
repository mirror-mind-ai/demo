# CV0.E2.S2 — Indicador de leitura por mensagem

**Status:** ⚪ planejada
**Epic:** [CV0.E2 — Engajamento](../)

> **Como membro do Conjunto, eu quero ver quem já leu a minha última
> mensagem em um fio, para saber se o que disse alcançou os outros,
> sem precisar de confirmação explícita.**

## Problema

Quando um membro abre um fio e responde, ele não sabe quais outras
pessoas leram a sua mensagem. A sensação de que "alguém leu" é
parte do que torna um espaço vivo. Sem isso, o fio parece soltar
mensagens no escuro.

## Em uma frase

Cada mensagem mostra um marcador discreto com os nomes (ou avatares)
dos membros que já a leram, calculado a partir da última vez que
cada membro abriu o fio.

## Dependências

Precisa de uma noção de "leitura": uma tabela que associe
(member_id, thread_id, last_read_at). Atualizada toda vez que um
membro abre `/threads/:id`.

## Notas

A regra do "evitar feed" se aplica também aqui. O indicador deve
ser visualmente discreto, não criar engajamento por ansiedade.
Esperar feedback dos sete fundadores antes de implementar para
calibrar a sutileza.
