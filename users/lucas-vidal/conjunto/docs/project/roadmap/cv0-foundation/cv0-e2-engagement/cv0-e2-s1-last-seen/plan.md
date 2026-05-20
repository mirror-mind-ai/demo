# CV0.E2.S1 — Plano: Indicador de última vez online

## Decisão central

Registrar `last_seen_at` no banco toda vez que um membro autenticado
faz qualquer request, e exibir "Última vez online: há X" no perfil
de outro membro.

## Por que essa abordagem

O middleware `ensureMember` já roda em todo request e já resolve o
membro ativo. É o ponto natural para fazer o UPDATE. Um UPDATE por
request é barato em SQLite WAL para sete usuários; sem necessidade
de throttle, fila, ou tabela separada.

Alternativa considerada e descartada: tabela `sessions` com
timestamps separados. Complexidade sem benefício nesta escala. Se
algum dia houver necessidade de analytics de sessão (duração,
páginas visitadas), revisito. Hoje, um campo na tabela `members`
resolve.

## Schema

Adicionar coluna `last_seen_at TEXT` à tabela `members`.

No `CREATE TABLE IF NOT EXISTS`, a coluna entra direto. Para bancos
legados (já criados antes desta story), ALTER idempotente no mesmo
padrão das colunas `currently` e `avatar_img`:

```sql
ALTER TABLE members ADD COLUMN last_seen_at TEXT
```

Sem default: membro que nunca acessou tem `NULL`. A UI trata NULL
como "ainda não visto".

## Atualização

No middleware `ensureMember` (`src/lib/auth.ts`), logo após resolver
o membro corrente, executar:

```ts
db.prepare("UPDATE members SET last_seen_at = CURRENT_TIMESTAMP WHERE id = ?")
  .run(current.id);
```

Isso garante que qualquer navegação atualiza o timestamp. Sem
debounce: a granularidade de "último request" é suficiente para a
exibição relativa (minutos/horas/dias).

## Exibição

Na página de perfil (`/members/:id`), abaixo da linha "No Conjunto
desde...", adicionar:

```
Última vez online: há 3 horas
```

Regras de formatação relativa:

| Diferença | Texto |
|-----------|-------|
| < 1 min | agora mesmo |
| 1–59 min | há X minutos (singular se 1) |
| 1–23 h | há X horas (singular se 1) |
| 1–6 dias | há X dias (singular se 1) |
| 7–29 dias | há X semanas (singular se 1) |
| ≥ 30 dias | há mais de um mês |
| NULL | (não exibir nada) |

**Visibilidade:** o membro vê o last-seen de *outros* membros, não
o próprio. No próprio perfil, a linha não aparece (seria "agora
mesmo" sempre, sem utilidade).

## Tipo

Adicionar `last_seen_at: string | null` à interface `Member` em
`db.ts`.

## Testes

Três testes em `tests/last-seen.test.ts`:

1. **Formatação relativa** — função pura `formatRelativeTime(iso)`
   recebe ISO string, retorna texto em português. Testável com
   datas fabricadas sem banco.

2. **Coluna existe** — abrir um banco `:memory:`, rodar o schema,
   verificar que a coluna `last_seen_at` existe em `members`.

3. **Atualização via middleware** — criar membro, simular request
   (ou chamar a função de update diretamente), verificar que
   `last_seen_at` não é mais NULL.

## CSS

Reutilizar a classe `.meta` existente no layout. Sem CSS novo. A
linha é sóbria, mesma tipografia da data de entrada.

## Tasks

| # | Task | Dimensão |
|---|------|----------|
| T1 | Schema: adicionar coluna `last_seen_at` + migration idempotente | produto |
| T2 | Tipo: atualizar interface `Member` | produto |
| T3 | Middleware: UPDATE no `ensureMember` | produto |
| T4 | Função `formatRelativeTime` em `src/lib/time.ts` | produto |
| T5 | Perfil: exibir last-seen no template de `/members/:id` | produto |
| T6 | Testes: `tests/last-seen.test.ts` | produto |
| T7 | Lista de membros: exibir last-seen na listagem `/members` | produto |

T7 é opcional. A story diz "no perfil", mas exibir na listagem
também faz sentido (o membro escaneia quem está ativo sem clicar em
cada perfil). Incluo se o custo for baixo (é uma linha a mais no
template). Se gerar ruído visual, deixo para S3 (lista por
atividade).

## Versão de saída

`v0.2.1` (PATCH) conforme roadmap.
