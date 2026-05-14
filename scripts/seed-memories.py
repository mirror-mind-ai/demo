#!/usr/bin/env python3
"""
Seed memories from a YAML file into the active Mirror home's database.

Usage:
    python scripts/seed-memories.py users/lucas-vidal/memories/seed.yaml \\
        --mirror-home ~/.mirror-demo/lucas-vidal

The YAML must conform to the schema documented in users/<slug>/memories/seed.yaml.

This script:
  - reads the YAML
  - for each memory, inserts via MemoryClient.add_memory()
  - preserves the explicit created_at timestamp on each memory by updating
    the row directly after insert (since add_memory uses _now() by default)
  - prints a summary of what was inserted, grouped by layer
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from pathlib import Path

import yaml

try:
    from memory import MemoryClient
    from memory.config import default_db_path_for_home
except ImportError:
    print(
        "ERROR: could not import 'memory'. Make sure you ran this with "
        "`uv run python scripts/seed-memories.py ...` from a Mirror Mind "
        "checkout, or that mirror-mind is installed in your environment.",
        file=sys.stderr,
    )
    raise


VALID_TYPES = {
    "decision",
    "insight",
    "idea",
    "journal",
    "tension",
    "learning",
    "pattern",
    "commitment",
    "reflection",
    "observation",
}

VALID_LAYERS = {"self", "ego", "shadow"}


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("seed_file", type=Path, help="Path to the YAML seed file.")
    p.add_argument(
        "--mirror-home",
        type=Path,
        default=None,
        help=(
            "Explicit user home to write into. When set, the script writes to "
            "<mirror_home>/memory.db regardless of MIRROR_HOME or DB_PATH."
        ),
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Validate and print what would be inserted, without writing.",
    )
    return p.parse_args()


def load_seed(path: Path) -> list[dict]:
    if not path.exists():
        print(f"ERROR: seed file not found: {path}", file=sys.stderr)
        sys.exit(1)
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    memories = data.get("memories") if isinstance(data, dict) else None
    if not isinstance(memories, list):
        print("ERROR: seed file must have a top-level 'memories: [...]' list.", file=sys.stderr)
        sys.exit(1)
    return memories


def validate(memories: list[dict]) -> list[str]:
    errors: list[str] = []
    for i, m in enumerate(memories):
        idx = f"memories[{i}]"
        if not isinstance(m, dict):
            errors.append(f"{idx}: not a dict")
            continue
        for field in ("title", "content", "type", "layer"):
            if field not in m or not m[field]:
                errors.append(f"{idx}: missing required field '{field}'")
        if m.get("type") not in VALID_TYPES:
            errors.append(f"{idx}: invalid type '{m.get('type')}'")
        if m.get("layer") not in VALID_LAYERS:
            errors.append(f"{idx}: invalid layer '{m.get('layer')}'")
    return errors


def main() -> int:
    args = parse_args()
    memories = load_seed(args.seed_file)

    errors = validate(memories)
    if errors:
        print("Validation errors:", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        return 2

    print(f"Loaded {len(memories)} memories from {args.seed_file}")
    if args.dry_run:
        layers = Counter(m["layer"] for m in memories)
        types = Counter(m["type"] for m in memories)
        print(f"By layer: {dict(layers)}")
        print(f"By type:  {dict(types)}")
        return 0

    if args.mirror_home is not None:
        db_path = default_db_path_for_home(args.mirror_home.expanduser())
        client = MemoryClient(db_path=db_path)
        print(f"Writing to: {db_path}")
    else:
        client = MemoryClient()
    inserted = 0
    layer_counts: Counter[str] = Counter()
    for m in memories:
        tags = m.get("tags")
        tags_json = json.dumps(tags) if isinstance(tags, list) else None

        memory = client.add_memory(
            title=m["title"],
            content=m["content"],
            memory_type=m["type"],
            layer=m["layer"],
            journey=m.get("journey"),
            persona=m.get("persona"),
            tags=tags_json,
        )

        if m.get("created_at"):
            client.conn.execute(
                "UPDATE memories SET created_at = ? WHERE id = ?",
                (m["created_at"], memory.id),
            )
            client.conn.commit()

        layer_counts[m["layer"]] += 1
        inserted += 1

    print(f"Inserted {inserted} memories.")
    print(f"By layer: {dict(layer_counts)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
