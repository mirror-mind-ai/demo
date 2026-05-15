# CV0.E1.S5 — Documentação dentro do produto

**Status:** ✅ completo
**Versão:** v0.1.0
**Epic:** [CV0.E1 — Tracer Bullet](../)

**Documentação técnica:** [Plan](plan.md) · [Test guide](test-guide.md) · [Refactoring](refactoring.md)

> **Como membro (ou visitante curioso), eu quero navegar pela
> documentação do Conjunto sem sair do produto, para entender o que
> está sendo construído, como, e por quê, sem precisar trocar de
> ferramenta.**

## Problema

A documentação do Conjunto não deveria viver em "outro lugar" (um
site Astro, um Docusaurus, um repo separado). Quem chega no
Conjunto precisa poder atravessar a documentação dentro do próprio
produto, sem trocar de ferramenta. Caso contrário, a documentação
fica longe da experiência e vira artefato secundário.

## Solução

Rota `/docs` que lê a árvore do filesystem em runtime e renderiza
cada arquivo markdown como HTML. Sidebar de navegação gerada da
estrutura de pastas. Links relativos entre docs são reescritos para
rotas internas. Frontmatter YAML é descartado no render.

Decisão registrada em [D4](../../../decisions.md#d4-documenta\u00e7\u00e3o-dentro-do-produto).

## Notas

Considerei usar Astro ou Docusaurus. Recusei porque ~80 linhas de
código resolvem o problema com folga, sem adicionar uma stack
inteira. A edição em `docs/` aparece imediatamente, sem build.
