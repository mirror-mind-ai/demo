# Briefing — Conjunto

**Última atualização:** 12 de maio de 2026
**Natureza:** decisões arquiteturais e de escopo. Documento vivo.

---

## O que é o Conjunto

Comunidade fechada e curada para líderes técnicos brasileiros. Sete
fundadores hoje, capacidade desenhada para até cinquenta nos próximos
doze meses. Modelo recorrente, encontros mensais ao vivo, fios
temáticos assíncronos, biblioteca curada.

O Conjunto não é Slack aberto, não é curso, não é newsletter premium.
É algo entre residência intelectual e comunidade fechada.

## Premissas

Cinco premissas que justificam o desenho.

**1. Construtor solo por escolha.** O Conjunto é construído por uma
pessoa. Todas as decisões de stack, arquitetura e processo respeitam
esse fato. Sofisticação que exige mais de um cérebro para manter é
recusada por design, mesmo quando seria tecnicamente superior.

**2. Coerência entre produto, processo, projeto.** Os princípios do
produto (modesto antes de ambicioso, sem feed, tamanho como restrição)
têm consequência técnica direta. Recusamos features que contradizem os
princípios, mesmo quando ofereceriam ganhos imediatos.

**3. Pequeno por design.** Cada grupo de encontro mensal limitado a
doze pessoas. Cada grupo separado, com curadoria independente. O
crescimento se dá por novos grupos, não por adensamento.

**4. Confidencialidade como contrato.** Encontros não gravados,
conversas em fios sob sigilo. Sem confidencialidade real, não há
profundidade. Sem profundidade, o Conjunto vira mais um Slack.

**5. Curadoria como serviço.** O valor não está no acesso à
informação. O valor está em alguém ter lido, anotado, organizado, e
devolvido o que importa para um líder técnico em um momento
específico.

## Decisões arquiteturais

### D1. Boring stack first

**Decisão:** TypeScript + Hono + better-sqlite3 + HTML
server-rendered. Sem framework de front-end.

**Justificativa:** sobe em segundos, opera com um processo só, todo o
ferramental é familiar e bem documentado. Construtor solo precisa
manter tudo na cabeça em três meses. O custo de stack sofisticado em
estágio MVP é alto e o benefício é zero até haver tração validada.

**Consequência:** Next.js + tRPC + Prisma fica para uma
[release futura](roadmap/index.md#migração-de-stack--release-futura-sem-número-fixo)
quando houver tração validada (>12 assinantes pagantes por 6 meses
contínuos), não no plano atual. A versão não está codificada —
emerge da sequência de epics fechados, conforme
[D8](decisions.md#d8--v020-reconhecida-como-anomalia-de-versionamento).

### D2. SQLite single-file

**Decisão:** banco SQLite em arquivo único, journal mode WAL.

**Justificativa:** o produto opera em escala que sobra para SQLite por
anos. PostgreSQL adiciona complexidade operacional sem benefício no
volume atual. Quando o volume justificar, a migração é direta porque o
acesso é via repositório (helpers em `src/db.ts`), não SQL espalhado.

### D3. Auth simulada no MVP

**Decisão:** cookie com id do membro. Troca aberta de membro na home.

**Justificativa:** auth real consome dias e não muda nada do que está
sendo validado nesse estágio (modelo de oferta, qualidade do conteúdo,
ritmo de encontros). Auth via magic link entra em
[CV2 — Abertura externa](roadmap/index.md#cv2--abertura-externa)
junto com o primeiro lançamento externo.

**Consequência aceita:** qualquer membro pode encarnar qualquer outro
no MVP. Tolerável em comunidade fechada de sete pessoas que se
conhecem fora do produto; intolerável quando abrir externamente.

### D4. Server-rendered HTML

**Decisão:** sem SPA, sem hidratação. Cada navegação é um request.

**Justificativa:** o produto tem ~6 telas; SPA seria over-engineering.
Tempo de carga é menor em server-rendered que em SPA bem feito.
Acessibilidade é melhor por padrão. Não há JS no cliente além de um
ou dois listeners simples.

### D5. Documentação dentro do produto

**Decisão:** a rota `/docs` lê a árvore `docs/` do filesystem e
renderiza markdown ao vivo.

**Justificativa:** quem entra no Conjunto deve poder navegar a
documentação sem trocar de ferramenta. O custo é ~80 linhas de
código; o ganho é que docs param de ser "outro lugar" e viram parte
do produto. Edição em `docs/` aparece imediatamente.

## Conscientemente fora do MVP

Cada item abaixo entra no roadmap quando sua ausência doer no uso.

- **Auth real.** Magic link via email. Entra no [CV2](roadmap/index.md#cv2--abertura-externa).
- **Pagamento.** Stripe. Entra no [CV2](roadmap/index.md#cv2--abertura-externa) junto com a abertura externa.
- **Notificações por email.** Entram quando o volume de fios passar a
  exigir.
- **Busca.** A biblioteca cresce até precisar; antes disso, navegação
  por categoria basta.
- **Markdown nas mensagens de fios.** Texto plano hoje. Adiciono
  quando alguém pedir explicitamente duas vezes.
- **Edição de perfil pelo membro.** Hoje os perfis são editados via
  seed. Entra quando houver mais que sete membros.
- **Mobile nativo.** Web responsiva basta. App nativo é decisão de
  v1.0 em diante, e nem certeza que entrará.

## Glossário

- **Fio.** Conversa temática persistente. Substitui canais de Slack.
- **Encontro.** Reunião ao vivo mensal de até doze membros.
- **Biblioteca curada.** Seleção de conteúdo (artigos, palestras,
  livros) com texto introdutório.
- **Membro fundador.** Um dos sete primeiros membros, que entrou antes
  do lançamento externo.

---

**Veja também:** [Decisões incrementais](decisions.md) ·
[Roadmap](roadmap/index.md) ·
[Princípios de produto](../product/principles.md)
