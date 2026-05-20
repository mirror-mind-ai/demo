# Conjunto

Comunidade fechada para líderes técnicos brasileiros. MVP boring stack,
construído solo pelo Lucas.

Toda a documentação viva (princípios, processo, projeto, releases)
vive em [`docs/`](docs/index.md) e é navegável dentro do próprio
produto na rota `/docs`.

## Como rodar

```bash
npm install
npm run seed           # popula data/conjunto.db com sete membros e cinco fios
npm run dev            # sobe em http://localhost:3030
```

## Como testar

```bash
npm test               # vitest, 23 testes hoje
```

## Stack

TypeScript + Hono + better-sqlite3 + HTML server-rendered. Sem
framework de front-end. Decisão registrada em
[D1](docs/project/briefing.md#d1-boring-stack-first).

## Onde está o estado

Banco SQLite em `data/conjunto.db`. Apagado e recriado a cada `npm run seed`.

## Versão atual

**v0.2.1** — Last seen. Release notes em [`docs/releases/v0.2.1.md`](docs/releases/v0.2.1.md).
Histórico: [`v0.2.0`](docs/releases/v0.2.0.md) (Editorial), [`v0.1.0`](docs/releases/v0.1.0.md) (Tracer Bullet).

Próxima entrega: **CV0.E2.S2 — read indicator** → `v0.2.2` (PATCH).
