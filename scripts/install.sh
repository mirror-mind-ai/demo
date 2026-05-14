#!/usr/bin/env bash
# install.sh — install a character from this repo into a fresh demo home.
#
# Wipes the target home and rebuilds it from the YAML/markdown sources in
# users/<slug>/. Idempotent. Safe to run repeatedly.
#
# Usage (from inside a Mirror Mind framework workspace, where
# `uv run python -m memory` works):
#   /path/to/demo/scripts/install.sh <slug>                  # default home: ~/.mirror-demo/<slug>
#   /path/to/demo/scripts/install.sh <slug> --home <path>    # explicit home
#   /path/to/demo/scripts/install.sh <slug> --keep           # don't wipe existing data
#
# Examples:
#   cd ~/Code/lucas-mirror && ~/Code/mirror-mind-demo/scripts/install.sh lucas-vidal

set -e

# --- Args --------------------------------------------------------------------

SLUG=""
HOME_PATH=""
KEEP=false

while [ $# -gt 0 ]; do
  case "$1" in
    --home)
      HOME_PATH="$2"
      shift 2
      ;;
    --keep)
      KEEP=true
      shift
      ;;
    -h|--help)
      grep "^#" "$0" | head -n 20 | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      if [ -z "$SLUG" ]; then
        SLUG="$1"
      else
        echo "ERROR: unexpected argument: $1" >&2
        exit 2
      fi
      shift
      ;;
  esac
done

if [ -z "$SLUG" ]; then
  echo "Usage: scripts/install.sh <slug> [--home <path>] [--keep]" >&2
  exit 2
fi

# --- Resolve paths -----------------------------------------------------------

# Resolve demo repo by script location (absolute), but stay in the caller's
# cwd so `uv run python -m memory` runs against the active framework workspace.
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

USER_DIR="$REPO_ROOT/users/$SLUG"
if [ ! -d "$USER_DIR" ]; then
  echo "ERROR: character not found: $USER_DIR" >&2
  exit 1
fi

# Sanity: confirm we're in a framework workspace.
if ! uv run python -c "import memory" 2>/dev/null; then
  echo "ERROR: cwd is not a Mirror Mind framework workspace." >&2
  echo "       cd into a workspace (e.g., ~/Code/lucas-mirror) first." >&2
  exit 1
fi

if [ -z "$HOME_PATH" ]; then
  HOME_PATH="$HOME/.mirror-demo/$SLUG"
fi

echo "Installing $SLUG into $HOME_PATH"
echo ""

# --- Wipe (unless --keep) ----------------------------------------------------

if [ "$KEEP" = false ] && [ -d "$HOME_PATH" ]; then
  echo "Wiping existing home..."
  rm -rf "$HOME_PATH"
fi

mkdir -p "$HOME_PATH"

# --- Identity ---------------------------------------------------------------

echo "Copying identity files..."
cp -R "$USER_DIR/identity" "$HOME_PATH/identity"

echo "Seeding identity into database..."
uv run python -m memory seed --mirror-home "$HOME_PATH"
echo ""

# --- Memories ---------------------------------------------------------------

if [ -f "$USER_DIR/memories/seed.yaml" ]; then
  echo "Planting memories..."
  uv run python "$REPO_ROOT/scripts/seed-memories.py" \
    "$USER_DIR/memories/seed.yaml" \
    --mirror-home "$HOME_PATH"
  echo ""
fi

# --- Attachments (subfolder per journey) ------------------------------------

if [ -d "$USER_DIR/attachments" ]; then
  for journey_dir in "$USER_DIR/attachments"/*/; do
    [ -d "$journey_dir" ] || continue
    journey_id="$(basename "$journey_dir")"
    md_count="$(find "$journey_dir" -maxdepth 1 -name "*.md" | wc -l | tr -d ' ')"
    if [ "$md_count" = "0" ]; then
      continue
    fi
    echo "Ingesting attachments for journey '$journey_id' ($md_count files)..."
    uv run python "$REPO_ROOT/scripts/seed-attachments.py" \
      --journey "$journey_id" \
      --dir "$journey_dir" \
      --mirror-home "$HOME_PATH"
    echo ""
  done
fi

# --- Done -------------------------------------------------------------------

echo "Installed $SLUG."
echo "  Home:    $HOME_PATH"
echo "  DB:      $HOME_PATH/memory.db"
echo ""
echo "Validate with:"
echo "  DB_PATH=$HOME_PATH/memory.db \\"
echo "    uv run python -m memory mirror load --query \"me fale sobre quem é você\""
