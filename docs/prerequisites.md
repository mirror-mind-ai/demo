# Pré-requisitos

Esta página detalha o que você precisa ter instalado antes de rodar
qualquer comando deste repositório, e como verificar se cada coisa está
funcionando.

Se algum item falhar, resolva ele antes de avançar. Os scripts assumem
que tudo aqui está em ordem.

---

## 1. `uv`

`uv` é o gerenciador de pacotes Python que o Mirror Mind usa para isolar
dependências e gerenciar ambientes virtuais. Substitui `pip`, `pipenv`,
`poetry`, `virtualenv` e parte do `pyenv`.

### Verificar se já tem

```bash
which uv
```

Se aparecer um path (por exemplo, `/usr/local/bin/uv` ou
`/Users/seu-nome/.cargo/bin/uv`), pule para o próximo item.

Se aparecer "uv not found" ou similar, instale.

### Instalar

Em macOS e Linux:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Em Windows (PowerShell):

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Depois, abra um terminal novo e rode `which uv` para confirmar.

### Versão mínima

Qualquer versão recente (0.4+) funciona. Para verificar:

```bash
uv --version
```

---

## 2. `git`

Quase todo sistema operacional moderno já tem `git` instalado. Se você
está acostumado a clonar repositórios, está coberto.

### Verificar

```bash
git --version
```

Se aparecer algo como `git version 2.40.1`, está ok.

### Instalar

Em macOS, vem com o Xcode Command Line Tools:

```bash
xcode-select --install
```

Em Linux (Debian/Ubuntu):

```bash
sudo apt install git
```

Em Windows, instale via [git-scm.com](https://git-scm.com/download/win).

---

## 3. Chave da API do OpenRouter

O Mirror Mind usa o OpenRouter como roteador único para todas as
chamadas a modelos de linguagem (embeddings, extração de memórias,
roteamento de personas, e chamadas LLM auxiliares). Você precisa de uma
chave válida com algum saldo.

### Por que OpenRouter e não OpenAI ou Anthropic direto

OpenRouter é um proxy que dá acesso unificado a vários provedores
(OpenAI, Anthropic, Google, Mistral, etc.) com uma única chave. O
framework foi projetado em torno dessa flexibilidade. Você paga uma
conta só, e pode escolher modelos diferentes para tarefas diferentes
sem trocar de chave.

### Criar uma chave

1. Acesse [openrouter.ai](https://openrouter.ai/) e crie uma conta.
2. Adicione crédito (US$ 5 já cobre centenas de instalações e
   conversas de teste).
3. Vá em [openrouter.ai/keys](https://openrouter.ai/keys) e gere uma
   chave nova. Vai parecer `sk-or-v1-` seguido de uma string longa.
4. Guarde a chave em algum lugar seguro. O OpenRouter mostra ela uma
   única vez.

### Custo aproximado

- **Instalar um personagem do zero:** menos de US$ 0,01 (gera ~50 embeddings).
- **Uma conversa de teste no Pi:** entre US$ 0,01 e US$ 0,10 dependendo do modelo escolhido.
- **Uma sessão demo completa (45 minutos):** raramente passa de US$ 0,50.

US$ 5 cobre dezenas de demos completas com folga.

### Configurar no projeto

Depois de clonar o repositório, crie um arquivo `.env` na raiz:

```bash
echo 'OPENROUTER_API_KEY=sk-or-v1-sua-chave-aqui' > .env
```

Substitua `sk-or-v1-sua-chave-aqui` pela sua chave real. O `.env` é
ignorado pelo `git` (está em `.gitignore`), então não tem risco de
commitar por acidente.

### Validar a chave

Depois de rodar `uv sync` (passo 2 da instalação), você pode validar a
chave sem instalar nenhum personagem:

```bash
uv run python -m memory consult credits
```

Se aparecer o saldo atual (algo como `Balance: openrouter: ▓░░░ R$ 25.30`),
a chave está funcionando. Se aparecer erro `401 Unauthorized` ou similar,
a chave está errada ou inválida.

O próprio `install.sh` faz essa verificação automaticamente antes de
qualquer trabalho pesado, então se você esquecer de configurar, ele
avisa cedo com mensagem clara.

---

## 4. Pi (opcional)

[Pi](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent)
é o coding agent recomendado para sessões interativas com o Mirror Mind.
Você só precisa dele se quiser conversar com os personagens em formato
de chat, em vez de fazer perguntas pontuais via `./talk.sh`.

### Instalar

```bash
npm install -g @badlogic/pi
```

(Requer Node.js 18+.)

### Verificar

```bash
pi --version
```

Se você não vai abrir sessões interativas, pode pular essa parte.

---

## Tudo pronto?

Quando os três primeiros itens estiverem ok (e opcionalmente o quarto),
volte para o [README principal](../README.md) e siga a seção
"Instalação".
