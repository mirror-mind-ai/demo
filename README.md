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
    attachments/                Anexos para ingestão (artigos, documentos).
    memories/                   Memórias plantadas para popular o banco.
```

A pasta `users/<slug>/` mapeia 1:1 com a estrutura de runtime
`~/.mirror/<slug>/`. Para instalar um personagem, basta copiar
`users/<slug>/identity/` para `~/.mirror/<slug>/identity/` e rodar `mirror seed`.

## Como rodar um personagem

Personagens de demonstração vivem em um Mirror home separado
(`~/.mirror-demo/`) para não se misturarem com seu Mirror pessoal
(`~/.mirror/`).

(Detalhes em construção. Procedimento previsto:)

1. Clonar este repositório.
2. Copiar a identidade do repo para o home de demos:

   ```bash
   mkdir -p ~/.mirror-demo/<slug>
   cp -R users/<slug>/identity/ ~/.mirror-demo/<slug>/identity/
   ```

3. Rodar o seed para popular o banco:

   ```bash
   uv run python -m memory seed --mirror-home ~/.mirror-demo/<slug>
   ```

4. Rodar os scripts complementares (memórias, anexos) em `scripts/`,
   apontando para o mesmo home com `--mirror-home`.

5. Validar com:

   ```bash
   DB_PATH=~/.mirror-demo/<slug>/memory.db \
     uv run python -m memory mirror load \
     --query "me fale sobre quem é você"
   ```

## Por que este repo é privado por enquanto

Este repositório vai virar público quando os scripts e a documentação
estiverem maduros o bastante para que qualquer pessoa curiosa possa clonar e
experimentar o Mirror Mind com uma identidade já populada, antes de construir
a própria.
