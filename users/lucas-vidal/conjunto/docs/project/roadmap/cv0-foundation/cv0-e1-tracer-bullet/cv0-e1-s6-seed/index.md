# CV0.E1.S6 — Seed reprodutível dos fundadores

**Status:** ✅ completo
**Versão:** v0.1.0
**Epic:** [CV0.E1 — Tracer Bullet](../)

**Documentação técnica:** [Plan](plan.md) · [Test guide](test-guide.md)

> **Como construtor do Conjunto, eu quero reconstruir o estado inicial
> do produto com um único comando, para que demos e testes sejam
> previsíveis e o estado entre máquinas não divirja.**

## Problema

Em MVP, o estado da comunidade precisa ser reproduzível: qualquer
desenvolvedor que clone o repo deve conseguir subir o produto com a
mesma configuração inicial. Estado divergente entre máquinas
significa testes irreproduzíveis e demos imprevisíveis.

## Solução

Script `scripts/seed.ts`. `npm run seed` apaga as três tabelas
(`members`, `threads`, `messages`) e recria do zero com os sete
fundadores e cinco fios iniciais. Idempotente.

Decisão registrada em [D5](../../../decisions.md#d5-seed-como-verdade-do-mvp).

## Notas

Os sete fundadores são os sete líderes técnicos do grupo Sustentação
(o grupo de mentoria recorrente que Lucas toca há onze meses). Os
fios iniciais são conversas plausíveis sobre temas reais (promoção
adiada, delegação, saída de empresa, imposter syndrome, reorg de
squads).
