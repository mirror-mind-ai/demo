# Plan — S4

## Resumo

Persistir conversas temáticas como entidades de primeira ordem do
produto. Cada fio é aberto por um membro, recebe mensagens de
qualquer outro, e é navegável por listagem ordenada por data de
início.

## Alternativas consideradas

- **Mensagens em formato livre, sem fios estruturados.** Mais
  flexível, mas perde a propriedade central do Conjunto: a conversa
  vive em torno de um tema persistente. Recusado.
- **Tabela única de "posts" com `parent_id` para encadear**
  (modelo de threading recursivo). Flexível, mas overkill: o
  Conjunto não tem necessidade de threading aninhado, e a query
  recursiva é mais cara que a query linear para o caso simples.
- **Sem foreign keys explícitas** (referências por id, sem
  CASCADE). Recusado porque deixa o estado divergir silenciosamente.
  Com `ON DELETE CASCADE`, deletar um membro deleta seus fios e
  mensagens.

## Decisões

- Duas tabelas: `threads` (id, title, started_by, started_at) e
  `messages` (id, thread_id, author_id, body, posted_at).
- Foreign keys com `ON DELETE CASCADE`. Removida uma pessoa,
  removidos seus fios e mensagens automaticamente.
- Índice composto em `messages(thread_id, posted_at)` para que a
  query de leitura de fio (filtrar por thread, ordenar por data)
  seja eficiente desde o primeiro dia.
- Mensagens são texto plano. Sem markdown, sem mentions, sem
  formatação. Adicionar quando dois membros pedirem explicitamente.
- Rotas:
  - `GET /threads` — lista todos os fios com autor + número de
    mensagens, ordenado por data decrescente.
  - `GET /threads/:id` — fio individual com todas as mensagens em
    ordem cronológica.

## Schema

```sql
CREATE TABLE threads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT    NOT NULL,
  started_by  INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  started_at  TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  thread_id   INTEGER NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  author_id   INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  body        TEXT    NOT NULL,
  posted_at   TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_thread ON messages(thread_id, posted_at);
```

## Trade-offs aceitos

- Sem criação de fio pela UI no MVP. Fios são plantados via
  `npm run seed`. Criação pela UI entra em v0.1.x.
- Sem postagem de mensagem pela UI no MVP. Idem.
- Sem edição ou exclusão pelo autor. Entra quando alguém pedir
  duas vezes.
