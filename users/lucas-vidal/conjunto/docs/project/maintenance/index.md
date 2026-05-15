# Manutenção

Esta pasta abriga **Unidades de Trabalho que não pertencem a uma
Unidade de Progresso** — trabalho legítimo que não escala para
Epic/Story do roadmap. Sob a taxonomia definida em
[`development-guide.md`](../../process/development-guide.md#taxonomia-tr%C3%AAs-n%C3%ADveis-de-progresso),
é Trabalho fora do mapa narrativo.

---

## O que vive aqui

Coisas que mudam a tríade processo-projeto-produto mas que não
constituem narrativa de progresso para o usuário:

- Refator interno sem mudança de comportamento.
- Atualização de dependências.
- Fix de tipagem, lint, formatação.
- Ajuste de processo (mudanças neste guia, no triad, etc.).
- Limpeza de docs derivada.
- Reorganização de pastas, renomeações.
- Pequenas correções operacionais sem story que as comporte.

---

## O que **não** vive aqui

- Stories de roadmap (vão para `../roadmap/cvN-eM-sK-*/`).
- Bugs que afetam comportamento observável do usuário (viram story
  dentro do epic correspondente, ou story sem epic em caso raro).
- Decisões arquiteturais (vão para [`../decisions.md`](../decisions.md)
  ou [`../briefing.md`](../briefing.md)).

A pergunta de filtro: *"isso é progresso para o usuário?"*. Se sim,
é story; vai para o roadmap. Se não, é manutenção; vive aqui.

---

## Estrutura

Cada bloco de manutenção significativo ganha um arquivo próprio:

```
maintenance/
├── index.md                          ← este documento
├── YYYY-MM-DD-<slug-curto>.md        ← bloco de manutenção
└── ...
```

Manutenções triviais (fix isolado, ajuste pequeno) podem viver
apenas no [`worklog.md`](../../process/worklog.md) sem ganhar
arquivo próprio aqui. A régua: se o bloco tem decisões registráveis,
racional, ou pode ser referenciado depois, ganha arquivo; se não,
só worklog basta.

---

## Relação com versionamento

Manutenção em geral **não gera release**. Vive nos docs e no
worklog. Exceções (ver
[`versioning.md`](../../process/versioning.md#casos-de-borda)):

- Manutenção que muda comportamento observável do produto pode
  justificar um PATCH bump.
- Manutenção puramente de processo/projeto **nunca** gera release.

---

## Relação com expand/collapse

Manutenção é geralmente **collapse de baixa amplitude** — ajustes
que reintegram partes que se descolaram, sem produzir valor
emergente novo. Ocasionalmente é **expand técnico** — refator que
diferencia melhor partes antes confundidas. Em qualquer caso, não
sai do território do Trabalho; não cruza para Progresso.
