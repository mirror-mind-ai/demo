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
npm test               # vitest, 8 testes hoje
```

## Stack

TypeScript + Hono + better-sqlite3 + HTML server-rendered. Sem
framework de front-end. Decisão registrada em
[D1](docs/project/briefing.md#d1-boring-stack-first).

## Onde está o estado

Banco SQLite em `data/conjunto.db`. Apagado e recriado a cada `npm run seed`.

## Versão atual

**v0.2.0** — Editorial. Release notes em [`docs/releases/v0.2.0.md`](docs/releases/v0.2.0.md).
Histórico anterior: [`v0.1.0`](docs/releases/v0.1.0.md) (Tracer Bullet).

Próxima entrega: **CV0.E2.S1 — last-seen** → `v0.2.1` (PATCH).
