#!/usr/bin/env bash
#
# reset-demo.sh — Restaura a demo inteira ao estado pré-ensaio.
#
# Uso:
#   ./scripts/reset-demo.sh                 # reset normal
#   ./scripts/reset-demo.sh --tag <tag>     # reset para outra tag
#   ./scripts/reset-demo.sh --yes           # sem confirmação interativa
#   ./scripts/reset-demo.sh --no-push       # não limpa o remoto
#
# Default: tag 'pre-cv0-e2-s1'. Branch remota: detectada via
# `git symbolic-ref refs/remotes/origin/HEAD`.
#
# O que faz, na ordem:
#   1. Confirma que a tag de reset existe.
#   2. Avisa o operador antes de destruir trabalho.
#   3. `git reset --hard <tag>` — reverte arquivos rastreados, incluindo
#      o código do Conjunto E os YAMLs de identidade do Lucas (estão
#      no mesmo repo).
#   4. `git clean -fd` — remove arquivos novos do Conjunto. Preserva
#      `node_modules/` e `data/` para não recompilar nem repopular o
#      SQLite à toa.
#   5. `npm run seed` — re-popula o SQLite do Conjunto (membros, fios).
#   6. `./install.sh lucas-vidal` — reconstrói o Mirror runtime do
#      Lucas em `~/.mirror-demo/lucas-vidal/`. Reler YAMLs no banco,
#      replantar memórias, reingerir anexos.
#   7. `git push --force-with-lease origin <branch>` — alinha o remoto
#      ao baseline. Usa `--force-with-lease` em vez de `--force` para
#      abortar se alguém empurrou algo entre seu último fetch e agora.
#      Idempotente quando local e remoto já batem. Pule com `--no-push`.
#
# O que NÃO faz:
#   - Não toca em commits acima da tag no local; eles ficam acessíveis
#     via reflog (`git reflog`) para inspeção ou cherry-pick.
#   - Não modifica nenhuma branch além da branch atual.

set -euo pipefail

TAG="pre-cv0-e2-s1"
AUTO_YES=0
DO_PUSH=1
while [[ $# -gt 0 ]]; do
  case "$1" in
    --tag) TAG="$2"; shift 2 ;;
    --yes|-y) AUTO_YES=1; shift ;;
    --no-push) DO_PUSH=0; shift ;;
    -h|--help)
      sed -n '2,40p' "$0"
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
    echo "  ⚠  Push falhou (lease quebrada ou rede). Resólva manualmente." >&2
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
