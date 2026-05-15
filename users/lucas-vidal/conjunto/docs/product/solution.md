# A Solução

O Conjunto foi desenhado em torno das três qualidades que faltam a
esse espaço: intimidade, continuidade, proteção. A premissa é que **um
espaço bem desenhado consegue sustentar relações que mereciam
acontecer e que hoje não acontecem por falta de lugar.** O Conjunto
não inventa uma necessidade nova; ele cria a infraestrutura para uma
necessidade que já existia e estava sendo mal servida.

Os [princípios de design](principles.md) detalham como essa intenção
se materializa em decisões concretas. O que vem abaixo é o estado
atual do produto em v0.1.0.

---

## Membros

Cada membro tem um perfil com nome, papel, empresa, biografia curta e
data de entrada. A lista completa de membros é acessível em
`/members`. Perfis individuais em `/members/:id`.

No MVP, o cadastro acontece via script de seed (`npm run seed`). Em
v0.2.0, entra cadastro real com magic link via email.

## Fios temáticos

Fios são conversas persistentes em torno de um tópico específico.
Cada fio tem um título, um membro que o iniciou e uma sequência
cronológica de mensagens. A lista de fios está em `/threads`. Cada fio
é lido em `/threads/:id`.

Em v0.1.0, os fios são plantados via seed. Criação e postagem pela UI
entram em v0.1.x.

## Identidade ativa

Em qualquer página, o membro sabe sob qual identidade está navegando,
e pode trocar via dropdown na home. No MVP, qualquer membro pode
encarnar qualquer outro (auth simulada). Em v0.2.0, isso passa a ser
sessão real com identidade única por dispositivo.

## Documentação dentro do produto

Toda a documentação viva do Conjunto é navegável em `/docs`. A árvore
de pastas vira sidebar, cada markdown vira página renderizada, e
links relativos entre docs viram rotas internas. Edição em `docs/`
aparece em tempo real, sem rebuild.

A documentação não é separada do produto. Ela é parte dele. Quem quer
entender o Conjunto, entra no Conjunto.

## O que ainda não existe

Para clareza, o que está consciente fora deste lançamento:

- Auth real (magic link via email) — v0.2.0
- Pagamento via Stripe — v0.2.0
- Cadastro de novo membro pela UI — v0.2.0
- Criação de fio pela UI — v0.1.x
- Postagem em fio existente pela UI — v0.1.x
- Markdown nas mensagens — quando alguém pedir explicitamente
- Busca na biblioteca — quando o volume justificar
- Notificações por email — quando o ritmo exigir
- App mobile nativo — talvez nunca

Lista completa em [Conscientemente fora do MVP](../project/briefing.md#conscientemente-fora-do-mvp).
