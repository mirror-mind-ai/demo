# Test guide — S4

## Pré-requisitos

- `npm run seed` rodado (planta 5 fios com pelo menos uma mensagem
  cada).
- Server rodando.

## Caminho feliz

1. Abrir `http://localhost:3030/threads`.
2. Confirmar que aparecem **5 fios** ordenados por data decrescente
   (mais recente primeiro).
3. Cada card de fio mostra: título (link), nome do membro que
   iniciou, número de mensagens.
4. Clicar em qualquer fio leva à página do fio.
5. Na página do fio, confirmar:
   - Título em destaque (h1).
   - Cada mensagem em um card com nome do autor em negrito e data
     formatada em pt-BR.
   - Mensagens em ordem cronológica (mais antiga primeiro).
   - Quebras de linha do `body` preservadas no render.

## Casos a verificar

- Acessar `/threads/999` (id inexistente) deve retornar 404.
- Acessar `/threads/abc` (id não-numérico) também 404.
- Da home, o card de cada fio recente deve linkar corretamente para
  `/threads/:id`.
- Em um fio com 3 mensagens, navegar para outro fio e voltar
  preserva a ordem das mensagens (estado vem do banco, não de
  cache).
