#!/usr/bin/env python3
"""install.py — install a demo character into a fresh runtime home.

Wipes the target home and rebuilds it from the YAML and markdown sources in
users/<slug>/. Idempotent. Safe to run repeatedly.

Usage (from inside this repo's workspace, where `uv sync` was run):
    uv run python scripts/install.py <slug>
    uv run python scripts/install.py <slug> --home <path>
    uv run python scripts/install.py <slug> --keep

For convenience, the thin wrapper ./scripts/install.sh forwards to this script.
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import sys
from collections import Counter
from pathlib import Path
from textwrap import dedent

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent

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


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description=__doc__.split("\n\n")[0],
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    p.add_argument("slug", help="Character slug (must match users/<slug>/).")
    p.add_argument(
        "--home",
        type=Path,
        default=None,
        help="Explicit runtime home. Defaults to ~/.mirror-demo/<slug>.",
    )
    p.add_argument(
        "--keep",
        action="store_true",
        help="Do not wipe the existing home before installing.",
    )
    return p.parse_args()


# ---------------------------------------------------------------------------
# Preflight
# ---------------------------------------------------------------------------

def preflight_api_key() -> None:
    """Verify the OpenRouter API key works before doing any heavy work."""
    print("Checking OpenRouter API key...")
    try:
        from memory.intelligence.llm_router import get_credits
        get_credits()
    except Exception as exc:
        sys.stderr.write(dedent(f"""
            ERROR: OpenRouter API key check failed.

            The install needs a valid OPENROUTER_API_KEY to generate embeddings
            for memories and attachments. Set it in one of two places:

              - .env in the repo root (recommended):
                  OPENROUTER_API_KEY=sk-or-v1-...
              - or as a shell environment variable:
                  export OPENROUTER_API_KEY=sk-or-v1-...

            Get a key at https://openrouter.ai/keys (a small credit balance
            covers many demo installs; this run will spend less than one cent).

            If the key is already set, double-check it: no typos, no
            placeholder values like "sk-or-v1-your-key-here", and the account
            must have credit.

            Underlying error:
              {type(exc).__name__}: {exc}
        """))
        sys.exit(1)
    print("OK.\n")


# ---------------------------------------------------------------------------
# Identity
# ---------------------------------------------------------------------------

def copy_identity(user_dir: Path, home: Path) -> None:
    print("Copying identity files...")
    shutil.copytree(user_dir / "identity", home / "identity")


def seed_identity(home: Path) -> None:
    print("Seeding identity into database...")
    from memory.cli.seed import seed
    seed(env="production", mirror_home=home)
    print()


# ---------------------------------------------------------------------------
# Memories
# ---------------------------------------------------------------------------

def load_memories(seed_file: Path) -> list[dict]:
    data = yaml.safe_load(seed_file.read_text(encoding="utf-8"))
    memories = data.get("memories") if isinstance(data, dict) else None
    if not isinstance(memories, list):
        sys.stderr.write(
            f"ERROR: {seed_file} must have a top-level 'memories: [...]' list.\n"
        )
        sys.exit(1)
    return memories


def validate_memories(memories: list[dict]) -> None:
    errors: list[str] = []
    for i, mem in enumerate(memories):
        idx = f"memories[{i}]"
        if not isinstance(mem, dict):
            errors.append(f"{idx}: not a dict")
            continue
        for field in ("title", "content", "type", "layer"):
            if not mem.get(field):
                errors.append(f"{idx}: missing required field '{field}'")
        if mem.get("type") not in VALID_TYPES:
            errors.append(f"{idx}: invalid type '{mem.get('type')}'")
        if mem.get("layer") not in VALID_LAYERS:
            errors.append(f"{idx}: invalid layer '{mem.get('layer')}'")
    if errors:
        sys.stderr.write("ERROR: memory seed file is invalid:\n")
        for err in errors:
            sys.stderr.write(f"  - {err}\n")
        sys.exit(2)


def plant_memories(seed_file: Path) -> Counter[str]:
    print("Planting memories...")
    from memory import MemoryClient

    memories = load_memories(seed_file)
    validate_memories(memories)

    client = MemoryClient()
    layer_counts: Counter[str] = Counter()
    for mem in memories:
        tags = mem.get("tags")
        tags_json = json.dumps(tags) if isinstance(tags, list) else None

        record = client.add_memory(
            title=mem["title"],
            content=mem["content"],
            memory_type=mem["type"],
            layer=mem["layer"],
            journey=mem.get("journey"),
            persona=mem.get("persona"),
            tags=tags_json,
        )

        if mem.get("created_at"):
            client.conn.execute(
                "UPDATE memories SET created_at = ? WHERE id = ?",
                (mem["created_at"], record.id),
            )
            client.conn.commit()

        layer_counts[mem["layer"]] += 1

    print(f"  Inserted {sum(layer_counts.values())} memories. "
          f"By layer: {dict(layer_counts)}\n")
    return layer_counts


# ---------------------------------------------------------------------------
# Attachments
# ---------------------------------------------------------------------------

def first_h1(text: str) -> str | None:
    for line in text.splitlines():
        line = line.strip()
        if line.startswith("# "):
            return line[2:].strip()
    return None


def ingest_attachments(user_dir: Path) -> int:
    """Walk users/<slug>/attachments/<journey>/*.md and ingest each."""
    attachments_dir = user_dir / "attachments"
    if not attachments_dir.is_dir():
        return 0

    from memory import MemoryClient
    client = MemoryClient()
    total = 0

    for journey_dir in sorted(p for p in attachments_dir.iterdir() if p.is_dir()):
        md_files = sorted(journey_dir.glob("*.md"))
        if not md_files:
            continue

        journey_id = journey_dir.name
        print(f"Ingesting attachments for journey '{journey_id}' "
              f"({len(md_files)} files)...")

        for path in md_files:
            text = path.read_text(encoding="utf-8")
            title = first_h1(text) or path.stem
            client.add_attachment(
                journey_id=journey_id,
                name=path.stem,
                content=text,
                description=title,
                content_type="markdown",
            )
            total += 1

        print()

    return total


# ---------------------------------------------------------------------------
# Orchestration
# ---------------------------------------------------------------------------

def install(slug: str, home: Path | None, keep: bool) -> None:
    user_dir = REPO_ROOT / "users" / slug
    if not user_dir.is_dir():
        sys.stderr.write(f"ERROR: character not found: {user_dir}\n")
        sys.exit(1)

    if home is None:
        home = Path.home() / ".mirror-demo" / slug
    home = home.expanduser().resolve()

    print(f"Installing {slug} into {home}\n")

    # Configure env so every subsequent framework call targets this home,
    # regardless of what the workspace .env or the shell sets.
    os.environ["MIRROR_HOME"] = str(home)
    os.environ.pop("MIRROR_USER", None)

    if not keep and home.exists():
        print("Wiping existing home...")
        shutil.rmtree(home)
    home.mkdir(parents=True, exist_ok=True)

    copy_identity(user_dir, home)
    seed_identity(home)

    seed_file = user_dir / "memories" / "seed.yaml"
    if seed_file.exists():
        plant_memories(seed_file)

    attachments_total = ingest_attachments(user_dir)

    print(f"Installed {slug}.")
    print(f"  Home: {home}")
    print(f"  DB:   {home / 'memory.db'}")
    if attachments_total:
        print(f"  Attachments: {attachments_total}")
    print()
    print("Validate with:")
    print(f"  ./scripts/talk.sh {slug} \"me fale sobre quem é você\"")


def main() -> int:
    args = parse_args()
    preflight_api_key()
    install(args.slug, args.home, args.keep)
    return 0


if __name__ == "__main__":
    sys.exit(main())
