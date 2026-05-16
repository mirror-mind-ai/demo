#!/usr/bin/env bash
#
# reset-demo.sh — Restaura a demo inteira ao estado pré-ensaio.
#
# Uso:
#   ./scripts/reset-demo.sh                      # reset normal
#   ./scripts/reset-demo.sh --tag <tag>          # reset para outra tag
#   ./scripts/reset-demo.sh --yes                # sem confirmação
#   ./scripts/reset-demo.sh --no-push            # não limpa o remoto
#   ./scripts/reset-demo.sh --rebuild-baseline   # move a tag para o
#                                                  último commit limpo
#                                                  antes de resetar
#
# Default: tag 'pre-cv0-e2-s1'. Branch remota: a branch atual.
#
# O que faz, na ordem:
#   1. Confirma que a tag de reset existe.
#   2. SENTINELA: olha a tree da tag (via ls-tree, sem mexer no working
#      tree) e aborta se ela contém o artefato de uma story já entregue.
#      Se a sentinela disparar, sugere `--rebuild-baseline`.
#   3. Avisa o operador antes de destruir trabalho.
#   4. `git reset --hard <tag>` — reverte arquivos rastreados.
#   5. `git clean -fd` — remove arquivos novos do Conjunto. Preserva
#      `node_modules/` e `data/`.
#   6. `npm run seed` — re-popula o SQLite do Conjunto.
#   7. `./install.sh lucas-vidal` — reconstrói o Mirror runtime.
#   8. `git push --force-with-lease origin <branch>` — alinha o remoto.
#      Pule com `--no-push`.
#
# --rebuild-baseline:
#   Caminha pelo `git log` da branch atual procurando o commit mais
#   recente em que o fingerprint da S1 (`docs/releases/v0.2.1.md`) ainda
#   não existia. Move a tag para lá (com `--force`) e dá push do tag
#   novo. Em seguida executa o reset normal. Use quando a sentinela
#   abortar dizendo que a tag aponta para um estado pós-S1.
#
# A sentinela usa `git ls-tree` em vez do working tree porque o
# `git reset --hard` substituiria o próprio script se a tag fosse
# anterior à introdução da sentinela.
#
# O que NÃO faz:
#   - Não toca em commits acima da tag no local; eles ficam no reflog.
#   - Não modifica nenhuma branch além da branch atual.

set -euo pipefail

TAG="pre-cv0-e2-s1"
AUTO_YES=0
DO_PUSH=1
REBUILD=0
# Caminho relativo ao REPO_ROOT que serve como impressão digital de
# "S1 implementada". Ajuste quando o baseline avançar (ex: próxima
# story é S2, o detector vira docs/releases/v0.2.2.md).
FINGERPRINT="users/lucas-vidal/conjunto/docs/releases/v0.2.1.md"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --tag) TAG="$2"; shift 2 ;;
    --yes|-y) AUTO_YES=1; shift ;;
    --no-push) DO_PUSH=0; shift ;;
    --rebuild-baseline) REBUILD=1; shift ;;
    -h|--help)
      sed -n '2,46p' "$0"
      exit 0 ;;
    *) echo "Argumento desconhecido: $1" >&2; exit 1 ;;
  esac
done

CONJUNTO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$CONJUNTO_ROOT" && git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

if ! git rev-parse --verify --quiet "$TAG" >/dev/null; then
  echo "✗ Tag '$TAG' não encontrada. Crie com:" >&2
  echo "    git tag $TAG <commit>" >&2
  exit 1
fi

# --rebuild-baseline: caminha pelo git log e move a tag para o último
# commit em que o fingerprint da S1 ainda não existia.
if [[ $REBUILD -eq 1 ]]; then
  echo "→ Procurando o commit mais recente sem '$FINGERPRINT'..."
  CLEAN_SHA=""
  for sha in $(git rev-list HEAD); do
    if ! git cat-file -e "$sha:$FINGERPRINT" 2>/dev/null; then
      CLEAN_SHA="$sha"
      break
    fi
  done
  if [[ -z "$CLEAN_SHA" ]]; then
    echo "✗ Nenhum commit limpo encontrado em HEAD." >&2
    echo "  O reflog pode ter o estado certo: 'git reflog | head -20'." >&2
    exit 1
  fi
  SHORT_CLEAN="$(git rev-parse --short "$CLEAN_SHA")"
  SUBJ="$(git log -1 --pretty=format:'%s' "$CLEAN_SHA")"
  echo "  Encontrado: $SHORT_CLEAN  \"$SUBJ\""
  echo "→ Movendo tag '$TAG' para $SHORT_CLEAN"
  git tag -f "$TAG" "$CLEAN_SHA" >/dev/null
  if [[ $DO_PUSH -eq 1 ]]; then
    echo "→ git push --force origin $TAG (alinha tag no remoto)"
    git push --force origin "$TAG" 2>&1 | tail -1 || true
  fi
  echo ""
fi

# Sentinela: aborta ANTES do reset se a tag aponta para estado pós-S1.
# Olha a tree do commit via ls-tree para não depender do working tree
# atual (que será destruído pelo reset).
if git ls-tree -r "$TAG" --name-only | grep -qx "$FINGERPRINT"; then
  echo ""
  echo "⚠  ALERTA: a tag '$TAG' aponta para um estado pós-S1."
  echo "   A tree do commit contém '$FINGERPRINT', o que faria o Mirror"
  echo "   abrir como se a story já estivesse pronta."
  echo ""
  echo "   Reset cancelado para não destruir o working tree."
  echo ""
  echo "   Para reconstruir o baseline automaticamente, rode:"
  echo "     $0 --rebuild-baseline --yes"
  echo ""
  exit 2
fi

TARGET_SHA="$(git rev-parse --short "$TAG")"
CURRENT_SHA="$(git rev-parse --short HEAD)"

echo "Reset da demo (código do Conjunto + identidade do Lucas + runtime)"
echo "  Estado atual:  $CURRENT_SHA"
echo "  Alvo do reset: $TAG ($TARGET_SHA)"
echo "  Repo root:     $REPO_ROOT"
echo ""

if [[ $AUTO_YES -ne 1 ]]; then
  read -rp "Prosseguir? Isto descarta mudanças locais e arquivos novos. [y/N] " ans
  case "$ans" in
    y|Y|yes|YES) ;;
    *) echo "Cancelado."; exit 0 ;;
  esac
fi

echo ""
echo "→ git reset --hard $TAG"
git reset --hard "$TAG"

echo "→ git clean -fd em users/lucas-vidal/conjunto/ (preservando node_modules e data)"
( cd "$CONJUNTO_ROOT" && git clean -fd -e node_modules -e data )

echo "→ npm run seed (SQLite do Conjunto)"
( cd "$CONJUNTO_ROOT" && npm run seed )

echo "→ ./install.sh lucas-vidal (rebuild do Mirror runtime)"
./install.sh lucas-vidal

if [[ $DO_PUSH -eq 1 ]]; then
  BRANCH="$(git symbolic-ref --short HEAD)"
  echo "→ git push --force-with-lease origin $BRANCH (alinha o remoto)"
  if git push --force-with-lease origin "$BRANCH"; then
    echo "  Remote alinhado."
  else
    echo "  ⚠  Push falhou (lease quebrada ou rede). Resolva manualmente." >&2
  fi
else
  echo "→ push pulado (--no-push). Remote pode estar à frente do baseline."
fi

echo ""
echo "✓ Demo restaurada ao estado $TAG ($TARGET_SHA)."
echo "  Código pré-S1, identidade do Lucas com coerência D8 + método de trabalho."
echo "  Mirror runtime rebuildado em ~/.mirror-demo/lucas-vidal/."
echo ""
echo "  Commits feitos durante ensaios continuam no reflog local:"
echo "    git reflog | head -20"
