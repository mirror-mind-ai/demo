# CV0.E1.S1 — Tracer bullet servidor + health

**Status:** ✅ completo
**Versão:** v0.1.0
**Epic:** [CV0.E1 — Tracer Bullet](../)

**Documentação técnica:** [Plan](plan.md) · [Test guide](test-guide.md)

> **Como construtor do Conjunto, eu quero um servidor mínimo rodável
> e uma rota `/health` funcional, para garantir que existe um produto
> antes de começar a construir features.**

## Problema

Antes de qualquer feature, o Conjunto precisava existir como
servidor mínimo rodável. Sem isso, todas as outras stories são
hipotéticas.

## Solução

Hono sobre `@hono/node-server`, porta 3030, rota `/` com placeholder
e rota `/health` que responde "ok". Quinze minutos de trabalho, mas
marco crítico: a partir desse commit, existe um produto.

## Marcos

- 28 de abril de 2026 — primeiro `curl http://localhost:3030/health`
  respondendo "ok".
