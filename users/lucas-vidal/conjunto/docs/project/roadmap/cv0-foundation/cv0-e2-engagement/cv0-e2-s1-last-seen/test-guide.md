# CV0.E2.S1 — Test Guide

## Testes automatizados

Arquivo: `tests/last-seen.test.ts` — 15 testes.

### Cobertura

| Grupo | Testes | O que cobre |
|-------|--------|-------------|
| `formatRelativeTime` | 12 | Todas as faixas de formatação relativa (agora mesmo, minutos, horas, dias, semanas, mês+), input inválido, timestamp futuro |
| Schema — fresh | 1 | Coluna `last_seen_at` existe ao criar banco do zero |
| Schema — legacy | 1 | ALTER TABLE idempotente adiciona coluna em banco sem ela |
| UPDATE | 1 | `last_seen_at` passa de NULL para não-NULL após UPDATE |

### Como rodar

```bash
npx vitest run
```

Resultado esperado: 23 testes passando (15 de last-seen + 8 de docs).

---

## Roteiro de teste manual

### Preparação

```bash
npm run dev
```

Abrir `http://localhost:3030`.

### 1. NULL não gera texto visível

- Abrir `/members` com base limpa (ou antes de navegar como outros membros).
- Nenhum membro mostra "Última vez online".
- Abrir perfil de qualquer membro: linha de last-seen ausente.

### 2. Navegação atualiza last-seen

- Trocar para outro membro pelo seletor no rodapé.
- Navegar em uma ou duas páginas.
- Voltar para o primeiro membro.
- Abrir `/members`: o membro que navegou mostra "Última vez online: agora mesmo" ou "há 1 minuto".
- Abrir o perfil dele: mesma linha presente abaixo de "No Conjunto desde...".

### 3. Próprio perfil oculta last-seen

- Abrir o próprio perfil.
- Confirmar que "Última vez online" não aparece.

### 4. Formatação relativa (opcional)

Forçar timestamps via `sqlite3`:

```bash
sqlite3 data/conjunto.db "UPDATE members SET last_seen_at = datetime('now', '-3 hours') WHERE id = 2;"
```

Recarregar `/members` e confirmar "há 3 horas". Repetir para `-5 days` ("há 5 dias") e `-45 days` ("há mais de um mês").
