# Refactoring — S3

## Applied

Nada. O `lib/auth.ts` ficou em ~50 linhas, com duas funções
exportadas e um middleware. Sem duplicação, sem nomes ambíguos.

## Evaluated, not done

**Renomear `setCurrentMember`/`getCurrentMember`** para nomes que
reflitam que é uma operação sobre cookie (`setMemberCookie`, etc.).
Faz sentido renomear quando o
[CV2 — Abertura externa](../../../../../project/roadmap/index.md#cv2--abertura-externa)
introduzir o segundo modo de auth (magic link), porque aí vai haver
mais de uma forma de saber
"quem é o membro ativo" e a função de cookie precisará se distinguir.
Hoje é prematuro.

**Mover o `Context.set("currentMember", ...)`** para um tipo
estruturado de variáveis do Hono em vez de passar pela API genérica
de `c.set`. Hono suporta `Variables` tipados via generics. Adia até
ter mais de um valor no contexto que valha tipar.
