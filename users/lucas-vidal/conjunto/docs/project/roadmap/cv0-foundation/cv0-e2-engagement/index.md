# CV0.E2 — Engajamento

**Status:** 🔵 em curso
**Versão prevista do fechamento do epic:** `v0.3.0` (MINOR bump
quando S1+S2+S3 estiverem prontas). Stories podem sair isoladas
como PATCH no caminho: `v0.2.1` (S1), `v0.2.2` (S2) etc., conforme
[`versioning.md`](../../../process/versioning.md) e
[`decisions.md` → D8](../../decisions.md#d8--v020-reconhecida-como-anomalia-de-versionamento).

## Objetivo

Os membros começam a ter pistas de quem está ativo, quem leu o quê, e
como o grupo respira. Sem virar feed.

A tensão central deste epic é entre "dar sinais de vida" e "não criar
um mecanismo que vicia". O modo como cada feature é desenhada importa
mais que a feature em si.

## Critério de pronto

Ao abrir o perfil de um outro membro, vejo quando ele esteve online
por último. Ao abrir um fio, vejo quem leu a minha última mensagem.
Na lista de membros, vejo quem está ativo agora versus quem sumiu
faz tempo.

## Stories

| Código | Story | Status |
|--------|-------|--------|
| [S1](cv0-e2-s1-last-seen/) | Indicador de última vez online | ✅ `v0.2.1` |
| [S2](cv0-e2-s2-read-indicator/) | Indicador de leitura por mensagem | ⚪ planejada |
| [S3](cv0-e2-s3-active-members/) | Lista de membros ordenada por atividade | ⚪ planejada |

## Ordem das stories

S1 vai primeiro por ser a mais barata e a que viabiliza a leitura das
outras duas (precisamos do `last_seen_at` em members para S3).

S2 depende de um modelo de leitura por mensagem que ainda não existe.

S3 depende da informação de S1.
