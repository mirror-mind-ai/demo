# Test guide — S2

## Pré-requisitos

- `npm run seed` rodado pelo menos uma vez (sem isso, a tabela
  `members` fica vazia).
- Server rodando em `npm run dev`.

## Caminho feliz

1. Abrir `http://localhost:3030/members`.
2. Confirmar que aparecem **8 membros** (Lucas Vidal mais os sete do
   Sustentação: André, Beatriz, Caio, Diana, Eduardo, Felipe,
   Gabriela).
3. A ordem deve ser alfabética por primeiro nome.
4. Cada membro deve mostrar nome, papel e empresa em formato compacto.
5. Clicar em qualquer nome leva ao perfil individual.
6. Perfil individual deve mostrar:
   - Nome em destaque (h1).
   - Papel e empresa abaixo.
   - Biografia (texto curto).
   - Data de entrada no Conjunto formatada em pt-BR.

## Casos a verificar

- Acessar `/members/9999` (id inexistente) deve retornar status 404
  com mensagem amigável.
- Acessar `/members/abc` (id não-numérico) deve também retornar 404,
  não erro 500.
- Trocar o membro ativo via dropdown na home não deve alterar o que
  aparece em `/members` (a lista é a mesma para todos).
