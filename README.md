# Mirror Mind Demo — Lucas Vidal

Instalação de demonstração do Mirror Mind, construída em torno de um personagem
fictício, **Lucas Vidal**, consultor independente em engenharia de software e
liderança técnica em transição da corporação para um modelo próprio de oferta.

Este repositório existe para servir como banco de identidade, memórias e
material de referência para a demo do Mirror Mind feita ao vivo. Nada aqui é
informação pessoal real.

## Estrutura

```text
docs/
  biografia.md          Documento-fonte que gera toda a identidade do Lucas.

identity/
  self/                 Identidade profunda (soul, config).
  ego/                  Identidade operacional (behavior, identity, constraints).
  user/                 Perfil biográfico (identity).
  personas/             Lentes ativadas por roteamento (engineer, writer,
                        mentor, strategist, thinker).
  journeys/             Travessias ativas (conjunto, klar, sustentacao,
                        blog, pos-corporativo, vida-familiar).

attachments/            Anexos para ingestão (artigos do blog do Lucas).
memories/               Memórias plantadas para popular o banco.
scripts/                Scripts de seed e validação.
```

## Como rodar

(Em construção.)

Passos previstos:

1. Inicializar o Mirror home do Lucas: `mirror init lucas-vidal`.
2. Copiar `identity/` para `~/.mirror/lucas-vidal/identity/`.
3. Rodar `mirror seed` para popular o banco com a identidade.
4. Rodar o script de plantação de memórias.
5. Ingerir os anexos do blog.
6. Validar com `mirror load --query "..."` em algumas perguntas-piloto.

## Por que existe

Este repo nasceu da preparação do encontro Mirror Mind com Vinicius Teles em
17 de maio de 2026. A demo ao vivo do encontro precisa rodar sobre uma
instalação convincente sem expor dados pessoais reais. Lucas Vidal é o
personagem-veículo dessa demo.

Depois do encontro, este repositório pode ser aberto publicamente para que
qualquer pessoa curiosa possa clonar, rodar localmente, e experimentar o
Mirror Mind com uma identidade já populada, antes de construir a própria.
