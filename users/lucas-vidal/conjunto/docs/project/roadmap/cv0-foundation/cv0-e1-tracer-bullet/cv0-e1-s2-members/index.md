# CV0.E1.S2 — Membros listados e perfis lidos

**Status:** ✅ completo
**Versão:** v0.1.0
**Epic:** [CV0.E1 — Tracer Bullet](../)

**Documentação técnica:** [Plan](plan.md) · [Test guide](test-guide.md) · [Refactoring](refactoring.md)

> **Como membro do Conjunto, eu quero ver a lista de membros e abrir o
> perfil de cada um, para saber quem mais está aqui e me situar na
> comunidade.**

## Problema

Para o Conjunto ser uma comunidade, os membros precisam ser
entidades de primeira ordem: catalogados, lidos, conectados a
papéis e empresas. Sem isso, fios e biblioteca ficam pendurados em
vazio.

## Solução

Tabela `members` com nome, email, papel, empresa, biografia e data
de entrada. Rotas `/members` (lista ordenada) e `/members/:id`
(perfil individual). Render server-side em HTML simples, sem
JavaScript no cliente.

Cadastro acontece via `npm run seed` (decisão D5). UI de cadastro
real entra no [CV2 — Abertura externa](../../../../../project/roadmap/index.md#cv2--abertura-externa) junto com auth real.

## Notas

Sem foto, sem campos custom, sem edição pela UI. Adicionado por
demanda real.
