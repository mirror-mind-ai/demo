# Mirror Mind Demo

Galeria de personagens fictícios para demonstrar o Mirror Mind. Cada personagem é um Mirror inteiro: identidade densa,
Travessias ativas, memórias plantadas, anexos. Você clona, copia para
`~/.mirror/<personagem>/`, roda o seed e tem uma instalação funcional para
explorar.

## Personagens disponíveis

| Personagem | Idioma base | Perfil |
|---|---|---|
| [`lucas-vidal`](users/lucas-vidal/) | pt-BR | Consultor independente em engenharia de software e liderança técnica, em transição da corporação para um modelo próprio de oferta. |

Novos personagens podem ser adicionados em outros idiomas e perfis sob
`users/<slug>/`.

## Estrutura do repositório

```text
README.md                       Este arquivo. Galeria, instruções gerais.
scripts/                        Scripts compartilhados (install, seed, valida).
users/
  <slug>/                       Uma instalação completa por personagem.
    README.md                   Quem é, como instalar só esse personagem.
    docs/biografia.md           Documento-fonte que gera toda a identidade.
    identity/                   Estrutura espelhada de ~/.mirror/<slug>/identity/.
      self/                     Soul, config.
      ego/                      Behavior, identity, constraints.
      user/                     Perfil biográfico.
      personas/                 Lentes ativadas por roteamento.
      journeys/                 Travessias ativas.
    attachments/                Anexos para ingestão, organizados por journey.
      <journey-id>/             Subpasta = journey de destino dos anexos.
        *.md                    Cada arquivo vira um attachment.
    memories/                   Memórias plantadas para popular o banco.
```

A pasta `users/<slug>/` mapeia 1:1 com a estrutura de runtime
`~/.mirror/<slug>/`. Para instalar um personagem, basta copiar
`users/<slug>/identity/` para `~/.mirror/<slug>/identity/` e rodar `mirror seed`.

## Como rodar um personagem

Personagens de demonstração vivem em um Mirror home separado
(`~/.mirror-demo/`) para não se misturarem com seu Mirror pessoal
(`~/.mirror/`).

Este repositório é um workspace Python autônomo: traz o framework Mirror
Mind como dependência via `pyproject.toml`. Você não precisa de outro
clone do framework.

1. Clonar este repositório em qualquer lugar da sua máquina.
2. Configurar (a partir da raiz do repositório clonado):

   ```bash
   uv sync                              # instala o framework como dependência
   cp .env.example .env                 # se houver; senão crie
   # Edite .env e ponha OPENROUTER_API_KEY=...
   ```

3. Instalar um personagem:

   ```bash
   ./scripts/install.sh <slug>
   ```

   O script apaga o home existente em `~/.mirror-demo/<slug>` e
   reconstrói tudo do zero: identidade, memórias, anexos. Passe
   `--keep` se quiser preservar dados acumulados.

4. Validar:

   ```bash
   ./scripts/talk.sh <slug> "me fale sobre quem é você"
   ```

5. Para uma experiência interativa via Pi, escreva um script wrapper
   na sua máquina (ex: `mirror-demo.sh <slug>`) que faz `cd` para este
   repositório, exporta `MIRROR_HOME=~/.mirror-demo/<slug>`, e executa
   `pi`.

## Por que este repo é privado por enquanto

Este repositório vai virar público quando os scripts e a documentação
estiverem maduros o bastante para que qualquer pessoa curiosa possa clonar e
experimentar o Mirror Mind com uma identidade já populada, antes de construir
a própria.
