#!/usr/bin/env bash
#
# reset-demo.sh — Restaura o Conjunto ao estado pré-ensaio.
#
# Uso:
#   ./scripts/reset-demo.sh                 # reset normal
#   ./scripts/reset-demo.sh --tag <tag>     # reset para outra tag
#
# Default: tag 'pre-cv0-e2-s1'.
#
# O que faz:
#   1. Confirma que a tag de reset existe.
#   2. Avisa o operador antes de destruir trabalho.
#   3. `git reset --hard <tag>` — reverte arquivos rastreados.
#   4. `git clean -fd` — remove arquivos novos e diretórios novos.
#      Exclui node_modules/ e data/ para não recompilar/restaurar
#      desnecessariamente.
#   5. `npm run seed` — reset do banco SQLite.
#
# O que NÃO faz:
#   - Não toca em commits acima da tag — os commits feitos durante o
#     ensaio ficam acessíveis via reflog (`git reflog`). Para apagá-los
#     de vez, use `git branch -D` no branch que os carrega.
#   - Não modifica nenhuma branch além de HEAD.

set -euo pipefail

TAG="pre-cv0-e2-s1"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --tag) TAG="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,30p' "$0"
      exit 0 ;;
    *) echo "Argumento desconhecido: $1" >&2; exit 1 ;;
  esac
done

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

if ! git rev-parse --verify --quiet "$TAG" >/dev/null; then
  echo "✗ Tag '$TAG' não encontrada. Crie com:" >&2
  echo "    git tag $TAG <commit>" >&2
  exit 1
fi

TARGET_SHA="$(git rev-parse --short "$TAG")"
CURRENT_SHA="$(git rev-parse --short HEAD)"

echo "Reset do Conjunto"
echo "  Estado atual:  $CURRENT_SHA"
echo "  Alvo do reset: $TAG ($TARGET_SHA)"
echo ""

# Confirma antes de destruir
read -rp "Prosseguir? Isto descarta mudanças locais e arquivos novos. [y/N] " ans
case "$ans" in
  y|Y|yes|YES) ;;
  *) echo "Cancelado."; exit 0 ;;
esac

echo ""
echo "→ git reset --hard $TAG"
git reset --hard "$TAG"

echo "→ git clean -fd (preservando node_modules/ e data/)"
git clean -fd -e node_modules -e data

echo "→ npm run seed"
npm run seed

echo ""
echo "✓ Demo restaurada ao estado $TAG ($TARGET_SHA)."
echo "  Commits feitos durante o ensaio continuam no reflog:"
echo "    git reflog | head -20"
