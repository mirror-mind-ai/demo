# Plan — S6

## Resumo

Garantir que o estado inicial do Conjunto (sete fundadores, cinco
fios com mensagens) seja reproduzível com um único comando. Script
`scripts/seed.ts` apaga e recria as três tabelas a cada execução.

## Alternativas consideradas

- **Migrations versionadas + seeds incrementais.** Padrão da
  indústria. Adiciona ferramental (Prisma migrate, Knex migrations,
  ou similar) e cerimônia (cada mudança vira um arquivo numerado
  com `up` e `down`). Em MVP, recusado porque o produto não tem
  dados de produção a preservar.
- **Seed via SQL puro** (`schema.sql` aplicado ao banco). Mais
  enxuto mas perde a tipagem do TypeScript e a integração com os
  helpers de `src/db.ts`. Em volume MVP, escrever inserts em SQL é
  mais cedo do que necessário.
- **YAML / JSON de dados separado do código.** Permitiria que
  alguém não-dev editasse os fundadores. Recusado por
  prematuro — nenhum não-dev está editando o seed agora, e o custo
  de "abrir o YAML" não vai aparecer até a v0.2.0.

## Decisões

- Um arquivo único: `scripts/seed.ts`. Carrega o `db.ts`, faz três
  DELETEs em ordem (messages → threads → members), depois insere
  tudo.
- Ordem de DELETE importa por causa dos `ON DELETE CASCADE`: deletar
  messages primeiro é redundante (CASCADE faria), mas explícito é
  mais legível.
- Dados inline em TypeScript. Estruturas tipadas: array de
  `members`, array de `threadSeeds` com `messages` aninhadas.
- Idempotência: rodar `npm run seed` duas vezes produz o mesmo
  estado final. Garantido pelo DELETE + INSERT.
- Os sete fundadores são os sete líderes técnicos do grupo
  Sustentação que Lucas conduz. Os fios iniciais são conversas
  plausíveis sobre temas reais da liderança técnica
  (promoção adiada, delegação, saída de empresa, imposter syndrome,
  reorg de squads).

## Trade-offs aceitos

- Cada `npm run seed` reseta o banco. Se houver estado de
  desenvolvimento gerado entre runs (membros novos, fios novos),
  vai embora. Tolerável no MVP porque o desenvolvimento ainda não
  produz estado relevante.
- Os ids gerados pelo seed (1 a 8 para membros, 1 a 5 para
  threads) são previsíveis. Útil para testes manuais que linkam por
  id, mas torna o sistema sensível à ordem das inserções. Quando o
  produto crescer, IDs aleatórios (UUID) ficam preferíveis.
