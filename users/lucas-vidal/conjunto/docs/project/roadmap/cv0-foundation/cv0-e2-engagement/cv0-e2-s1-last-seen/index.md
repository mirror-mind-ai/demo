# CV0.E2.S1 — Indicador de última vez online

**Status:** ✅ completa
**Epic:** [CV0.E2 — Engajamento](../)
**Versão:** `v0.2.1`

> **Como membro do Conjunto, eu quero ver "última vez online: há X" no
> perfil de outro membro, para sentir o ritmo de vida da comunidade
> sem precisar perguntar diretamente.**

## Problema

Quando um membro abre o perfil de outro, não tem nenhuma pista de que
aquele outro está atravessando o produto ou sumiu há semanas. Em
comunidade de sete pessoas, isso é facilmente substituível por
contato direto, mas o sinal de "este membro está aqui agora" muda
qualitativamente a sensação de comunidade viva.

## Solução

Coluna `last_seen_at` na tabela `members`, atualizada
automaticamente a cada request autenticado pelo middleware
`ensureMember`. Exibição como texto relativo em português ("há X
minutos/horas/dias") no perfil e na listagem de membros. O membro
não vê o próprio last-seen (seria sempre "agora mesmo").

## Tasks executadas

| # | Task | Arquivos |
|---|------|----------|
| T1 | Schema: coluna `last_seen_at` + migration idempotente | `src/db.ts` |
| T2 | Tipo: campo na interface `Member` | `src/db.ts` |
| T3 | Middleware: UPDATE no `ensureMember` | `src/lib/auth.ts` |
| T4 | Função `formatRelativeTime` | `src/lib/time.ts` (novo) |
| T5 | Perfil: exibir last-seen em `/members/:id` | `src/routes/members.ts` |
| T6 | Testes: 15 testes em `tests/last-seen.test.ts` | `tests/last-seen.test.ts` (novo) |
| T7 | Listagem: exibir last-seen em `/members` | `src/routes/members.ts` |

## Documentação

- [`plan.md`](plan.md) — decisões de design, alternativas, schema
- [`test-guide.md`](test-guide.md) — testes automatizados e roteiro manual
