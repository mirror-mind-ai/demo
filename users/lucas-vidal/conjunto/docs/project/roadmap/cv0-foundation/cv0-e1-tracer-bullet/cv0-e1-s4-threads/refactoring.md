# Refactoring — S4

## Applied

Nada aplicado. O código de fios ficou pequeno e cada função tem
responsabilidade clara.

## Evaluated, not done

**`formatDate` em três versões diferentes** — `routes/members.ts`
formata só a data, `routes/threads.ts` formata data + hora. Versões
distintas hoje, mas o domínio de "formatar data para o membro" é
um só. Critério para extrair: quando `formatDate` aparecer pela
terceira vez no código.

**Helper `card`** para o markup repetido (div com h3 + meta + body).
Hoje tem em duas rotas. Mesmo critério: rule of three.

**Modelo de dados para `messages`** — `author_id` apontando para
`members(id)` significa que excluir um membro derruba o histórico
das mensagens dele. Aceitável no MVP mas dolorido se acontecer:
fios ficam com pedaços faltando. Em v0.2.0, considerar um padrão
de soft delete ou um "membro deletado" placeholder. Não vale tocar
agora.
