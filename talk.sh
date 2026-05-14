#!/usr/bin/env bash
# talk.sh — send a single query to a character's mirror.
#
# Useful for ad-hoc validation or to test how the character responds to a
# specific question without opening an interactive Pi session.
#
# Usage:
#   ./talk.sh <slug> "<query>"
#
# Examples:
#   ./talk.sh lucas-vidal "me fale sobre quem é você"
#   ./talk.sh lucas-vidal "quais são minhas Travessias?"

set -e

if [ $# -lt 2 ]; then
  echo "Usage: ./talk.sh <slug> \"<query>\"" >&2
  exit 2
fi

SLUG="$1"
shift
QUERY="$*"

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
HOME_PATH="$HOME/.mirror-demo/$SLUG"

if [ ! -d "$HOME_PATH" ] || [ ! -f "$HOME_PATH/memory.db" ]; then
  echo "ERROR: $SLUG is not installed at $HOME_PATH." >&2
  echo "       Run: ./install.sh $SLUG" >&2
  exit 1
fi

cd "$REPO_ROOT"
export MIRROR_HOME="$HOME_PATH"
unset MIRROR_USER

exec uv run python -m memory mirror load --query "$QUERY"
