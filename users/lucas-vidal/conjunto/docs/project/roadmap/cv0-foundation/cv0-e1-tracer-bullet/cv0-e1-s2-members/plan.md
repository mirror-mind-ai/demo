# Plan — S2

## Resumo

Catalogar membros como entidades persistentes no banco e expor duas
páginas: lista de todos (`/members`) e perfil individual
(`/members/:id`). É a primeira tabela do produto e a primeira
experiência completa de leitura.

## Alternativas consideradas

- **Membros como configuração** (YAML ou JSON estático no repo, sem
  banco). Mais simples para o MVP, mas torna a próxima story
  (`fios`) inviável: fios referenciam membros, e relacionamentos em
  arquivo estático ficam frágeis. Recusado.
- **Membros sem campo de papel/empresa**, apenas nome e email. Mais
  enxuto, mas perderia a informação que mais identifica um membro
  no contexto do Conjunto (que tipo de líder técnico ele é, onde
  trabalha). Recusado.
- **Foto/avatar desde o início.** Tentação estética. Recusado porque
  agrega complexidade (upload, storage, fallback) sem mudar o que o
  MVP está validando.

## Decisões

- Tabela `members` com `id`, `name`, `email` (UNIQUE), `role`,
  `company` (nullable), `bio` (nullable), `joined_at` (default
  `CURRENT_TIMESTAMP`).
- Ordenação default da lista é alfabética por nome. Quando o produto
  ganhar volume de membros, vai existir um toggle para ordenar por
  atividade recente (CV0.E2.S3), mas o default fica.
- Rotas:
  - `GET /members` — lista todos com nome, papel, empresa.
  - `GET /members/:id` — perfil individual com biografia e data de
    entrada.
- 404 HTML simples quando o id não existe. Não vale construir uma
  página de "membro não encontrado" elaborada agora.

## Schema

```sql
CREATE TABLE members (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  email      TEXT    NOT NULL UNIQUE,
  role       TEXT    NOT NULL,
  company    TEXT,
  bio        TEXT,
  joined_at  TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Trade-offs aceitos

- Sem edição pela UI. Em MVP, perfis vivem no `npm run seed`
  (decisão D5). Edição direta entra quando houver mais que sete
  membros.
- Sem foto. Espaço reservado no layout vai aparecer quando a
  expectativa pedir.
