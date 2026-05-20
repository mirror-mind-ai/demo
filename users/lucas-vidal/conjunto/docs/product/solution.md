# A Solução

O Conjunto foi desenhado em torno das três qualidades que faltam a
esse espaço: intimidade, continuidade, proteção. A premissa é que **um
espaço bem desenhado consegue sustentar relações que mereciam
acontecer e que hoje não acontecem por falta de lugar.** O Conjunto
não inventa uma necessidade nova; ele cria a infraestrutura para uma
necessidade que já existia e estava sendo mal servida.

Os [princípios de design](principles.md) detalham como essa intenção
se materializa em decisões concretas. O que vem abaixo é o estado
atual do produto na release mais recente ([`v0.2.1`](../releases/v0.2.1.md) Last seen).

---

## Membros

Cada membro tem um perfil com nome, papel, empresa, biografia curta e
data de entrada. A lista completa de membros é acessível em
`/members`. Perfis individuais em `/members/:id`.

No MVP, o cadastro acontece via script de seed (`npm run seed`).
Cadastro real com magic link via email entra no
[CV2 — Abertura externa](../project/roadmap/index.md#cv2--abertura-externa).

## Fios temáticos

Fios são conversas persistentes em torno de um tópico específico.
Cada fio tem um título, um membro que o iniciou e uma sequência
cronológica de mensagens. A lista de fios está em `/threads`. Cada fio
é lido em `/threads/:id`.

No MVP, os fios são plantados via seed. Criação e postagem pela UI
entram no [CV2 — Abertura externa](../project/roadmap/index.md#cv2--abertura-externa)
junto com cadastro real.

## Identidade ativa

Em qualquer página, o membro sabe sob qual identidade está navegando,
e pode trocar via dropdown na home. No MVP, qualquer membro pode
encarnar qualquer outro (auth simulada). Sessão real com identidade
única por dispositivo entra no
[CV2 — Abertura externa](../project/roadmap/index.md#cv2--abertura-externa).

## Documentação dentro do produto

Toda a documentação viva do Conjunto é navegável em `/docs`. A árvore
de pastas vira sidebar, cada markdown vira página renderizada, e
links relativos entre docs viram rotas internas. Edição em `docs/`
aparece em tempo real, sem rebuild.

A documentação não é separada do produto. Ela é parte dele. Quem quer
entender o Conjunto, entra no Conjunto.

## O que ainda não existe

Para clareza, o que está consciente fora deste lançamento:

- Auth real (magic link via email) — [CV2](../project/roadmap/index.md#cv2--abertura-externa)
- Pagamento via Stripe — [CV2](../project/roadmap/index.md#cv2--abertura-externa)
- Cadastro de novo membro pela UI — [CV2](../project/roadmap/index.md#cv2--abertura-externa)
- Criação de fio pela UI — [CV2](../project/roadmap/index.md#cv2--abertura-externa)
- Postagem em fio existente pela UI — [CV2](../project/roadmap/index.md#cv2--abertura-externa)
- Markdown nas mensagens — quando alguém pedir explicitamente
- Busca na biblioteca — quando o volume justificar
- Notificações por email — quando o ritmo exigir
- App mobile nativo — talvez nunca

Lista completa em [Conscientemente fora do MVP](../project/briefing.md#conscientemente-fora-do-mvp).
