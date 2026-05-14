# Mirror Mind Demo

Galeria de personagens fictícios para demonstrar o Mirror Mind sem expor dados
pessoais reais. Cada personagem é um Mirror inteiro: identidade densa,
Travessias ativas, memórias plantadas, anexos. Você clona, copia para
`~/.mirror/<personagem>/`, roda o seed e tem uma instalação funcional para
explorar.

## Personagens disponíveis

| Personagem | Idioma base | Perfil |
|---|---|---|
| [`lucas-vidal`](users/lucas-vidal/) | pt-BR | Consultor independente em engenharia de software e liderança técnica, em transição da corporação para um modelo próprio de oferta. Construído para a demo do encontro Mirror Mind com Vinicius Teles em 17/05/2026. |

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

(Detalhes em construção. Procedimento previsto:)

1. Clonar este repositório.
2. Inicializar o Mirror home do personagem escolhido:

   ```bash
   mirror init <slug>
   ```

3. Copiar a identidade do repo para o home:

   ```bash
   cp -R users/<slug>/identity/ ~/.mirror/<slug>/identity/
   ```

4. Rodar o seed para popular o banco:

   ```bash
   MIRROR_USER=<slug> uv run python -m memory seed
   ```

5. Rodar os scripts complementares (memórias, anexos) que vivem em
   `scripts/`.

6. Validar com:

   ```bash
   MIRROR_USER=<slug> uv run python -m memory mirror load \
     --query "me fale sobre quem é você"
   ```

## Por que este repo é privado por enquanto

Este repositório nasceu para suportar a demo do encontro de 17 de maio de
2026. Vai virar público depois do encontro, quando os scripts e a documentação
estiverem maduros o bastante para que qualquer pessoa curiosa possa clonar e
experimentar o Mirror Mind com uma identidade já populada, antes de construir
a própria.
