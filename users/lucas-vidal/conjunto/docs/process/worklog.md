# Worklog

Resumo do trabalho por dia. Atualizado a cada story fechada.

---

## 20 de maio de 2026

**v0.2.1 — Last seen** lançada.

CV0.E2.S1 completa. Coluna `last_seen_at` na tabela `members`,
atualizada a cada request pelo middleware `ensureMember`. Exibição
como tempo relativo em português no perfil e na listagem de membros.
O próprio membro não vê o seu last-seen. Função pura
`formatRelativeTime` em `src/lib/time.ts`, com 12 cenários de teste.
15 testes novos, 23 no total, zero dependências novas.

Release note em `docs/releases/v0.2.1.md`.

---

## 15 de maio de 2026

**v0.2.0 — Editorial** lançada.

Quatro direções de design aplicadas em sequência (refino editorial →
funcional silencioso → identidade visual → membros vivos), dezenove
commits, zero novas dependências de runtime, zero quebras de teste.
Detalhe na release note `docs/releases/v0.2.0.md`.

Registrei também a D8 em `decisions.md`: a v0.2.0 saiu como MINOR
mas, pela regra de `versioning.md`, era PATCH (trabalho fora de
roadmap). Anomalia reconhecida, histórico preservado, regra retomada
a partir daqui — próxima entrega (S1 last-seen) sai como `v0.2.1`.

---

## 12 de maio de 2026

**v0.1.0 — Tracer Bullet** lançada.

CV0.E1 completo. Sete membros cadastrados (os sete do Sustentação),
cinco fios iniciais com pelo menos uma mensagem cada, biblioteca em
estado mínimo, navegação básica funcional. O Conjunto agora existe
como produto rodável, mesmo que ainda só localmente e ainda só para
os fundadores.

Tempo total da CV0.E1: três semanas. Mais do que eu projetei, menos
do que se eu tivesse aceito a sugestão inicial de "fazer com Next.js
e migrar tudo depois". Bons quinze dias economizados ali.

---

## 9 de maio de 2026

Fechei CV0.E1.S5 — biblioteca curada (primeira versão).

Comecei a story esperando construir uma listagem rica de conteúdos
com filtros, tags, busca, e categorização. Plano sobreviveu até eu
abrir o vitest e pensar em quantos testes precisaria para garantir
todos esses cortes. Reescrevi o plano: lista simples ordenada por
data, descrição curadora, sem filtro, sem busca. Voltarei a essa
story na CV1 quando houver volume de conteúdo que justifique.

---

## 6 de maio de 2026

CV0.E1.S4 — fios temáticos. Modelo de dados: threads + messages.
Render server-side, sem cliente JS. Resisti a adicionar markdown nos
posts dos membros; ficou só texto plano por enquanto.

---

## 2 de maio de 2026

CV0.E1.S2 e S3 — membros e perfis. Cadastro simulado via seed
script. Perfil mostra nome, papel, empresa, bio curta, e data de
entrada. Sem foto, sem campos custom; quando precisar, adiciono.

---

## 28 de abril de 2026

CV0.E1.S1 — primeiro deploy local rodável. Hono server, SQLite,
rota /health, página inicial estática. Quinze minutos de trabalho,
mas serviu como tracer bullet de verdade: terminou com curl
respondendo "ok", o que é o critério mínimo de "começamos".

---

## 25 de abril de 2026

Briefing escrito. Decisões D1 a D5 registradas. Roadmap CV0
desenhado. Stack escolhido. Decisões deixadas conscientemente fora
do MVP listadas.

Notei que escrever o briefing demorou três dias mais do que eu
esperava. Não porque ele seja longo, mas porque cada vez que eu
ia escrever, percebia uma decisão que eu ainda não tinha tomado.
Escrever o briefing É tomar as decisões.
