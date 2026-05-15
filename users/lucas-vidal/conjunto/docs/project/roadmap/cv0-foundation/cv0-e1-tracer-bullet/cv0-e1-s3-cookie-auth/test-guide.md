# Test guide — S3

## Pré-requisitos

- `npm run seed` rodado.
- Server rodando.
- Browser com DevTools acessível (Application > Cookies).

## Caminho feliz

1. Apagar todos os cookies do `localhost:3030` no DevTools.
2. Abrir `http://localhost:3030/`.
3. Confirmar que aparece um dropdown no topo: "Você está vendo o
   Conjunto como [primeiro membro alfabeticamente]".
4. Em Application > Cookies, confirmar que o cookie
   `conjunto_member` foi setado com o id correspondente.
5. Trocar para outro membro no dropdown.
6. Página recarrega, dropdown agora mostra o novo membro selecionado.
7. Cookie reflete o id novo.
8. Navegar para `/members`, depois para `/threads`, depois para
   `/docs`. Em todas, o dropdown mostra o membro escolhido.

## Casos a verificar

- Setar manualmente o cookie com um id inexistente (999) e
  recarregar. O middleware deve detectar, escolher o primeiro membro
  do banco e setar o cookie correto.
- Setar manualmente o cookie com valor não-numérico (`xyz`) e
  recarregar. Mesmo comportamento (fallback para primeiro membro).
- Trocar de membro durante a leitura de um fio. Voltar para a home
  deve mostrar a página normalmente com o novo membro ativo.
