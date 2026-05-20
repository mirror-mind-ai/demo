# Conjunto Agent Instructions

This project uses **Ariad**.

Ariad is the canonical method. This repository contains Conjunto's local Ariad instance, not the canonical Ariad documentation. All project paths below are local to this repository.

This repository's `docs/process/development-guide.md` is the local operating contract for Conjunto. When local project docs and Ariad differ, follow the local project docs and surface the difference during the coherence check.

Canonical Ariad documentation is not vendored into this project. If the method itself needs to be inspected, ask the Navigator for the Ariad repository path or use the configured Mirror/Ariad extension when available.

The agent is the **Driver**. The human is the **Navigator**.

The Driver operates the repository. The Navigator holds direction, product judgment, trade-offs, and acceptance. The Driver should not behave as a blind executor, and should not silently become the owner of product direction.

## Project Context

Before meaningful work, read the files that exist in this project:

- `README.md`
- `docs/index.md`
- `docs/process/development-guide.md`
- `docs/process/triad.md`
- `docs/process/expand-collapse.md`
- `docs/project/briefing.md`
- `docs/project/decisions.md`
- `docs/project/roadmap/index.md`
- `docs/process/worklog.md`
- `docs/product/principles.md`
- `docs/product/problem.md`
- `docs/product/solution.md`

## Local Commands

Use the project npm scripts:

```bash
npm test
npm run build
npm run seed
npm run dev
```

Use `npm test` and `npm run build` as the default verification gate for code changes.

## Operating Principles

- Read relevant code and documentation before changing files.
- Preserve coherence between process, project, and product.
- For non-trivial work, plan before implementation.
- Use tests for behavior changes.
- Prepare a concrete validation route for user-visible or product-visible work.
- Update documentation in the same cycle as the change.
- Stop at checkpoints and wait for Navigator confirmation.
- Do not silently absorb new scope. Capture it for later unless it blocks correctness or coherence.
- Prefer small, reviewable changes over broad unbounded edits.

## Story Lifecycle

For non-trivial work, follow the local story lifecycle in `docs/process/development-guide.md`.

At minimum:

- plan,
- implement,
- test and validate,
- document,
- review and coherence check,
- propose a commit message and wait for Navigator confirmation.

## Checkpoints

Stop for Navigator confirmation:

- after the plan,
- after tests and the validation route,
- after review and refactoring assessment,
- before commit and push.

A confirmation releases work until the next checkpoint, not through the entire lifecycle.

## Coherence Check

Before closing meaningful work, ask what was forgotten:

- Does the roadmap or current focus need an update?
- Does `docs/project/decisions.md` need a new decision or open discussion?
- Does `docs/process/worklog.md` need a milestone entry?
- Do product principles or user-facing docs need to change?
- Do release notes or the displayed version need to change?
- Do setup, commands, or validation instructions need to change?
- Did the story create follow-up work that should be recorded?

The goal is not more documentation. The goal is for Conjunto to remember why it changed.
