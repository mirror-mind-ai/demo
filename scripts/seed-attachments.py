#!/usr/bin/env python3
"""
Ingest a directory of markdown files as attachments of a journey in the
active Mirror home's database.

Usage:
    MIRROR_HOME=~/.mirror-demo MIRROR_USER=lucas-vidal \\
        python scripts/seed-attachments.py \\
        --journey blog \\
        --dir users/lucas-vidal/attachments

Each .md file becomes one attachment:
  - name: file stem (without .md), with hyphens kept
  - content: the full markdown text
  - content_type: "markdown"
  - description: the first non-empty line of the file (typically the H1)
  - journey_id: passed as --journey
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    from memory import MemoryClient
except ImportError:
    print(
        "ERROR: could not import 'memory'. Run with `uv run python ...` "
        "from a Mirror Mind checkout.",
        file=sys.stderr,
    )
    raise


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--journey", required=True, help="Journey ID to attach to.")
    p.add_argument(
        "--dir",
        required=True,
        type=Path,
        help="Directory containing .md files.",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="List what would be ingested without writing.",
    )
    return p.parse_args()


def first_h1(text: str) -> str | None:
    for line in text.splitlines():
        line = line.strip()
        if line.startswith("# "):
            return line[2:].strip()
    return None


def main() -> int:
    args = parse_args()
    if not args.dir.is_dir():
        print(f"ERROR: not a directory: {args.dir}", file=sys.stderr)
        return 1

    md_files = sorted(p for p in args.dir.glob("*.md") if p.is_file())
    if not md_files:
        print(f"No .md files found in {args.dir}", file=sys.stderr)
        return 1

    print(f"Found {len(md_files)} markdown files in {args.dir}:")
    for p in md_files:
        print(f"  - {p.name}")

    if args.dry_run:
        return 0

    client = MemoryClient()
    ingested = 0
    for path in md_files:
        text = path.read_text(encoding="utf-8")
        title = first_h1(text) or path.stem
        client.add_attachment(
            journey_id=args.journey,
            name=path.stem,
            content=text,
            description=title,
            content_type="markdown",
        )
        ingested += 1
        print(f"  + {path.stem}: {title}")

    print(f"\nIngested {ingested} attachments to journey '{args.journey}'.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
