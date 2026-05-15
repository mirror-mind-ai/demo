# Test guide — S1

## Pré-requisitos

- Node 22 ou superior.
- `npm install` rodado na raiz do projeto.

## Caminho feliz

1. `npm run dev` na raiz do projeto.
2. Console deve mostrar: `Conjunto rodando em http://localhost:3030`.
3. Em outro terminal: `curl http://localhost:3030/health`.
4. Resposta esperada: `ok` em texto plano, status 200.
5. No navegador, abrir `http://localhost:3030/health` deve mostrar
   apenas `ok` na tela.

## Casos a verificar

- Se a porta 3030 já estiver ocupada, o processo deve abortar com
  mensagem clara, não silenciar e morrer.
- Acessar uma rota inexistente (`/qualquer-coisa`) deve retornar 404,
  não 500.
