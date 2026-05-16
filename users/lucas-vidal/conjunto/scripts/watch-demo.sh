#!/usr/bin/env bash
#
# watch-demo.sh — quarto quadrante da demo: auditoria viva do git.
#
# Mostra em tempo real:
#   - Último commit (HEAD)
#   - Arquivos modificados / novos (git status -s)
#   - Estatística de diff (linhas adicionadas / removidas por arquivo)
#
# Recarrega a cada 1.5s. Sai com Ctrl+C.
#
# Uso:
#   ./scripts/watch-demo.sh                 # padrão, refresh 1.5s
#   ./scripts/watch-demo.sh --interval 0.5  # refresh mais rápido
#
# Portátil (não depende de `watch` do GNU). Roda no macOS de fábrica.

set -euo pipefail

INTERVAL=1.5
while [[ $# -gt 0 ]]; do
  case "$1" in
    --interval) INTERVAL="$2"; shift 2 ;;
    -h|--help) sed -n '2,18p' "$0"; exit 0 ;;
    *) echo "Argumento desconhecido: $1" >&2; exit 1 ;;
  esac
done

CONJUNTO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$CONJUNTO_ROOT" && git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

# Cores ANSI sóbrias (vai aparecer no palco; nada festivo).
BOLD=$'\033[1m'
DIM=$'\033[2m'
CYAN=$'\033[36m'
RESET=$'\033[0m'

trap 'tput cnorm; echo; exit 0' INT TERM
tput civis  # esconde o cursor

while true; do
  clear
  printf "%sAssistindo Sessão Dev do Lucas%s   %s(Ctrl+C para sair)%s\n" "$BOLD" "$RESET" "$DIM" "$RESET"
  printf "%s%s%s\n\n" "$DIM" "──────────────────────────────────────────────" "$RESET"

  printf "%sHEAD%s\n" "$CYAN" "$RESET"
  git log -1 --pretty=format:'  %h  %s%n  %ar por %an' HEAD
  echo
  echo

  printf "%sstatus%s\n" "$CYAN" "$RESET"
  STATUS="$(git -C "$CONJUNTO_ROOT" status -s 2>/dev/null || true)"
  if [[ -z "$STATUS" ]]; then
    printf "  %s(nada modificado)%s\n" "$DIM" "$RESET"
  else
    echo "$STATUS" | sed 's/^/  /'
  fi
  echo

  printf "%sdiff (vs HEAD)%s\n" "$CYAN" "$RESET"
  DIFFSTAT="$(git -C "$CONJUNTO_ROOT" diff --stat HEAD 2>/dev/null || true)"
  UNTRACKED="$(git -C "$CONJUNTO_ROOT" ls-files --others --exclude-standard 2>/dev/null | grep -v '^node_modules\|^data' || true)"
  if [[ -z "$DIFFSTAT" && -z "$UNTRACKED" ]]; then
    printf "  %s(nada para mostrar)%s\n" "$DIM" "$RESET"
  else
    [[ -n "$DIFFSTAT" ]] && echo "$DIFFSTAT" | sed 's/^/  /'
    if [[ -n "$UNTRACKED" ]]; then
      printf "  %snovos (untracked):%s\n" "$DIM" "$RESET"
      echo "$UNTRACKED" | sed 's/^/    + /'
    fi
  fi

  sleep "$INTERVAL"
done
