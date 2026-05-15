# CV0.E1.S4 — Fios e mensagens persistentes

**Status:** ✅ completo
**Versão:** v0.1.0
**Epic:** [CV0.E1 — Tracer Bullet](../)

**Documentação técnica:** [Plan](plan.md) · [Test guide](test-guide.md) · [Refactoring](refactoring.md)

> **Como membro do Conjunto, eu quero abrir um fio temático e ler todas
> as mensagens que outros membros postaram, para participar da conversa
> do grupo no meu próprio ritmo.**

## Problema

O Conjunto é, em essência, um lugar onde acontecem conversas
temáticas persistentes. Sem fios, não há produto: tudo o mais
(membros, biblioteca, encontros) é infraestrutura. Os fios são o
miolo.

## Solução

Duas tabelas: `threads` (título, membro que iniciou, data) e
`messages` (referência ao fio, autor, corpo, timestamp). Rotas
`/threads` para listagem ordenada por data de início, e
`/threads/:id` para leitura do fio com todas as mensagens.

Mensagens são texto plano. Markdown adicionado quando alguém pedir
explicitamente (decisão consciente de adiamento).

## Notas

Em v0.1.0, os fios e mensagens são plantados via seed. Criação de
fio e postagem de mensagem pela UI entram em v0.1.x.
