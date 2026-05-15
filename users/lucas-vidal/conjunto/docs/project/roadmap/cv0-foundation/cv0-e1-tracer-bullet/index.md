# CV0.E1 — Tracer Bullet

**Status:** ✅ completo
**Versão:** v0.1.0 (12/05/2026)

## Critério de pronto

Rodar `npm run dev`, abrir o navegador, ver a home, navegar até um
fio, ler as mensagens, navegar para o perfil de um membro, ler a
biografia, abrir a documentação dentro do app.

## Stories

| Código | Story | Status |
|--------|-------|--------|
| [S1](cv0-e1-s1-server-health/) | Tracer bullet servidor + health | ✅ |
| [S2](cv0-e1-s2-members/) | Membros listados e perfis lidos | ✅ |
| [S3](cv0-e1-s3-cookie-auth/) | Auth simulada por cookie | ✅ |
| [S4](cv0-e1-s4-threads/) | Fios e mensagens persistentes | ✅ |
| [S5](cv0-e1-s5-docs-inline/) | Documentação dentro do produto | ✅ |
| [S6](cv0-e1-s6-seed/) | Seed reprodutível dos fundadores | ✅ |

## Resultado

Lançado em 12 de maio de 2026 como v0.1.0. Detalhes narrativos em
[release notes](../../../../releases/v0.1.0.md).

## Lições aprendidas

A tentação de "fazer direito" foi forte. Quase aceitei o plano
inicial de "subir com Next.js para já ficar pronto para
v0.3.0". Resisti, e ganhei pelo menos quinze dias de trabalho que
estavam virando dívida invisível.

A documentação dentro do produto (S5) saiu mais simples do que eu
projetava. 80 linhas resolveram o que eu estava prestes a gastar
três dias avaliando Astro vs Docusaurus.
