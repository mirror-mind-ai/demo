#!/usr/bin/env bash
# install.sh — thin wrapper that forwards to install.py.
#
# All install logic lives in scripts/install.py. This wrapper exists for
# muscle memory and parity with talk.sh.
#
# Usage:
#   ./install.sh <slug>
#   ./install.sh <slug> --home <path>
#   ./install.sh <slug> --keep

set -e

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_ROOT"

exec uv run python scripts/install.py "$@"
