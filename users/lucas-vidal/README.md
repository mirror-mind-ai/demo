# Lucas Vidal

Consultor independente em engenharia de software e liderança técnica, em
transição da corporação para um modelo próprio de oferta. Personagem fictício
em pt-BR.

## Quem é em uma frase

Lucas Vidal, 38 anos, mora em Florianópolis com a esposa Marina e a filha
Olívia. Saiu de uma posição de head of engineering em fintech em dezembro
de 2024 e está há dezessete meses como consultor solo, com três frentes
ativas (cliente Klar, grupo de mentoria Sustentação, plataforma Conjunto em
construção) e uma decisão grande na mesa: renovar ou não o contrato com a
Klar por mais doze meses.

## Travessias ativas

| Travessia | Foco |
|---|---|
| `conjunto` | Plataforma de comunidade para líderes técnicos (em construção, Next.js+tRPC+Prisma). |
| `klar` | Consultoria atual, migração Node JS → TS+NestJS. Renovação de 12 meses em cima da mesa. |
| `sustentacao` | Grupo recorrente de mentoria com sete líderes técnicos. |
| `blog` | lucasvidal.dev, oito mil leitores/mês. |
| `pos-corporativo` | Travessia existencial dos dezessete meses fora da corporação. |
| `vida-familiar` | Marina, Olívia, e o ritmo doméstico. |

## Personas ativas

| Persona | Quando ativa |
|---|---|
| `engineer` | Código, arquitetura, refatoração, Builder mode na Conjunto. |
| `writer` | Blog, newsletter, drafts. |
| `mentor` | Sustentação, sessões individuais. |
| `strategist` | Carreira, precificação, decisão da Klar, posicionamento da Conjunto. |
| `thinker` | Identidade, sentido, sensemaking existencial. |

## Documento-fonte

Para o detalhe completo da biografia, veja [`docs/biografia.md`](docs/biografia.md).
Todos os YAMLs de identidade derivam dele.

## Como instalar só o Lucas

O Lucas é um personagem de demonstração, então vai morar em um Mirror
home separado (`~/.mirror-demo/`) para não se misturar com seu Mirror
pessoal.

```bash
# Criar o home dele
mkdir -p ~/.mirror-demo/lucas-vidal

# Copiar a identidade
cp -R users/lucas-vidal/identity/ ~/.mirror-demo/lucas-vidal/identity/

# Popular o banco com a identidade
uv run python -m memory seed --mirror-home ~/.mirror-demo/lucas-vidal

# Plantar as memórias
uv run python scripts/seed-memories.py \
  users/lucas-vidal/memories/seed.yaml \
  --mirror-home ~/.mirror-demo/lucas-vidal

# Ingerir os anexos do blog
uv run python scripts/seed-attachments.py \
  --journey blog \
  --dir users/lucas-vidal/attachments \
  --mirror-home ~/.mirror-demo/lucas-vidal

# Validar
DB_PATH=~/.mirror-demo/lucas-vidal/memory.db \
  uv run python -m memory mirror load \
  --query "me fale sobre quem é você"
```

## Decisão central que ele está atravessando

A Klar ofereceu renovação por doze meses com reajuste para R$ 18 mil/mês.
Resposta pedida até 31 de maio de 2026. Aceitar resolve a tensão financeira
e mantém um problema técnico interessante, ao custo de congelar a Conjunto
por mais um ano. Recusar mantém o caminho da Conjunto, amplia pressão
financeira, e estende a fase de incerteza.

Essa é a tensão que o Mirror dele carrega como contexto em praticamente
qualquer pergunta de direção.
