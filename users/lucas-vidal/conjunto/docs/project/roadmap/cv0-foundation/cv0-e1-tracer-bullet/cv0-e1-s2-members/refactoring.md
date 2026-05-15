# Refactoring — S2

## Applied

Nada. A story foi pequena, o código tem ~50 linhas distribuídas
entre o repositório de DB e as rotas. Não há duplicação real ainda.

## Evaluated, not done

**`formatDate` no escopo de view.** A função existe inline em
`routes/members.ts`. Provavelmente vai duplicar em
`routes/threads.ts` quando S4 entrar. Critério para extrair: terceira
ocorrência (rule of three). Hoje só temos uma.

**Helper para escapar HTML.** Está embutido em `views/layout.ts`.
Suficiente por enquanto. Quando for ser usado em três lugares
distintos, mover para `lib/`.
