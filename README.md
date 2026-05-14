# Mirror Mind Demo

Galeria de personagens fictícios para demonstrar o Mirror Mind. Cada
personagem é um Mirror inteiro: identidade densa, Travessias ativas,
memórias plantadas, anexos. Você clona, roda dois comandos, e tem uma
instalação funcional para explorar.

## Personagens disponíveis

| Personagem | Idioma base | Perfil |
|---|---|---|
| [`lucas-vidal`](users/lucas-vidal/) | pt-BR | Consultor independente em engenharia de software e liderança técnica, em transição da corporação para um modelo próprio de oferta. |

Novos personagens podem ser adicionados em outros idiomas e perfis sob
`users/<slug>/`.

---

## Pré-requisitos

Você precisa de três coisas instaladas antes de começar:

- **`uv`**, gerenciador de pacotes Python.
- **`git`**, já presente na maior parte dos sistemas.
- **Uma chave da API do OpenRouter** (`sk-or-v1-...`).

Detalhes de instalação, verificação, custo estimado e como criar a chave
estão em [`docs/prerequisites.md`](docs/prerequisites.md). Se você já
está confortável com `uv` e tem uma chave OpenRouter à mão, pode pular
essa leitura e seguir direto.

## Instalação

Da raiz do diretório onde você gosta de manter seus projetos:

```bash
# 1. Clonar o repositório
git clone https://github.com/mirror-mind-ai/demo.git mirror-demo
cd mirror-demo

# 2. Instalar as dependências (baixa o framework Mirror Mind)
uv sync

# 3. Configurar a chave da API
echo 'OPENROUTER_API_KEY=sk-or-v1-sua-chave-real-aqui' > .env

# 4. Instalar um personagem
./install.sh lucas-vidal

# 5. Validar
./talk.sh lucas-vidal "me fale sobre quem é você"
```

Se o passo 5 retornar o Mirror Mode ativo e a identidade do personagem
carregada, está pronto.

---

## Comandos

### `./install.sh <slug>`

Instala (ou reinstala) um personagem. Cria o home runtime em
`~/.mirror-demo/<slug>/`, copia a identidade do repositório, popula o
banco de dados, planta as memórias e ingere os anexos.

```bash
./install.sh <slug>                    # padrão: apaga o home e reconstrói
./install.sh <slug> --keep             # mantém o home existente, só adiciona o que faltar
./install.sh <slug> --home <path>      # usa outro diretório como home runtime
```

O install é idempotente. Por padrão, apaga o home anterior antes de
recomeçar, então você pode rodar quantas vezes quiser sem acumular
sujeira. Use `--keep` se quiser preservar dados que foram acumulados
durante o uso (conversas, memórias geradas em runtime, etc).

Antes de qualquer trabalho pesado, o install verifica se a chave da API
do OpenRouter está válida. Se não estiver, falha em meio segundo com
mensagem clara.

### `./talk.sh <slug> "<query>"`

Envia uma pergunta única para o Mirror de um personagem, sem abrir
sessão interativa. Útil para validar a instalação ou testar como o
personagem responde a uma pergunta específica.

```bash
./talk.sh lucas-vidal "me fale sobre quem é você"
./talk.sh lucas-vidal "quais são minhas Travessias?"
```

### Sessão interativa via Pi

Para conversas longas ou demonstrações ao vivo, abra o
[Pi](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent)
configurado para o personagem. A forma mais simples é criar um wrapper
na sua máquina:

```bash
#!/usr/bin/env bash
# ~/mirror-demo.sh — abre o Pi como um personagem do demo
cd /caminho/para/mirror-demo
export MIRROR_HOME="$HOME/.mirror-demo/$1"
unset MIRROR_USER
shift
exec pi "$@"
```

Aí basta:

```bash
~/mirror-demo.sh lucas-vidal
```

---

## Estrutura do repositório

```text
README.md                       Este arquivo.
install.sh                      Ponto de entrada para instalar um personagem.
talk.sh                         Ponto de entrada para fazer uma pergunta.
pyproject.toml                  Declara o framework Mirror Mind como dependência.
docs/
  prerequisites.md              O que ter instalado antes de começar.
scripts/
  install.py                    Lógica completa do install.
users/
  <slug>/                       Uma instalação completa por personagem.
    README.md                   Quem é o personagem, como instalar.
    docs/biografia.md           Documento-fonte que origina toda a identidade.
    identity/                   Estrutura espelhada de ~/.mirror/<slug>/identity/.
      self/                     Soul e config.
      ego/                      Behavior, identity, constraints.
      user/                     Perfil biográfico.
      personas/                 Lentes ativadas por roteamento.
      journeys/                 Travessias ativas.
    attachments/                Anexos para ingestão, organizados por journey.
      <journey-id>/             Subpasta cujo nome é o ID da journey de destino.
        *.md                    Cada arquivo vira um attachment buscável.
    memories/                   Memórias plantadas para popular o banco.
      seed.yaml                 Arquivo único com a lista de memórias.
```

A pasta `users/<slug>/` mapeia 1:1 com a estrutura de runtime
`~/.mirror-demo/<slug>/`. O `install.sh` faz essa cópia e os passos
adicionais de seed.

---

## Adicionar um novo personagem

1. Criar `users/<seu-slug>/` com a mesma estrutura interna usada pelo `lucas-vidal`.
2. Editar os YAMLs de `identity/` (self, ego, user, personas, journeys).
3. Opcionalmente, popular `memories/seed.yaml` e `attachments/<journey>/*.md`.
4. Rodar `./install.sh <seu-slug>`.
5. Validar com `./talk.sh <seu-slug> "uma pergunta"`.

O personagem aparecerá automaticamente quando `./install.sh` for executado sem argumentos.

---

## Por que este repositório é privado por enquanto

Vai virar público quando os scripts e a documentação estiverem maduros
o bastante para que qualquer pessoa curiosa possa clonar e experimentar
o Mirror Mind com uma identidade já populada, antes de construir a
própria.
