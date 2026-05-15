# Plan — S3

## Resumo

Estabelecer a noção de "membro ativo" sem implementar auth real.
Cookie guarda o id do membro, middleware garante que sempre há um
membro selecionado, e a troca acontece em um POST simples a partir
da home.

## Alternativas consideradas

- **Auth real (magic link + session).** Caminho final, mas semanas
  de trabalho. Não muda o que o MVP está validando.
- **JWT no cookie.** Mais "profissional" mas adiciona sign/verify,
  segredos rotativos, validação de payload. Para sete membros que se
  conhecem, é ruído.
- **Sem cookie, member ativo via query string** (`?member=3`).
  Tentação minimalista. Recusado porque exige passar o param em
  todas as URLs internas, polui o histórico do browser, e desfaz o
  efeito de "estou logado".

## Decisões

- Cookie `conjunto_member` com o `id` do membro. `httpOnly`,
  `SameSite=Lax`, expiração de 30 dias.
- Middleware `ensureMember` aplicado em todas as rotas. Se o cookie
  estiver vazio ou inválido, escolhe o primeiro membro do banco
  (ordenação alfabética) e seta o cookie automaticamente. Resultado:
  nenhuma página precisa lidar com "sem membro ativo".
- `POST /auth/switch` recebe `member_id` em form-data, valida que é
  número, atualiza o cookie, e faz redirect para a URL referente
  (Referer). Sem Referer, redireciona para `/`.

## Trade-offs aceitos

- Qualquer membro pode encarnar qualquer outro. Decisão deliberada
  para o MVP. Registrada em
  [decisions.md → D3](../../../decisions.md#d3-auth-como-cookie-de-demo).
- Sem expiração de sessão por inatividade. O cookie dura 30 dias
  fixos. Em v0.2.0, expiração curta + refresh entra junto com auth
  real.
