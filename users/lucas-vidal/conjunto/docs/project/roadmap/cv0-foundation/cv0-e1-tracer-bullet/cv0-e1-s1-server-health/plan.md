# Plan — S1

## Resumo

Subir o esqueleto mínimo de servidor que justifica chamar o Conjunto
de produto. A meta é ter um `curl /health` respondendo "ok" antes de
qualquer feature de domínio. Sem esse marco, todas as stories
seguintes são hipotéticas.

## Alternativas consideradas

- **Express.** Familiar para todo mundo no Node, mas sem opinião
  estrutural. Cada projeto inventa a própria organização de rotas,
  middleware e error handling. Para construtor solo, a falta de
  opinião custa caro.
- **Fastify.** Mais opinativo que Express, performático, schema
  validation embutida. Curva de aprendizado um pouco maior. Boa opção
  se o produto fosse uma API JSON, mas para HTML server-rendered o
  ganho não compensa.
- **Hono.** TypeScript-first, opinião explícita, runtime-agnóstico
  (roda em Node, Deno, Bun, Cloudflare Workers). Roteamento e
  middleware estão claros desde o primeiro arquivo. Escolhido.

## Decisões

- Hono sobre `@hono/node-server`. O `@hono/node-server` é a ponte
  para o ambiente Node que vai segurar o produto enquanto não houver
  motivo para migrar para edge runtimes.
- Porta 3030. Não a 3000 (default), para evitar conflito com outros
  projetos rodando localmente na mesma máquina.
- Rota `/` com placeholder mínimo, rota `/health` que devolve `"ok"`.
  A `/health` é a única rota com contrato externo definido neste
  momento (qualquer monitor de uptime pode usar).
- Middleware `logger()` em todas as rotas. Custo desprezível e ajuda
  o desenvolvimento local desde o primeiro request.

## Trade-offs aceitos

Por enquanto, nenhum tratamento de erro estruturado. Hono lança
exceção, o response é 500 plain. Quando a primeira story de domínio
exigir, monto um error handler global.
