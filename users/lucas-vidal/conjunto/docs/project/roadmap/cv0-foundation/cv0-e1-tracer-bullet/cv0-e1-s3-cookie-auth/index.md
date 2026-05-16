# CV0.E1.S3 — Auth simulada por cookie

**Status:** ✅ completo
**Versão:** v0.1.0
**Epic:** [CV0.E1 — Tracer Bullet](../)

**Documentação técnica:** [Plan](plan.md) · [Test guide](test-guide.md) · [Refactoring](refactoring.md)

> **Como membro do Conjunto, eu quero que o produto saiba qual é minha
> identidade ativa a cada navegação, para ver o Conjunto sob a minha
> perspectiva sem precisar fazer login a cada visita.**

## Problema

O produto precisa saber quem é o membro ativo a cada request, sem
isso não há perfil próprio, não há percepção de "estou em casa", não
há diferenciação entre membros. Mas auth real (magic link, sessão,
expiração) é trabalho de dias e não muda nada do que o MVP está
validando.

## Solução

Cookie `conjunto_member` guarda o id do membro ativo. Middleware
`ensureMember` garante que sempre há um membro selecionado (cai no
primeiro do banco se o cookie vier vazio). Troca aberta de membro
via dropdown na home, `POST /auth/switch` atualiza o cookie e
redireciona de volta.

Decisão registrada em [D3](../../../decisions.md#d3-auth-como-cookie-de-demo).

## Notas

Qualquer membro pode encarnar qualquer outro. Aceitável em
comunidade fechada de sete pessoas que se conhecem fora do produto;
intolerável quando abrir externamente. Magic link via email entra no
[CV2 — Abertura externa](../../../../../project/roadmap/index.md#cv2--abertura-externa).
